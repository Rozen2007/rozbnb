import React from "react";
import Image from "next/image";
function DiscoverExcpCard({ img, title, desc }) {
  return (
    <div className="cursor-pointer hover:scale-105 transition transform duration-300 ease-out">
      <div className="relative h-96 w-96">
        <Image
          className="rounded-xl"
          src={img}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div>
        <h2 className="font-semibold text-xl">{title}</h2>
        <h3 className="">{desc}</h3>
      </div>
    </div>
  );
}

export default DiscoverExcpCard;
