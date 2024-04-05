import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-600 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">REZERV</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-400 rounded-md"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-400 rounded-md"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white rounded-md items-center text-blue-500 px-3 font-bold hover:bg-gray-100 hover:text-blue-600 transition"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
