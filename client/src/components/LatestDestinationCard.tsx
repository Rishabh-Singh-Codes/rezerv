import { Link } from "react-router-dom";
import { HotelType } from "../../../server/src/shared/types";

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
      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-lg">
        <span className="text-white font-bold tracking-tight text-3xl">{hotel.name}</span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
