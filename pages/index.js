import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MobileNav from "../components/MobileNav";
import SmallCard from "../components/SmallCard";
import HostingCard from "../components/HostingCard"
import Loader from "../components/Loader"
import { useEffect, useState } from "react";
import { live, discover } from "../data";
import Cards from "../components/Cards";

export default function Home({ exploreData, liveAnywhere }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      
      <Head>
        <title>Rozbnb: Holiday Rentals, Cabins, Beach Houses </title>
        <meta
          name="description"
          content="Rozbnb clone made by rozen using Next.js, Tailwind.css, etc"
        />
        <meta
          name="keywords"
          content="Rozbnb-clone, Rozbnb-Rozen, Rozbnb-2-rozen, Rozen Deedi"
        />
        <meta property="og:title" content="Rozbnb" />
        <meta property="og:image" content="https://res.cloudinary.com/dp0qzldgh/image/upload/v1630137642/Frame_1_1_v5bwsc.png" />
        <meta property="og:url" content="https://rozendeedi.me/" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="shortcut icon" href="https://www.airbnb.co.in/favicon.ico" />
      </Head>
      {
      loading?(
        <Loader/>
       ):(
        <div>
          <Header />
          <Banner/>
          <MobileNav/>
          <main className="max-w-7xl mx-auto px-8 p-10 pb-16 rounded-lg m-5 shadow-xl sm:px-16">
            <section className="pt-6">
              <h2 className="text-3xl sm:text-4xl font-semibold pb-5">
                Explore Nearby
              </h2>
          
              <SmallCard/>
            
              <LargeCard
              img="https://links.papareact.com/4cj"
              title="The Greatest Outdoors"
              description="Wishlists curated by Rozbnb."
              buttonText="Get Inspired"
            />
            </section>
            <section className="pt-6">
              <Cards {...live} />


              <div className="pt-20">
              <Cards {...discover}/>
              </div>
              <HostingCard
                img="https://a0.muscache.com/im/pictures/5b4dc94a-0b4c-4c27-b50f-9c5a5b93c775.jpg"
                title="Try hosting"
                description="Earn extra income and unlock new opportunities by sharing your space."
                buttonText="Learn more"
            />
            </section>


          </main>
          <footer>
            <Footer />
          </footer>
      </div>
      )} 
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://jsonkeeper.com/b/UMTE").then(
    (res) => res.json()
  );

  const liveAnywhere = await fetch("https://jsonkeeper.com/b/VHHT").then(
    (res) => res.json()
  );
  const discoverExpCard = await fetch("https://jsonkeeper.com/b/UELS").then(
    (res) => res.json()
  );
  return {
      
    props: { exploreData, liveAnywhere, discoverExpCard},
  };
}
