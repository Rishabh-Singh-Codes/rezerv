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
  createRoomBooking,
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
  createRoomBooking
);

export default router;
