import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import {
  FaLocationDot,
  FaBuilding,
  FaMoneyBillWave,
  FaPeopleGroup,
  FaStar,
} from "react-icons/fa6";

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {
        showToast({ type: "ERROR", message: "" });
      },
    }
  );

  if (!hotelData) {
    return <span>No hotel found.</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="bg-blue-500 text-white p-2 font-bold hover:bg-blue-400 text-lg rounded-md cursor-pointer flex items-center"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <span className="flex justify-between">
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-blue-500 text-white p-2 font-semibold hover:bg-blue-400 text-sm rounded-md cursor-pointer"
              >
                View Details
              </Link>
            </span>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-md flex items-center p-3 text-sm">
                <FaLocationDot className="mr-2 text-lg" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-md flex items-center p-3 text-sm">
                <FaBuilding className="mr-2 text-lg" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-md flex items-center p-3 text-sm">
                <FaMoneyBillWave className="mr-2 text-lg" />₹
                {hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-md flex items-center pl-3 text-sm">
                <FaPeopleGroup className="mr-1 text-sm" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-md flex items-center pl-3 text-sm">
                <FaStar className="mr-1 text-sm" />
                {hotel.starRating} rating
              </div>
            </div>
            <div className="whitespace-pre-line">{hotel.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
