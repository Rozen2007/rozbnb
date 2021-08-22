import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";

import NextNProgress from "nextjs-progressbar";

function signin({ providers }) {

  return (
    <div>
      {Object.values(providers).map((provider) => {
        return (
            <>
            <Head>
                <title>SignIn</title>
            
          </Head>
            <div className="min-width-[50px] sm:h-full  items-center justify-center mx-[10%] mt-[30%] md:mx-[38%] md:mt-[10%] rounded-xl bg-[#ff5a5f] p-10 shadow-2xl ">
                <NextNProgress
                  color="#ffff"
                  startPosition={0.3}
                  stopDelayMs={200}
                  height={3}
                  options={{ showSpinner: false }}
                  showSpinner={false}
                  showOnShallow={true}
                />
                    <div className="flex flex-col items-center mt-16">
                    <Image
                        src="https://cdn.dribbble.com/users/385247/screenshots/3623803/01_06_2017_airbnb_800x600.gif"
                        height={600}
                        width={800}
                    />
                    </div>
                    

                    <div className="mt-16 mx-auto  bg-red-400 max-width-30 lg:w-60 md:w-40 text-white items-center  focus:hover:ring-2 uppercase text-center rounded-xl py-2 cursor-pointer hover:bg-red-500 transition duration-200" onClick={() => signIn(provider.id)} >
                    Sign in with {provider.name}
                    </div>
            </div>
            </>
        );
      })}
    </div>
   
  );
}

export default signin;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await providers(context),
      csrfToken: await csrfToken(context),
    },
  };
}
