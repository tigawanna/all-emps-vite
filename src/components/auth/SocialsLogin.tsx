import React from "react";
import { useNavigate } from 'react-router-dom';
import { Admin, Record } from "pocketbase";
import { BsGoogle,BsFacebook,BsReddit,BsTwitter,BsDiscord,BsGithub} from 'react-icons/bs'
import { TheIcon } from '../../shared/TheIcon';
import { useQuery } from '@tanstack/react-query';
import { redirect_url } from "../../utils/env";
import { Loading } from "../../shared/Loading";
import { client } from './../../pb/config';





interface SocialsLoginProps {
user?: Record | Admin | null | undefined
}
interface ProvType{

    name: string
    state: string
    codeVerifier: string
    codeChallenge: string
    codeChallengeMethod: string
    authUrl: string

}

export const SocialsLogin: React.FC<SocialsLoginProps> = ({user}) => {
  const navigate = useNavigate()
  React.useEffect(() => {
    if (user?.email) {
      navigate('/')
    }
  }, [])

const getProviders = async () => {
    return await client.collection('emps').listAuthMethods();
}
const provs_query = useQuery(['auth-providers'],getProviders,)

  if (provs_query.error) {

    return (
      <div className="w-full h-full flex flex-wrap  text-red-900 dark:text-red-400">
        {/* @ts-expect-error */}
        ERROR LOADING {provs_query.error.message}
      </div>);
  }

  if (provs_query.isLoading) {
    return <div className="w-full h-full flex-center">
      <Loading size={50} />
      </div>;
  }
const provs = provs_query.data?.authProviders


const startLogin = (prov:ProvType) => { 
  localStorage.setItem("provider",JSON.stringify(prov));
  const redirectUrl = redirect_url;
  const url = prov.authUrl + redirectUrl;
  // console.log("start login url + redirect  === ",url)
  // console.log("start login window loaded ? === ", typeof window !== "undefined")

  if (typeof window !== "undefined") {
    // console.log("type of window === undefined")
      window.location.href = url;
    }
  };
const icons = {"google":BsGoogle,"twitter":BsTwitter,"discord":BsDiscord,
"reddit":BsReddit,"facebook":BsFacebook,"github":BsGithub}

  return (
    <div className="w-full h-full p-5 flex flex-col items-center justify-center 

       ">
      <div className="text-2xl font-bold my-3">
        Login with
      </div>
      {provs &&
        provs?.map((item:any) => {
          return (
            <button 
            className="p-2 
            text-black dark:text-white border-2 border-slate-700 dark:border-slate-400 
            text-3xl 
            flex items-center justify-center m-2 rounded-lg 
            hover:shadow-slate-900 dark:hover:shadow-slate-50 
            hover:shadow-lg dark:hover:shadow-md
            hover:scale-105 hover-border-4 "
            key={item.name}
            onClick={() => startLogin(item)}>
              {/* @ts-expect-error */}
              <TheIcon size="30" Icon={icons[item.name]} color="" iconstyle="m-1" />
              <div className="text-3xl font-bld capitalize mx-3"> {item.name}</div>
           </button>
          );
        })}
    </div>
  );
};


