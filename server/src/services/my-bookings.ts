import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";

const fetchMyHotels = async (userId: string) => {
  const hotels = await Hotel.find({
    bookings: { $elemMatch: { userId } },
  }).sort("-lastUpdated");

  const results = hotels.map((hotel) => {
    const userBookings = hotel.bookings.filter(
      (booking) => booking.userId === userId
    );

    const hotelWithUserBooking: HotelType = {
      ...hotel.toObject(),
      bookings: userBookings,
    };

    return hotelWithUserBooking;
  });

  return results;
};

export default {
  fetchMyHotels,
};
