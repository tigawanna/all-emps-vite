import React from "react";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTheme } from './../../../shared/hooks/themeHook';
import { BsSunFill,BsFillMoonFill} from "react-icons/bs";
import { TheIcon } from "../../../shared/TheIcon";
import { Consent } from "../../../shared/Consent";
import { AiOutlineHome } from 'react-icons/ai'
import { client, getUser } from './../../../pb/config';
import { Admin } from 'pocketbase';
import { Record } from 'pocketbase';




interface ToolbarProps {

}


export const Toolbar: React.FC<ToolbarProps> = ({}) => {
  const userQuery = useQuery(['user'], getUser)

  const [open, setOpen] = useState(false);
  const theme = useTheme()
  const nextTheme = theme.theme === 'dark' ? 'light' : 'dark'
  const mode = theme.theme === "dark" ? BsSunFill : BsFillMoonFill;
  const toggle = () => {theme.setTheme(nextTheme)}
  const queryClient = useQueryClient();
  
  const user = userQuery?.data

  const logout = () => {
     client.authStore.clear();
    queryClient.invalidateQueries(["user"]);
  };
  const image = "user?.profile?.avatarUrl";


  return (
    <div className="w-[100%] dark:text-white  p-1 flex justify-center items-center h-full">

        {open ? (
          <Consent
            setOpen={setOpen}
            message={"Sign Out?"}
            action={logout}

          />
        ) : null}

        <div className="flex flex-grow flex-1 justify-center items-center text-lg 
        font-bold h-full w-full ">
          <div className="m-1 w-full h-full p-1 flex justify-center items-center ">
       
            <Link to="/" >
              <div className="w-fit p-1 mx-5 flex justify-center items-center dark:text-white  ">
                <TheIcon
                  Icon={AiOutlineHome}
                  size={"25"}
                  color={""}
                  iconstyle={""}
                 />
              </div>
            </Link>
          </div>
   
   
          <div className="w-fit p-1 mx-5 flex justify-center items-center dark:text-white  ">
            <TheIcon
              Icon={mode}
              size={"25"}
              color={""}
              iconstyle={""}
              iconAction={toggle}
            />
          </div>
          <div
            className="  rounded-md  flex justify-center items-center
          dark:text-white w-16  h-full  ">
            {!user ? (
              <Link to="/auth" >
             <TheIcon
              Icon={FaUserCircle}
              size={"25"}
              color={""}
             />
             </Link>
            ) : (
              <img
               src={makeUrl(user)}
              alt={""}
                  className="rounded-[50%] hover:rounded-sm border-2 max-h-[40px] "
                onClick={() => setOpen(true)}
              />
            )}
          </div>
        </div>

    </div>
  );
};


const makeUrl = (record: Record | Admin | null |undefined) => {

  if (record?.avatar) {
    return `https://emps.tigawanna.tech/api/files/emps/${record.id}/${record?.avatar}`
  }
  return "https://picsum.photos/id/1/500/500"

}
