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
import { signIn, useSession, signOut } from "next-auth/client";
import { DateRange, DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect } from 'react';

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();
 const [session] = useSession();
  const [show, setShow] = useState(1);
  const [handleShow, setHandleShow] = useState(false);

  console.log(session?.user)

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
    

    useEffect(() => {
       const listener = () => {
          if (window.scrollY > 80) {
            setHandleShow(true); 
            } else 
            setHandleShow(false); 
          }; 
          window.addEventListener("scroll", listener);
          
          return () => { 
            window.removeEventListener("scroll", listener); 
          }; 
        }, []);

        
  return (


    <header className={`fixed top-0 z-40 grid w-screen grid-cols-1  transition duration-100 ease-out p-5 ${handleShow ? "bg-white shadow-md" : ""} md:grid-cols-3  z-50 grid grid-flow-row grid-cols-2 p-5 md:px-10 sm:grid-cols-3 `}> 
    {/* fixed w-full top-0 z-50 grid sm:grid-cols-4 grid-cols-1 navbar p-5 md:px-10 false */}
      {/* Left logo */}
      <div
        onClick={() => router.push("/")}
        className="relative h-15 flex items-center md:h-10  my-auto cursor-pointer"
      >
        <Image
          src="https://res.cloudinary.com/dp0qzldgh/image/upload/v1629997104/rozbnb_6_nscadk.png"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* Search */}
      <div className="flex items-center py-2 bg-white rounded-full md:border-2 md:shadow-sm  ">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          className="flex-grow pl-2 md:pl-4 text-sm text-gray-400 placeholder-gray-400 bg-transparent outline-none "
          placeholder={placeholder || "Start Your Search..."}
        />
        <SearchIcon className="hidden h-8 p-2 text-white bg-red-400 rounded-full cursor-pointer md:inline-flex md:mx-2" />
      </div>
      {/* Right */}
      <div className="hidden md:flex items-center justify-end space-x-4 text-gray-400">
        <p className="hidden pl-4 font-bold cursor-pointer md:inline font">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div className="flex items-center p-2 space-x-2 text-gray-800 bg-white border-2 rounded-full">
          <MenuIcon className="h-7 cursor-pointer" />
          {session?.user ? <img src={session?.user?.image} alt={session?.user?.name} className="h-7 cursor-pointer rounded-full"  onClick={() => signOut()}/> :<UserCircleIcon className="h-7 cursor-pointer"onClick={() => router.push("/signin")} />}
        </div>
      </div>

      {/* Date range picker */}
      <div className="absolute md:w-[580px]  top-20 md:left-[20%] lg:left-[30%]  z-50">
        {searchInput && (
          <div className="z-50 flex flex-col p-5 mt-5 bg-white shadow-md md:col-span-4 w-max rounded-xl   ">
         <div className={"hidden md:inline-flex"}>
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#FD5B61"]}
              onChange={handleSelect}
            />
          </div>
          <div className={"md:hidden flex sm:p-0"}>
            <DateRange
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#FD5B61"]}
              onChange={handleSelect}
            />
          </div>
            <div className="flex w-screen md:w-[580px] items-center border-b mb-4 top-auto right-auto bottom-auto left-auto bg-white">
              <h2 className="flex-grow text-2xl font-semibold">
                Number of Guests
              </h2>
              <UsersIcon className="h-5 justify-right"  />
              <input
                value={noOfGuests}
                onChange={(e) => setNoOfGuests(e.target.value)}
                min={1}
                type="number"
                className="w-12 pl-2 text-lg ml-2 rounded-md text-red-400 outline-none"
              />
            </div>
            <div className="flex w-screen md:w-[580px]">
              <button
                className="w-1/2 text-gray-500 hover:shadow-inner md:flex-grow"
                onClick={resetInput}
              >
                Cancel
              </button>
              <button
                className="w-1/2 bg-red-400 h-8 text-white hover:bg-white  hover:text-red-400 hover:shadow-inner rounded-md md:flex-grow"
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