import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { bookNow, removeStay, selectItems } from "../slices/bookSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51IuEbNSFhYF5q8wPMgrqb89U1crXcPveRwuQXZAItdXm4HOP0G3kkHKPJ4b9VgPm0OiOCV5CtapVLnj0k7vznNq600asGDXT0u"
);

const InfoCard = ({
  id,
  img,
  location,
  title,
  description,
  star,
  price,
  total,
}) => {
  const items = useSelector(selectItems);
  const [session] = useSession();
  const dispatch = useDispatch();

  const continueToBooking = async () => {
    dispatch(
      bookNow({
        id,
        img,
        title,
        description,
        total,
      })
    );
  };
  const createCheckoutSession = async () => {
    if (!session) {
      alert("Please sign in");
    }

    if (session) {
      const stripe = await stripePromise;
      const newPrice = parseInt(price.slice(1, -1)) * 101;
      const checkoutSession = await axios.post("/api/create-checkout-session", {
        img: img,
        title: title,
        description: description,
        price: newPrice,
      });
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    }
  };

  //   const createCheckoutSession = async () => {
  //     const stripe = await stripePromise;

  //     const checkoutSession = await axios.post("/api/create-checkout-session", {
  //         items,
  //         email: session.user.email
  //     })

  //     const result = await stripe.redirectToCheckout({
  //         sessionId: checkoutSession.data.id
  //     })

  //     if (result.error) {
  //         alert(result.error.message);
  //     }
  // }

  return (
    <div className="flex flex-col md:flex-row py-7 px-3 border-b cursor-pointer  hover:shadow-lg transition duration-200 ease-out first:border-t">
      <div className="relative h-32 w-[100%] md:h-52 md:w-80 flex-shrink-0">
        <Image
          className="rounded-2xl"
          src={img}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col flex-grow pt-2 md:pt-0 md:pl-5">
        <div className="flex justify-between">
          <p>{location}</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>
        <h4 className="text-xl">{title}</h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-grow ">{description}</p>
        <div className="flex justify-between items-end">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" /> {star}
          </p>
          <div className="flex flex-col justify-end -mt-2">
            <p className="text-right lg:text-2xl font-semibold pb-2 pr-4">
              {price}
            </p>
            <p className="text-right font-extralight">{total}</p>
            {items.length > 0 ? (
              <>
                {items.map((item) => {
                  if (item.id == id) {
                    return (
                      <button
                        role="link"
                        onClick={createCheckoutSession}
                        className="bg-red-400 py-1.5 text-white rounded-xl mt-2 shadow-md transition transform duration-200 ease-out hover:scale-105 active:scale-90 font-semibold px-3"
                      >
                        {!session ? "Sign in to book" : "Pay Now"}
                      </button>
                    );
                  } else {
                    return (
                      <button
                        role="link"
                        onClick={continueToBooking}
                        className="bg-red-400 py-1.5 text-white rounded-xl mt-2 shadow-md transition transform duration-200 ease-out hover:scale-105 active:scale-90 font-semibold px-3"
                      >
                        {!session ? "Sign in to book" : "Book Now"}
                      </button>
                    );
                  }
                })}
              </>
            ) : (
              <button
                role="link"
                onClick={continueToBooking}
                className="bg-red-400 py-1.5 text-white rounded-xl mt-2 shadow-md transition transform duration-200 ease-out hover:scale-105 active:scale-90 font-semibold px-3"
              >
                {!session ? "Sign in to book" : "Book Now"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
