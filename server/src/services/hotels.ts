import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";

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

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

export default {
  getAllHotels,
  searchHotels,
  getHotelById,
};
