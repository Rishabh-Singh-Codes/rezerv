import express from "express";
import multer from "multer";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import {
  addMyHotel,
  fetchMyHotelById,
  fetchMyHotels,
  updateMyHotelById,
  deleteMyHotelById,
} from "../controllers/my-hotels";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// POST: api/my-hotels: Add a hotel
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
  addMyHotel
);

// GET: api/my-hotels: fetching all user hotels
router.get("/", verifyToken, fetchMyHotels);

// GET: api/my-hotels/:id -> fetching a hotel's details
router.get("/:id", verifyToken, fetchMyHotelById);

// PUT: api/my-hotels/:hotelId -> updating a hotel's details
router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  updateMyHotelById
);

// DELETE: api/my-hotels/:id -> delete a hotel
router.delete("/:hotelId", verifyToken, deleteMyHotelById);

export default router;
