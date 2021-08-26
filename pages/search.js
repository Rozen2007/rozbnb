import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Head from "next/head";
import Fade from 'react-reveal/Fade';
import Map from "../components/Map";
import MobileNav from "../components/MobileNav";

function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  
  const formatedStartDate = format(new Date(startDate), "dd MMM yy");
  const formatedEndDate = format(new Date(endDate), "dd MMM yy");

  const range = `${formatedStartDate} - ${formatedEndDate}`;
  return (
    <div className=" h-screen">
      <Head>
        <title>Rozbnb: {location}  </title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header
        placeholder={` ${location} | ${formatedStartDate} - ${formatedEndDate} | ${ noOfGuests } guests`}
        className="bg-white"
      />


        <Map searchResults={searchResults} />

     
      <MobileNav/>
      <main className="  -mb-[60%] -mt-[100px] relative mx-42 md:w-[73%] bg-white shadow-2xl m-3 ml-12  p-8 t-0 rounded-2xl mr-10 mt-0 pb-10  md:ml-40 lg:ml-52 z-10">    
          <p className="text-xs ">
            300+ Stays - <span className="font-bold">{range}</span>- for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-2 text-gray-800 whitespace-norap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type Of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>
          <Fade >
          <div className="flex flex-col  "> 
            {searchResults?.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
          
          </Fade>
      </main>
      
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://jsonkeeper.com/b/IAGU").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResults,
    },
  };
}
