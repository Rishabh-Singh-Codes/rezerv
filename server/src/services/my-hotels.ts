import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import { uploadImages } from "../utils/fileUpload";

const addMyHotel = async (
  newHotel: HotelType,
  userId: string,
  imageFiles: Express.Multer.File[]
) => {
  // Uploading images to cloudinary
  const imageUrls = await uploadImages(imageFiles);

  // adding all parameters to newHotel
  newHotel.imageUrls = imageUrls;
  newHotel.lastUpdated = new Date();
  newHotel.userId = userId;

  // saving in the DB
  const hotel = new Hotel(newHotel);
  await hotel.save();

  return hotel;
};

const fetchMyHotels = async (userId: string) => {
  const hotels = await Hotel.find({ userId }).sort("-lastUpdated");

  return hotels;
};

const fetchMyHotelById = async (hotelId: string, userId: string) => {
  const hotel = await Hotel.findOne({
    _id: hotelId,
    userId,
  });

  return hotel;
};

const updateMyHotelById = async (
  updatedHotel: HotelType,
  hotelId: string,
  userId: string,
  imageFiles: Express.Multer.File[]
) => {
  updatedHotel.lastUpdated = new Date();

  const hotel = await Hotel.findOneAndUpdate(
    {
      _id: hotelId,
      userId,
    },
    updatedHotel,
    { new: true }
  );

  if (!hotel) {
    return {
      status: 404,
      result: {
        message: "Hotel not found",
      },
    };
  }

  const updatedImageUrls = await uploadImages(imageFiles);

  hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

  await hotel.save();

  return {
    status: 200,
    result: hotel,
  };
};

export default {
  addMyHotel,
  fetchMyHotels,
  fetchMyHotelById,
  updateMyHotelById,
};
