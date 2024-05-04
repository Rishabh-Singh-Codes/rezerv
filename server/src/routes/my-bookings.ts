import express from "express";
import verifyToken from "../middleware/auth";
import { fetchMyBookings } from "../controllers/my-bookings";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, fetchMyBookings);

export default router;
