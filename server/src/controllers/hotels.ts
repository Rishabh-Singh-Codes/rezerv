import { Request, Response } from "express";
import hotelsService from "../services/hotels";

export const searchHotels = async (req: Request, res: Response) => {
  try {
    const queryParams = req.query;
    const hotels = await hotelsService.searchHotels(queryParams);

    res.json(hotels);
  } catch (error) {
    console.log("Error: searching hotels \n", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await hotelsService.getAllHotels();
    
    res.json(hotels);
  } catch (error) {
    console.log("Error: fetching all hotels \n", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
