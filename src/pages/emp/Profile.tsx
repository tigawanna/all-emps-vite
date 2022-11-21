
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
  avatar: string
  bio: string
  collectionId: string
  collectionName: string
  country: string
  created: string
  cv: string
  email: string
  emailVisibility: boolean
  id: string
  name: string
  phone: string
  updated: string
  username: string
  verified: boolean
  expand:{}
}


export const Profile: React.FC<ProfileProps> = ({user }) => {

const emp = user as EmpsDetails | undefined  
// console.log("prfile user == ",user)
const [editing, setEditing] = React.useState(true)
const [error, setError] = React.useState({ name: "", message: "" })
const queryClient = useQueryClient();
const updateProfileMutation = useMutation(async(vars: { coll_name: string, payload: FormData }) => {

try{
//  const record = await client.collection('emps').update('empsdetails', emps_data.id, vars.payload);
  if(user?.id){
  const record = await client.collection('emps').update(user?.id, vars.payload);
  queryClient.setQueryData(['user'],record)
  setEditing(false)
  // console.log("emps updated details === ", record)
  }else{
    console.log("no user id preset")
  throw Error("user id required")
  }
  }
  catch(e){
     console.log("errors updating profile   ",e)
    }

  },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["user"]);
      },
      onError: (err) => {
        // console.log("mutation error ==== ", concatErrors(err))
        setError({ name: "main", message: concatErrors(err) })
      }
    }
)
const handleSubmit = async (data: FormData) => {
    await updateProfileMutation.mutate({ coll_name: 'emps', payload: data })
};


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
      fields={makeinputs(emp,editing,user)}
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
  console.log("input === ", input)
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
  return true
}

const makeUrl = (record: EmpsDetails | undefined) => {

  if(record?.avatar){
    return `https://emps.tigawanna.tech/api/files/emps/${record.id}/${record?.avatar}`
  }
  return "https://picsum.photos/id/1/200/300"

}



const makeinputs = (emps_data: EmpsDetails | undefined ,editing:boolean,user?:Record| Admin|null)=>{
  const form_input: FormOptions[] = [
    { field_name: "avatar", field_type: "file", default_value: makeUrl(emps_data), required: true, editing },
    { field_name: "name", field_type: "text", default_value: emps_data?.name, required: true, editing },
    { field_name: "bio", field_type: "textarea", default_value: emps_data?.bio, required: true, editing },
    { field_name: "country", field_type: "countryselect", default_value: emps_data?.country??"", required: true, 
    editing },
    { field_name: "phone", field_type: "text", default_value: emps_data?.phone??"", required: true, editing },
    {
     field_name: "cv", field_type: "text", default_value: emps_data?.cv, required: true, editing,
      placeholder: "enter google doc link"
    },
    { field_name: "user", field_type: "text", default_value: user?.id as string, required: true, editing:false },

  ]
  return form_input
}



