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
import { ProfileMenu } from "../../../shared/ProfileMenu";




interface ToolbarProps {

}


export const Toolbar: React.FC<ToolbarProps> = ({}) => {
  const userQuery = useQuery(['user'], getUser)

  const [open, setOpen] = useState(false);
  const theme = useTheme()
  const nextTheme = theme.theme === 'dark' ? 'light' : 'dark'
  const mode = theme.theme === "dark" ? BsSunFill : BsFillMoonFill;
  const toggle = () => {theme.setTheme(nextTheme)}
  
  const user = userQuery?.data
  const avatar = makeUrl(user)

  return (
    <div className="w-[100%] dark:text-white  p-1 px-2 flex justify-center items-center h-full">



        <div className="flex flex-grow flex-1 justify-center items-center  h-full w-full ">
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
          dark:text-white w-16  h-full  aspect-square">
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
               src={avatar}
              alt={""}
                  className="rounded-[50%] hover:rounded-sm border-2 max-h-[40px] aspect-square"
                onClick={() => setOpen(true)}
              />
            )}
          {open ? (
            <div className="z-50 w-screen h-screen fixed top-14 right-0 bottom-0 left-0
            bg-slate-900 bg-opacity-70
            ">
            <div className="z-30 w-screen h-screen fixed top-14 right-0 bottom-0 left-0
            bg-slate-900 bg-opacity-70
            "
            onClick={()=>setOpen(prev=>!prev)}
            ></div>
            <ProfileMenu user={user} avatar={avatar} setOpen={setOpen}/>
            </div>
          ) : null}
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
