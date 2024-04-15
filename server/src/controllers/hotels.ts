import { Request, Response } from "express";
import hotelsService from "../services/hotels";

export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await hotelsService.getAllHotels();
    res.json(hotels);
  } catch (error) {
    console.log("Error: fetching all hotels \n", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
