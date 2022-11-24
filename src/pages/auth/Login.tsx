import React from "react";
import { useNavigate } from 'react-router-dom';

import { EmailPasswordLogin } from "../../components/auth/EmailPasswordLogin";
import { Record } from 'pocketbase';
import { Admin } from 'pocketbase';
import { Link } from 'react-router-dom';




interface LoginProps {
user?: Record | Admin | null
}

export const Login: React.FC<LoginProps> = ({user}) => {

  const navigate = useNavigate()
  React.useEffect(() => {
    if (user?.email) {
      navigate('/')
    }
  }, [user?.email])


return (
  <div className="w-full  h-[70%] flex flex-col items-center 
  justify-center 

  ">
    <div className="w-[80%] md:w-[60%]  m-2 p-2 flex flex-col 
    items-center justify-start ">
    <EmailPasswordLogin/>
    </div>
    <Link
    className="text-blue-500"
    to={'/auth/signup'}>
      Create new account
    </Link>
    </div>
  );
};
