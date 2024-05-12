import { Request, Response } from "express";
import myHotelsService from "../services/my-hotels";

export const addMyHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel = req.body;
    const { userId } = req;

    const hotel = await myHotelsService.addMyHotel(
      newHotel,
      userId,
      imageFiles
    );

    res.status(201).send(hotel);
  } catch (error) {
    console.log("Error: creating hotel \n", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const fetchMyHotels = async (req: Request, res: Response) => {
  const { userId } = req;
  try {
    const hotels = await myHotelsService.fetchMyHotels(userId);
    res.json(hotels);
  } catch (error) {
    console.log("Error: fetching all user hotels \n", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
};

export const fetchMyHotelById = async (req: Request, res: Response) => {
  const hotelId = req.params.id.toString();
  const { userId } = req;
  try {
    const hotel = await myHotelsService.fetchMyHotelById(hotelId, userId);

    res.json(hotel);
  } catch (error) {
    console.log("Error: fetching single hotel \n", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
};

export const updateMyHotelById = async (req: Request, res: Response) => {
  const updatedHotel = req.body;
  const hotelId = req.params.hotelId;
  const { userId } = req;
  const imageFiles = req.files as Express.Multer.File[];

  try {
    const { status, result } = await myHotelsService.updateMyHotelById(
      updatedHotel,
      hotelId,
      userId,
      imageFiles
    );

    res.status(status).json(result);
  } catch (error) {
    console.log("Error: updating single hotel \n", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteMyHotelById = async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId;
  const { userId } = req;

  try {
    const { status, result } = await myHotelsService.deleteMyHotelById(hotelId, userId);

    res.status(status).json(result);
  } catch (error) {
    console.log("Error: deleting single hotel \n", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
