import { Link } from "react-router-dom";
import { HotelType } from "../../../server/src/shared/types";
import { FaStar } from "react-icons/fa6";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-lg"
    >
      <div className="h-[275px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-center object-cover rounded-lg"
        />
      </div>
      <div className="absolute group bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-lg hover:h-full hover:bg-opacity-60 transition-colors ease-in-out flex flex-col">
        <span className="text-white font-bold tracking-tight text-3xl block flex-1">
          {hotel.name}
        </span>
        <span className="text-white font-bold tracking-tight text-xl hidden group-hover:block">
          {hotel.city}, {hotel.country}
        </span>
        <span className="text-white font-bold tracking-tight text-lg hidden group-hover:block">
          ₹ {hotel.pricePerNight} per night
        </span>
        <span className="text-white font-bold tracking-tight text-lg hidden group-hover:block">
          {Array.from({ length: hotel.starRating }).map((_, idx) => (
            <FaStar className="fill-orange-400 inline" key={idx} />
          ))}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
