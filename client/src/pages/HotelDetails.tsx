import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { FaStar } from "react-icons/fa6";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const HotelDetails = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map((_, idx) => (
            <FaStar className="fill-orange-400" key={idx} />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      <div className="grid grid-col-1 md:grid-cols-3 gap-4">
        {hotel.imageUrls.map((image, idx) => (
          <div className="h-[275px]" key={image}>
            <img
              src={image}
              alt={`${hotel.name} photo-${idx + 1}`}
              className="rounded-lg w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {hotel.facilities.map((facility) => (
          <div
            className="border border-slate-300 rounded-md p-3 text-center font-medium"
            key={facility}
          >
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight.toString()}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
