import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Head from "next/head";
import Fade from 'react-reveal/Fade';

function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, guests } = router.query;

  const formatedStartDate = format(new Date(startDate), "dd MMM yy");
  const formatedEndDate = format(new Date(endDate), "dd MMM yy");

  const range = `${formatedStartDate} - ${formatedEndDate}`;
  return (
    <div className=" h-screen">
      <Head>
        <title>Airbnb: {location}  </title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header
        placeholder={`${location} | ${formatedStartDate} - ${formatedEndDate} | ${guests} guests`}
      />
      <Fade>
      <main className="max-w-7xl mt-24 mx-auto flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {guests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-norap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type Of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>
          <div className="flex flex-col p-10 rounded-lg m-5 shadow-2xl "> 
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
        </section>
      </main>
      </Fade>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResults,
    },
  };
}
