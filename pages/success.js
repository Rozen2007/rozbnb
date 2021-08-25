import { CheckCircleIcon } from "@heroicons/react/solid";
import { getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Header from "../components/Header";
import Head from "next/head";

const Success = ({ session }) => {
  const router = useRouter();

  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Your location has been booked!</title>
        <link
          rel="shortcut icon"
          href="https://a0.muscache.com/airbnb/static/logotype_favicon-21cc8e6c6a2cca43f061d2dcabdf6e58.ico"
        />
      </Head>

      <Header />

      <div className="max-w-screen-lg mx-auto pt-60">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center justify-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl font-semibold">
              Thank you, your location has been successfully booked!
            </h1>
          </div>
          <button
            onClick={() => router.push("/")}
            className="bg-red-400 text-white rounded-xl font-semibold py-2 mt-8 "
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Success;
