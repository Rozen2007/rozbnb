import React, { useState } from "react";
import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "search",
      query: {
        location: searchInput,
        // startDate: startDate.toISOString(),
        // endDate: endDate.toISOString(),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <header className="sticky top-0 z-40 grid grid-cols-3 w-screen bg-white shadow-md p-5 md:px-10  ">
      {/* Left logo */}
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
      {/* Search */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm ">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          className=" flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          placeholder={placeholder || "Start Your Search..."}
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>
      {/* Right */}
      <div className="flex items-center space-x-4 justify-end text-gray-500 ">
        <p className="hidden md:inline cursor-pointer pl-4">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div className="flex items-center space-x-2 border-2 rounded-full p-2">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      {/* Date range picker */}
      <div className="absolute w-screen md:w-[580px] left-1 top-20 md:left-[20%] lg:left-[30%]   z-50">
        {searchInput && (
          <div className="flex flex-col md:col-span-3  w-max mt-5 rounded-xl bg-white p-5 z-50 shadow-md">
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#FD5B61"]}
              onChange={handleSelect}
            />
            <div className="flex w-screen md:w-[580px] items-center border-b mb-4 top-auto right-auto bottom-auto left-auto bg-white">
              <h2 className="text-2xl flex-grow font-semibold">
                Number of Guests
              </h2>
              <UsersIcon className="h-5 justify-right" />
              <input
                value={noOfGuests}
                onChange={(e) => setNoOfGuests(e.target.value)}
                min={1}
                type="number"
                className="w-12 pl-2 text-lg outline-none text-red-400"
              />
            </div>
            <div className="flex w-screen md:w-[580px]">
              <button
                className="w-1/2 md:flex-grow text-gray-500"
                onClick={resetInput}
              >
                Cancel
              </button>
              <button
                className="w-1/2 md:flex-grow text-red-400"
                onClick={search}
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