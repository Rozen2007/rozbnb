import React from "react";
import Image from "next/image";

function GreatestOutCard({ img, title, description, buttonText }) {
  return (
    <div className="relative py-16 cursor-pointer">
      <div className="relative h-96 min-w-[300px]">
        <Image
          className="rounded-2xl"
          src={img}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute top-32 left-12">
        <h3 className="text-black font-bold text-4xl mb-3 w-64 ">{title}</h3>
        <p className="text-black overflow-ellipsis">{description}</p>
        <button className="text-white text-sm bg-black px-4 py-2 rounded-lg mt-5">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default GreatestOutCard;
