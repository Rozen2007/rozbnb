


// function signin({ providers }) {

//   return (
//     <div>
//       {Object.values(providers).map((provider) => {
        
//         return (
//             <div>
//             <Head>
//                 <title>SignIn</title>
            
//           </Head>
//             <div className=" items-center justify-center rounded-xl  p-10 shadow-2xl ">
//                 <NextNProgress
//                   color="#ffff"
//                   startPosition={0.3}
//                   stopDelayMs={200}
//                   height={3}
//                   options={{ showSpinner: false }}
//                   showSpinner={false}
//                   showOnShallow={true}
//                 />
//                     <div className="flex flex-col items-center mt-16">
//                     <Image
//                         src="https://cdn.dribbble.com/users/385247/screenshots/3623803/01_06_2017_airbnb_800x600.gif"
//                         height={600}
//                         width={800}
//                     />
//                     </div>
                    

//                     <div className="mt-16 mx-auto  bg-red-400 max-width-30 lg:w-60 md:w-40 text-white items-center  focus:hover:ring-2 uppercase text-center rounded-xl py-2 cursor-pointer hover:bg-red-500 transition duration-200" onClick={() => signIn(provider.id)} >
//                     Sign in with {provider.name}
//                     </div>
//             </div>
//             </div>
//         );
//       })}
//     </div>
   
//   );
// }

// export default signin;

import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import NextNProgress from "nextjs-progressbar";


const Login = ({providers}) => {

    return (
        <div className={""}>
          
          <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
  {Object.values(providers).map((provider) => {
        return (
            <div className={"bg-[#ff5a5f] md:left-[50%] md:p-[50px] px-[10%] left-[50%]   translate-x-[-50%] translate-y-[-50%] text-center shadow-2xl"}
                style={{
                    position: "absolute",
                    top: "50%",
                    // left: "50%",
                    // transform: "translateX(-50%) translateY(-50%)",
                    borderRadius: "5px",
                    borderRadius: 10
                    
                    
                }}
            >
               <div className="flex flex-col items-center mt-10">                   
              <img
                    className={"cursor-pointer h-[480] w-[640]  sm:w-52 "}
                    src="https://cdn.dribbble.com/users/385247/screenshots/3623803/01_06_2017_airbnb_800x600.gif"
                /></div>
                <button className="mt-9 md:mb-0 mb-10 text-xs  p-2 mx-auto  bg-red-400 max-width-30 lg:w-60 md:w-40 text-white items-center  focus:hover:ring-2 uppercase text-center rounded-xl py-2 cursor-pointer hover:bg-red-500 transition outline-none
                 duration-200" onClick={() => signIn(provider.id)} >Sign In With {provider.name}</button>
            </div>  
        )
      })}

       
        </div>
    );
}
export default Login

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


