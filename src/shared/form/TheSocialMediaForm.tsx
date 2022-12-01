import React from "react";
import { TheIcon } from "./../TheIcon";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Record, Admin } from "pocketbase";
import { client } from "../../pb/config";
import { concatErrors } from "../../components/auth/utils";


interface TheSocialMediaFormProps {
  user?: Record | Admin | null;
  post:string
  depth?:number 
  parent?:string
}
interface FormInputs {
  body: string;
  media: MediaSource | Blob | null;
  post: string;
  depth?: number;
  parent?: string;
  emp: string;
}

export const TheSocialMediaForm: React.FC<TheSocialMediaFormProps> = ({ user,post,depth,parent }) => {
  const [error, setError] = React.useState({
    name: "",
    message: "",
  });
  const fileInput =
    React.useRef<HTMLInputElement | null>(null);
  const enableFileInput = () => {
    fileInput.current?.click();
  };
  const queryClient = useQueryClient();
  const [input, setInput] =
    React.useState<FormInputs>({
      body: "",
      media: null,
      post:post,
      depth:depth??0,
      parent:parent??"",
      emp:user?.id as string,
    });
  const img_url_or_file = input.media;

  const handleChange = (
    event: React.ChangeEvent<any>
  ) => {
    const { value } = event.target;
    setInput((prev) => {
      return {
        ...prev,
        [event.target.id]: value,
      };
    });

    if (event.target?.files) {
      setInput((prev) => {
        return {
          ...prev,
          [event.target.id]:
            event.target?.files[0],
        };
      });
    }
  };

  const addReplyMutation = useMutation(async (payload:FormData) => {
      try {
        //  const record = await client.collection('emps').update('empsdetails', emps_data.id, vars.payload);
        if (user?.id) {
          const result = await client.collection("replies").create(payload);
   
            await queryClient.cancelQueries(["replies"]);
            queryClient.setQueryData(["replies"], (old: any) => {
                console.log("old items === ", old)
                console.log("result  ==== ", result)
                // old.items[newItem.payload.get('id')] = newItem.payload
                if (old && result) {
                    old.unshift(result)
                }
                return old
            });
        } else {
          console.log("no user id preset");
          throw Error("user id required");
        }
      } catch (e) {
        console.log("errors adding  repliy   ",concatErrors(e));
        throw e;
      }
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["replies"]);
      },
      onError: (err) => {
        console.log("mutation error ==== ", concatErrors(err))
        setError({
          name: "main",
          message: concatErrors(err),
        });
      },
    }
  );
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields =["body","media","emp","post","parent","depth"]
      setError({ name: "", message: "" });
      const formData = new FormData();
      fields.map((item) => {
          console.log("item added to fromdata ",item)
        //   @ts-expect-error
        formData.append(item, input[item ])
      })
     addReplyMutation.mutate(formData)
  };
  // console.log("input === ",input)
  return (
    <div className="w-full h-full ">
      <div
        onClick={() => enableFileInput()}
        className="rounded-lg  flex justify-center items-center p-5"
      >
        {!input.media ? (
          <TheIcon
            Icon={AiOutlineCamera}
            size="40"
          />
        ) : (
          // <img src={pic.file_url as string} className="h-full w-full rounded-full" />
          <div className="w-[80%] flex justify-center items-center">
            {img_url_or_file ? (
              <img
                src={URL.createObjectURL(
                  img_url_or_file
                )}
                className="rounded-lg aspect-square max-h-56"
              />
            ) : null}
          </div>
        )}
      </div>
      <form 
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col justify-center items-center p-2 ">
        <textarea
          // style={{ borderColor: isError() ? "red" : "" }}
          className="w-[95%] p-2 m-1 border border-black h-52 scroll-bar
                dark:border-white text-base rounded-md   dark:bg-slate-700 
                focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 "
          id="body"
          placeholder="whats on your mind"
          onChange={handleChange}
          autoComplete={"off"}
          value={input.body}
        />
        <input
          ref={fileInput}
          style={{ display: "none" }}
          className="w-[90%] p-2 m-1 text-white   border border-black 
                  dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700"
          id="media"
          type="file"
          onChange={handleChange}
          autoComplete={"off"}

          // value={input[item.field_name]}
        />
        <button
          className="p-2 w-[70%] md:w-[50%]
            border-2 dark:border border-slate-700 dark:border-slate-400 dark:bg-slate-800
            flex items-center justify-center m-2 rounded-lg 
            hover:shadow-slate-900 dark:hover:shadow-slate-50 
            hover:shadow-lg dark:hover:shadow
            hover:scale-105"
        >
          send
        </button>
      </form>
      {error.name !== "" &&
      error.message !== "" ? (
        <div className="w-full flex items-center justify-center border-red-500 bg-red-300 text-base
          text-red-800">
          {error.message}
        </div>
      ) : null}
    </div>
  );
};
