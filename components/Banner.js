import Image from "next/image";

function Banner() {
  return (
    <div className="relative h-[250px] sm:h-[350px] lg:h-[450px] xl:h-[550px] 2xl:h-[650px]">
      <Image src="https://res.cloudinary.com/dp0qzldgh/image/upload/v1628144458/hero_hjmrxv.webp" layout="fill" objectFit="cover" />
      <div className="absolute top-1/4 w-full pl-5 md:pl-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-lg sm:text-xl md:xl title lg:text-6xl font-bold text-white text-left leading-6">
            Olympian &<br /> Paralympian
            <br /> Online
            <br /> Experiences
          </p>
          <button className="bg-white rounded-2xl px-5 md:px-10 py-3 sm:mt-3 text-xs md:text-lg lg:mt-5 shadow-md drop-shadow-lg font-bold my-3 hover:shadow-xl active:scale-90 transition transform duration-150">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
