import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { FaEarthAsia } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );

    navigate("/search");
  };

  const handleClear = (event: FormEvent) => {
    event.preventDefault();

    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(0);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-teal-700 rounded-2xl shadow-2xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2 rounded-lg">
        <FaEarthAsia size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex bg-white px-1 py-2 rounded-lg">
        <label className="items-center flex w-1/2">
          Adults:&nbsp;
          <input
            className="w-full focus:outline-none font-semibold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex w-1/2">
          Childs:&nbsp;
          <input
            className="w-full focus:outline-none font-semibold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div>
        <label className="flex bg-white rounded-lg items-center">
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date as Date)}
            selectsStart
            dateFormat="dd/MM/yyyy"
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            className="w-11/12 md:min-w-full p-2 focus:outline-none rounded-lg"
            wrapperClassName="min-w-full"
          />
        </label>
      </div>
      <div>
        <label className="flex bg-white rounded-lg items-center">
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date as Date)}
            selectsEnd
            dateFormat="dd/MM/yyyy"
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn}
            maxDate={maxDate}
            placeholderText="Check-out  Date"
            className="w-11/12 md:min-w-full p-2 focus:outline-none rounded-lg"
            wrapperClassName="min-w-full"
          />
        </label>
      </div>
      <div className="flex gap-1">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 font-bold h-full hover:bg-blue-400 text-base rounded-md cursor-pointer w-2/3 transition"
        >
          Search
        </button>
        <button
          type="reset"
          onClick={(event) => handleClear(event)}
          className="bg-red-500 text-white py-2 font-bold h-full hover:bg-red-400 text-base rounded-md cursor-pointer w-1/3 transition"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
