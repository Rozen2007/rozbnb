import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

import { useState } from "react";
import { useRouter } from "next/dist/client/router";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInputs = () => {
    setSearchInput("");
    setStartDate(new Date());
    setEndDate(new Date());
    setNumberOfGuests(1);
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guests: numberOfGuests,
      },
    });
    resetInputs();
  };

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  return (
    <header className="sticky top-0 z-50  bg-white shadow-md ">
      <div className="max-w-7xl mx-auto grid grid-cols-3 p-5 md:px-20">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="relative flex items-center h-10 cursor-pointer my-auto"
        >
          <Image
            src="https://links.papareact.com/qd3"
            layout="fill"
            objectFit="contain"
            objectPosition="left"
          />
        </div>
        {/* Middle */}
        <div className="flex items-center justify-between  py-2 rounded-full md:border-2 md:shadow-sm">
          <input
            className="w-[160px] md:flex-grow outline-none bg-transparent pl-5 placeholder-gray-500"
            type="text"
            placeholder={placeholder || "Start your search"}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchIcon className="hidden md:inline-flex h-8 bg-[#FD5B61] hover:bg-red-500 rounded-full text-white p-2 cursor-pointer md:mx-2" />
        </div>
        {/* Right */}
        <div className="flex items-center space-x-4 justify-end text-gray-500">
          <p className="hidden md:inline-flex cursor-pointer">Become a host</p>
          <GlobeAltIcon className="hidden md:inline-flex h-6  cursor-pointer" />
          <div className="flex items-center border-2 rounded-full space-x-2 p-2 cursor-pointer hover:shadow-md">
            <MenuIcon className="h-6 cursor-pointer" />
            <UserCircleIcon className="h-6 cursor-pointer" />
          </div>
        </div>
        {searchInput && (
          <div className="flex flex-col col-span-3 mx-auto">
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#FD5B61"]}
              onChange={handleSelect}
            />
            <div className="flex items-center  border-b mb-4">
              <h2 className="text-2xl flex-grow font-semibold">
                Number of Guests
              </h2>
              <UsersIcon className="h-5" />
              <input
                className="w-14 pl-2 text-lg outline-none text-[#FD5B61]"
                type="number"
                min={1}
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
              />
            </div>
            <div className="flex">
              <button
                className="flex-grow outline-none text-lg text-gray-500"
                onClick={() => resetInputs()}
              >
                Cancel
              </button>
              <button
                onClick={search}
                className="flex-grow outline-none text-lg text-[#FD5B61]"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
