import Hotel from "../models/hotel";
import { BookingType, HotelSearchResponse, HotelType } from "../shared/types";
import { constructSearchQuery } from "../utils/query";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const searchHotels = async (queryParams: any) => {
  const query = constructSearchQuery(queryParams);

  let sortOptions = {};
  switch (queryParams.sortOption) {
    case "starRating":
      sortOptions = { starRating: -1 };
      break;
    case "pricePerNightAsc":
      sortOptions = { pricePerNight: 1 };
      break;
    case "pricePerNightDesc":
      sortOptions = { pricePerNight: -1 };
      break;
  }

  const pageSize = 5;
  const pageNumber = parseInt(
    queryParams.page ? queryParams.page.toString() : "1"
  );
  const skip = (pageNumber - 1) * pageSize;

  const hotels = await Hotel.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(pageSize);

  const total = await Hotel.countDocuments(query);

  const response: HotelSearchResponse = {
    data: hotels,
    pagination: {
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
    },
  };

  return response;
};

const getAllHotels = async () => {
  const hotels = await Hotel.find().sort("-lastUpdated");
  return hotels;
};

const getHotelById = async (id: string) => {
  const hotel = await Hotel.findById(id);

  return hotel;
};

const createPaymentIntent = async (
  numberOfNights: number,
  hotelId: string,
  userId: string
) => {
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    return {
      status: 400,
      result: {
        message: "Hotel not found",
      },
    };
  }

  const totalCost = hotel.pricePerNight * numberOfNights;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost * 100,
    currency: "inr",
    metadata: {
      userId,
      hotelId,
    },
  });

  if (!paymentIntent.client_secret) {
    return {
      status: 500,
      result: {
        message: "Error creating payment intent",
      },
    };
  }

  const response = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalCost,
  };

  return {
    status: 200,
    result: response,
  };
};

const createRoomBooking = async (
  body: HotelType & {
    paymentIntentId: string;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
    firstName: string;
    lastName: string;
    email: string;
  },
  userId: string,
  hotelId: string
) => {
  const { paymentIntentId } = body;
  const paymentIntent = await stripe.paymentIntents.retrieve(
    paymentIntentId as string
  );

  if (!paymentIntent) {
    return {
      status: 400,
      result: {
        message: "Payment intent not found",
      },
    };
  }

  if (
    paymentIntent.metadata.hotelId !== hotelId ||
    paymentIntent.metadata.userId !== userId
  ) {
    return {
      status: 400,
      result: {
        message: "Payment intent mismatch",
      },
    };
  }

  if (paymentIntent.status !== "succeeded") {
    return {
      status: 400,
      result: {
        message: `Payment intent not succeeded. Status: ${paymentIntent.status}`,
      },
    };
  }

  const newBooking: BookingType = {
    ...body,
    userId,
  };

  const hotel = await Hotel.findOneAndUpdate(
    { _id: hotelId },
    {
      $push: { bookings: newBooking },
    }
  );

  if (!hotel) {
    return {
      status: 400,
      result: {
        message: "Hotel not found",
      },
    };
  }

  await hotel.save();

  return {
    status: 200,
    result: hotel,
  };
};

export default {
  getAllHotels,
  searchHotels,
  getHotelById,
  createPaymentIntent,
  createRoomBooking,
};
