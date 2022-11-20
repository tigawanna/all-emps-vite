
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TheForm from '../../shared/form/TheForm';

import { FormOptions } from '../../shared/form/types';

import { TheIcon } from '../../shared/TheIcon';
import { FaRegEdit } from 'react-icons/fa';
import { useCollection } from './../../pb/useCollection';
import { client } from './../../pb/config';
import { concatErrors } from './../../components/auth/utils';
import { Record } from 'pocketbase';
import { Admin } from 'pocketbase';

interface ProfileProps {
    user?: Record | Admin | null
}

export interface ProfileInput{
name:string
avatar:File|null
email?:string
}

export interface EmpsDetails {
  "@collectionId": string
  "@collectionName": string
  id: string
  created: string
  updated: string
  bio: string
  country: string
  phone: string
  cv: string
  user: string
  avatar:string;
  name:string
}


export const Profile: React.FC<ProfileProps> = ({user }) => {
console.log("prfile user == ",user)
const [editing, setEditing] = React.useState(true)
const [error, setError] = React.useState({ name: "main", message: "" })
// const [input, setInput] = React.useState<ProfileInput>({ avatar:null, name: "",email:user?.email })
// const filter = `user = "${user?.id}"  `
// const emps_query = useCollection({ key: ['empsdetails'], filter, expand: "user",})
const queryClient = useQueryClient();



// const emps_data_arr = emps_query.data as EmpsDetails[] |undefined
// const emps_data=emps_data_arr&& emps_data_arr[0]


const updateProfileMutation = useMutation(async(vars: { coll_name: string, payload: FormData }) => {
   try{
//  const record = await client.collection('emps').update('empsdetails', emps_data.id, vars.payload);
  if(user?.id){
    const record = await client.collection('emps').update(user?.id, vars.payload);
  console.log("emps updated details === ", record)
  }else{
    throw Error("user id required")
  }
  }
  catch(e){
     console.log("errors updating profile   ",e)
    }

  },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["empsdetails"]);
      },
      onError: (err) => {
        // console.log("mutation error ==== ", concatErrors(err))
        setError({ name: "main", message: concatErrors(err) })
      }
    }
)
const handleSubmit = async (data: FormData) => {
    await updateProfileMutation.mutate({ coll_name: 'user', payload: data })
};

  // if (emps_query.error) {
  //   return (
  //     <div className="w-full h-full flex  justify-center items-centerflex-wrap text-lg  text-red-300">
  //       {/*@ts-expect-error */}
  //       {emps_query.error?.message}
  //     </div>
  //   );
  // }

  // if (emps_query.isLoading) {
  //   return <div className="w-full h-full flex-center"> loading ..... </div>;
  // }
  // console.log("EMPS  DATA   ++++++ =====>>>>> ", emps_data)
return (
  <div className='w-full min-h-screen flex flex-col items-center '>
  <div className='text-3xl font-bold m-2 flex items-center justify-center'> Profile 
      <div className='text-3xl font-bold m-2 flex'></div>
      <TheIcon  Icon={FaRegEdit} size='20' iconAction={()=>setEditing(prev=>!prev)}/>
  </div>

  <div className='w-[85%] md:w-[50%] h-full flex-center-col '> 
   <div className='w-full '>
    {/* <ProfileNameAvatar
    input={input}
    setInput={setInput}
    /> */}
    <TheForm
      form_title=''
      fields={makeinputs(user,editing,user)}
      validate={validate}
      submitFn={handleSubmit}
      is_submitting={updateProfileMutation.isLoading}
      error={error}
      button_title={user?"update":"create"}
      editing={editing}
    />
    </div>

    </div>
</div>
);
}


export interface UserDetailsInput {
  bio: string;
  country: string;
  phone: string;
  cv: string
}
interface Validate {
  input: UserDetailsInput;
  setError: (error: { name: string; message: string }) => void;
}


const validate = ({ input, setError }: Validate) => {
  // console.log("input === ", input)
  // const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (input.bio === "") {
    setError({ name: "bio", message: "bio field required" })
    return false
  }

  if (input.country === "") {
    setError({ name: "country", message: "please select a country ,3 key owrds minimum" })
    return false
  }

  if (input.cv === "") {
    setError({ name: "cv", message: "kindly attach cv link" })
    return false
  }

  setError({ name: "", message: "" })
  return false
}

const makeUrl = (record: Record | Admin | null) => {
  //@ts-expect-error
  return `https://emps.tigawanna.tech/api/files/emps/${record.id}/${record?.avatar}`
}



const makeinputs = (emps_data:  null | Record | Admin,editing:boolean,user?:Record| Admin|null)=>{
  const form_input: FormOptions[] = [
    { field_name: "avatar", field_type: "file", default_value: makeUrl(emps_data), required: true, editing },
    { field_name: "name", field_type: "text", default_value: emps_data?.name, required: true, editing },
    { field_name: "bio", field_type: "textarea", default_value: emps_data?.bio, required: true, editing },
    { field_name: "country", field_type: "countryselect", default_value: emps_data?.country, required: true, 
    editing },
    { field_name: "phone", field_type: "text", default_value: emps_data?.phone, required: true, editing },
    {
     field_name: "cv", field_type: "text", default_value: emps_data?.cv, required: true, editing,
      placeholder: "enter google doc link"
    },
    { field_name: "user", field_type: "text", default_value: user?.id as string, required: true, editing:false },

  ]
  return form_input
}



