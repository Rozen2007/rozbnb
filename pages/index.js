import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";
import HostingCard from "../components/HostingCard"
import Loader from "../components/Loader"
import { useEffect, useState } from "react";


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
        <title>Airbnb: Holiday Rentals, Cabins, Beach Houses </title>
        <meta
          name="description"
          content="Airbnb clone made by rozen using Next.js, Tailwind.css, etc"
        />
        <meta
          name="keywords"
          content="Airbnb-clone, Airbnb-Rozen, Airbnb-2-rozen, Rozen Deedi"
        />
        <meta property="og:title" content="Rozen's Airbnb" />
        <meta property="og:image" content="https://res.cloudinary.com/dp0qzldgh/image/upload/v1628345132/Untitled_design_3_ybcutg.png" />
        <meta property="og:url" content="https://airbnb-2-rozen.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />`
      </Head>
      {
      loading?(
        <Loader/>
       ):(
        <div>
          <Header />
          <Banner />
          <main className="max-w-7xl mx-auto px-8 p-10  m-5 shadow-xl sm:px-16">
            <section className="pt-6">
              <h2 className="text-3xl sm:text-4xl font-semibold pb-5">
                Explore Nearby
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {exploreData?.map(({ location, img, distance }) => (
                  <SmallCard
                    key={location}
                    img={img}
                    location={location}
                    distance={distance}
                  />
                ))}
              </div>
              <LargeCard
              img="https://links.papareact.com/4cj"
              title="The Greatest Outdoors"
              description="Wishlists curated by Airbnb."
              buttonText="Get Inspired"
            />
            </section>
            <section className="pt-6">
              <h2 className="text-3xl sm:text-4xl font-semibold pb-5">
                Live Anywhere
              </h2>
              <div className="flex space-x-3 overflow-scroll p-3 -ml-3 scrollbar-hide">
                {liveAnywhere?.map(({ img, title }) => (
                  <MediumCard key={img} img={img} title={title} />
                ))}
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

  const liveAnywhere = await fetch("https://links.papareact.com/zp1").then(
    (res) => res.json()
  );
  const discoverExpCard = await fetch("https://jsonkeeper.com/b/UELS").then(
    (res) => res.json()
  );
  return {
      
    props: { exploreData, liveAnywhere, discoverExpCard},
  };
}
