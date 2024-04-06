import { HotelType } from "../../../server/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-4 border border-slate-300 rounded-lg p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <h4 className="font-semibold text-sm">{` ${hotel.name}, ${hotel.city}, ${hotel.country}`}</h4>
      </div>
      <div className="flex justify-between border-b pb-2">
        <div>
          Check-in:
          <h4 className="font-semibold text-sm">{checkIn.toDateString()}</h4>
        </div>
        <div>
          Check-out:
          <h4 className="font-semibold text-sm">{checkOut.toDateString()}</h4>
        </div>
      </div>
      <div className="border-b pb-2">
        Total length of stay:
        <h4 className="font-semibold text-sm">{numberOfNights} nights</h4>
      </div>
      <div className="pb-2">
        Guests:
        <h4 className="font-semibold text-sm">
          {adultCount} adults & {childCount} children
        </h4>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
