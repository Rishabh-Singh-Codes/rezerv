import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import { fetchMyBookings } from "../controllers/my-bookings";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, fetchMyBookings);

export default router;
