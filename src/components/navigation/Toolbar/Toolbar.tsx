import React from "react";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
// import { User } from "pocketbase";
// import { client } from "../../../pocketbase/config";
import { useTheme } from './../../../shared/hooks/themeHook';
import { BsSunFill,BsFillMoonFill} from "react-icons/bs";
import { TheIcon } from "../../../shared/TheIcon";
import { Consent } from "../../../shared/Consent";
import { AiOutlineHome } from 'react-icons/ai'




interface ToolbarProps {
  user: any
}


export const Toolbar: React.FC<ToolbarProps> = ({user,}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme()
  const nextTheme = theme.theme === 'dark' ? 'light' : 'dark'
  const mode = theme.theme === "dark" ? BsSunFill : BsFillMoonFill;
  const toggle = () => {theme.setTheme(nextTheme)}
  const queryClient = useQueryClient();

  const logout = () => {
    // client.authStore.clear();
    queryClient.invalidateQueries(["user"]);
  };
  const image = user?.profile?.avatarUrl;

  return (
    <div className="w-[100%]   
    dark:text-white h-10 p-2">
      <IconContext.Provider
        value={{
          size: "25px",
          className: "table-edit-icons",
        }}
      >
        {open ? (
          <Consent
            setOpen={setOpen}
            message={"Sign Out?"}
            action={logout}

          />
        ) : null}

        <div className="flex flex-grow flex-1 text-lg font-bold h-full w-full
        ">
          <div className="m-1 w-full p-1 flex justify-center items-center ">
       
            <Link to="/" >
              <div className="w-fit p-1 mx-5 flex justify-center items-center dark:text-white  ">
                <TheIcon
                  Icon={AiOutlineHome}
                  size={"30"}
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
           className="  rounded-md  flex justify-center 
            items-center dark:text-white w-12 min-h-12 h-full ml-3 mr-1 ">
            {!user ? (
              <Link to="/login" >
             <TheIcon
              Icon={FaUserCircle}
              size={"30"}
              color={""}
             />
             </Link>
            ) : (
              <img
               src={image}
                alt={""}
                  className="rounded-[50%] hover:rounded-sm border-2 h-full"
                onClick={() => setOpen(true)}
              />
            )}
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
};
