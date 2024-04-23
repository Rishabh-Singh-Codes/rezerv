import { Request, Response } from "express";
import hotelsService from "../services/hotels";
import { validationResult } from "express-validator";

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

export const getHotelById = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    const hotel = await hotelsService.getHotelById(id);

    res.json(hotel);
  } catch (error) {
    console.log("Error: searching a single hotel \n", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;
    const { userId } = req;

    const { status, result } = await hotelsService.createPaymentIntent(
      numberOfNights,
      hotelId,
      userId
    );

    res.status(status).send(result);
  } catch (error) {
    console.log("Error: creating payment intent \n", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
