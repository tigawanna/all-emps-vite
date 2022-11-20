import React from "react";
import { useNavigate } from 'react-router-dom';
import { Admin, User } from "pocketbase";
import { SocialsLogin } from "./SocialsLogin";
import { EmailPasswordLogin } from "./EmailPasswordLogin";



interface LoginProps {
user?: User | Admin | null
}

export const Login: React.FC<LoginProps> = ({user}) => {
  const navigate = useNavigate()
  React.useEffect(() => {
    if (user?.email) {
      navigate('/')
    }
  }, [user])


return (
  <div className="w-full min-h-full md:h-full flex flex-col md:flex-row items-center justify-center">
    <div className="w-[80%] h-full md:w-[60%] md:h-[90%] m-2 flex flex-col 
    items-center justify-center ">
    <EmailPasswordLogin/>
    </div>
    {/* <div className="w-[80%] h-fit md:h-[70%] md:w-[25%]  m-2 flex flex-col items-center 
    justify-center shadow-md">
      <SocialsLogin />
    </div> */}
    </div>
  );
};