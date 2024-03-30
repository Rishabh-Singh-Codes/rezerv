import { Link } from "react-router-dom";
import { HotelType } from "../../../server/src/shared/types";
import { FaStar } from "react-icons/fa6";

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] border border-slate-200 rounded-lg p-8 gap-8 bg-slate-100">
      <div className="w-full h-[275px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-center object-cover rounded-lg"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <FaStar className="fill-orange-400" />
              ))}
            </span>
            <span className="ml-1 text-sm font-semibold">{hotel.type}</span>
          </div>
          <Link
            className="text-2xl font-bold cursor-pointer"
            to={`/detail/${hotel._id}`}
          >
            {hotel.name}
          </Link>
        </div>
        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 2).map((facility) => (
              <span className="bg-slate-500 text-gray-100 p-1 rounded-md text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 2 &&
                `+${hotel.facilities.length - 2} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold text-sm">₹{hotel.pricePerNight} per night</span>
            <Link
              className="bg-blue-500 text-white p-2 h-full font-semibold hover:bg-blue-400 text-sm max-w-fit rounded-md cursor-pointer transition"
              to={`/detail/${hotel._id}`}
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
