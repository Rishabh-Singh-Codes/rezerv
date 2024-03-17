import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// api/my-hotels
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
    body("adultCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Adult count is required and must be a number"),
    body("childCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Child count is required and must be a number"),
    body("starRating")
      .notEmpty()
      .isNumeric()
      .withMessage("Rating is required and must be a number"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // Uploading images to cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        const dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);

      // adding all parameters to newHotel
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // saving in the DB
      const hotel = new Hotel(newHotel);
      await hotel.save();

      // send response
      res.status(201).send(hotel);
    } catch (error) {
      console.log("Error: creating hotel \n", error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
);

export default router;
