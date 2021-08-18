import Image from "next/image";
import { motion, useTransform, useMotionValue } from "framer-motion";

function LargeCard({ img, title, description, buttonText }) {

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  return (
    <section className="relative py-16 cursor-pointer ">


      <div className="relative h-96 min-w-[300px] shadow-lg rounded-2xl transition duration-300">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl pointer-events-none "
        />
      </div>

      <div className="absolute top-32 left-12">
        <h3 className="text-4xl mb-3 w-64 ">{title}</h3>
        <p>{description}</p>
        <button className="text-sm text-white hover:bg-red-400 hover:shadow-md transition duration-300  bg-gray-900 px-4 py-2 rounded-lg mt-5">
          {buttonText}
        </button>
      </div>

    </section>
  );
}

export default LargeCard;