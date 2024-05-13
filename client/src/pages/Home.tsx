import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  const { data: hotels } = useQuery("fetchAllHotels", () =>
    apiClient.fetchAllHotels()
  );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const remainingHotels = hotels?.slice(2) || [];

  return (
    <div className="space-y-5">
        <h2 className="text-3xl font-bold">Latest Destinations</h2>
        <p>Most recent hotels added by our hosts</p>
        <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topRowHotels.map((hotel) => (
                    <LatestDestinationCard hotel={hotel} key={hotel._id} />
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {remainingHotels.map((hotel) => (
                    <LatestDestinationCard hotel={hotel} key={hotel._id}/>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Home;
