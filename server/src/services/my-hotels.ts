import Hotel from "../models/hotel";
import { HotelType } from "../shared/types"
import { uploadImages } from "../utils/fileUpload";

const addMyHotel = async (newHotel: HotelType, userId: string, imageFiles: Express.Multer.File[]) => {
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
}

export default {
    addMyHotel,
}