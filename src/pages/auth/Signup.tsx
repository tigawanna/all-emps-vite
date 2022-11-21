import React from "react";
import { Admin, Record } from "pocketbase";
import { EmailPasswordSignup } from '../../components/auth/EmailPasswordSignup';



interface SignupProps {
user?: Record | Admin | null
}

export const Signup: React.FC<SignupProps> = ({user}) => {
  // const navigate = useNavigate()
  // React.useEffect(() => {
  //   if (user?.email) {
  //     navigate('/')
  //   }
  // }, [user?.email])


return (
  <div className="w-full min-h-full md:h-full flex flex-col md:flex-row items-center justify-center">
    <div className="w-[80%] h-fit md:w-[60%]  m-2 flex flex-col 
    items-center justify-center ">
    <EmailPasswordSignup/>
    </div>
    {/* <div className="w-[80%] h-fit md:h-[70%] md:w-[25%]  m-2 flex flex-col items-center 
    justify-center shadow-md">
      <SocialsLogin />
    </div> */}
    </div>
  );
};
