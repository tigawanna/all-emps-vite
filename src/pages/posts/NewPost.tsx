import { useQueryClient, useMutation } from '@tanstack/react-query'
import React from 'react'
import { FormOptions } from '../../shared/form/types'
import TheForm from './../../shared/form/TheForm';
import { client } from './../../pb/config';
import { Admin } from 'pocketbase';
import { Record } from 'pocketbase';
import { concatErrors } from '../../components/auth/utils';
import { useNavigate } from 'react-router-dom';

interface NewPostProps {
user:Record|Admin|null|undefined
}

export const NewPost: React.FC<NewPostProps> = ({user}) => {
  const editing = true
  const [authing, setAuthing] = React.useState(true)
  const [error, setError] = React.useState({ name: "", message: "" })
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const form_input: FormOptions[] = [
    { field_name: "body", field_type: "textarea", default_value: "", editing },
    { field_name: "media", field_type: "file", default_value: "", editing },
    { field_name: "emp", field_type: "text", default_value:user?.id, editing:false },
  ]
  const addUserMutation = useMutation(async (vars: { coll_name: string, payload: FormData }) => {
    try {
      const record = await client.collection('posts').create(vars.payload);
      // console.log("successfull auth === ", record)
    }
    catch (err: any) {
      // console.log("error in login mutation catch block", concatErrors(err))
      // setError({ name: "main", message: err?.messge })
      throw err
    }
  },
    {
      onSettled: () => {
          // queryClient.invalidateQueries(["user"]);
        // navigate(-1)
      },
      onSuccess:()=>{
        navigate(-1)
      },
      onError: (err: any) => {
     
        setError({ name: "main", message: concatErrors(err) })
      }
    }

  )


  const handleSubmit = async (data: FormData) => {
   await  addUserMutation.mutate({ coll_name: 'posts', payload: data })
  
  };


return (
  <div className='w-full h-full flex items-center justify-center'>
    <div className='w-full md:w-[70%] h-full md:h-[70%] '>
  <TheForm
    form_title='Add Post'
    fields={form_input}
    validate={validate}
    submitFn={handleSubmit}
    is_submitting={addUserMutation.isLoading }
    error={error}
    editing={editing}
    button_title={"create post"}
  />
  </div>
  </div>
);
}

export interface FormInput {
 body:string,
 emp:string
}
interface Validate {
  input: FormInput;
  setError: (error: { name: string; message: string }) => void;
}

const validate = ({ input, setError }: Validate) => {
  // console.log("input === ",input)
  // const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (input.body === "") {
    setError({ name: "body", message: "post can't be blank" })
    return false
  }

  // if (input.emp && input.emp !=="") {
  //   setError({ name: "emp", message: "emp needed" })
  //   return false
  // }

  setError({ name: "", message: "" })
  return true
}
