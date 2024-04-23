import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { BookingType } from "../shared/types";
import { param } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";
import {
  getAllHotels,
  searchHotels,
  getHotelById,
  createPaymentIntent,
} from "../controllers/hotels";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();

// /api/hotels/search
router.get("/search", searchHotels);

// /api/hotels/
router.get("/", getAllHotels);

// /api/hotels/hotelId
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  getHotelById
);

// /api/hotels/:hotelId/bookings/payment-intent
router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  createPaymentIntent
);

// /api/hotels/:hotelId/bookings
router.post(
  "/:hotelId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const paymentIntentId = req.body.paymentIntentId;

      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId as string
      );

      if (!paymentIntent) {
        return res.status(400).json({ message: "Payment intent not found" });
      }

      if (
        paymentIntent.metadata.hotelId !== req.params.hotelId ||
        paymentIntent.metadata.userId !== req.userId
      ) {
        return res.status(400).json({ message: "Payment intent mismatch" });
      }

      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          message: `Payment intent not succeeded. Status: ${paymentIntent.status}`,
        });
      }

      const newBooking: BookingType = {
        ...req.body,
        userId: req.userId,
      };

      const hotel = await Hotel.findOneAndUpdate(
        { _id: req.params.hotelId },
        {
          $push: { bookings: newBooking },
        }
      );

      if (!hotel) {
        return res.status(400).json({ message: "Hotel not found" });
      }

      await hotel.save();

      res.status(200).send(hotel);
    } catch (error) {
      console.log("Error: booking hotel \n", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
