import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: hotels } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found.</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {hotels.map((hotel) => (
        <div
          id={hotel._id}
          className="grid grid-cols-1 md:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5"
        >
          <div className="w-full h-[275px]">
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-center object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="text-2xl font-bold">
              {hotel.name}
              <div className="text-xs font-semibold">
                {hotel.city}, {hotel.country}
              </div>
            </div>
            <div className="overflow-y-auto max-h-[200px]">
              {hotel.bookings.map((booking) => (
                <div
                  id={booking._id}
                  className="border-b border-slate-300 mb-4 pb-1"
                >
                  <div>
                    <span className="font-bold mr-2">Duration:</span>
                    <span>
                      {new Date(booking.checkIn).toDateString()}
                      &nbsp;to&nbsp;
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold mr-2">Guests: </span>
                    <span>
                      {booking.adultCount} Adults & {booking.childCount}{" "}
                      Children
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
