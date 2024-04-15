import Hotel from "../models/hotel";

const getAllHotels = async () => {
  const hotels = await Hotel.find().sort("-lastUpdated");
  return hotels;
};

export default {
  getAllHotels,
};
