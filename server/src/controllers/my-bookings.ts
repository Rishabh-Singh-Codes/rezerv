import { Request, Response } from "express";
import myBookingsService from "../services/my-bookings";

export const fetchMyBookings = async (req: Request, res: Response) => {
    try {
        const {userId } = req;
        const hotels = await myBookingsService.fetchMyHotels(userId);
    
        res.status(200).send(hotels);
      } catch (error) {
        console.log("Error: getting my bookings \n", error);
        res.status(500).json({ message: "Something went wrong" });
      }
}