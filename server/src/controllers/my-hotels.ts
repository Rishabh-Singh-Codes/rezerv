import { Request, Response } from "express";
import myHotelsService from "../services/my-hotels";

export const addMyHotel = async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel = req.body;
        const {userId} = req;

        const hotel = await myHotelsService.addMyHotel(newHotel, userId, imageFiles);

        res.status(201).send(hotel);
      } catch (error) {
        console.log("Error: creating hotel \n", error);
        res.status(500).json({ message: "Something went wrong!" });
      }
}