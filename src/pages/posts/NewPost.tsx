import { useQueryClient, useMutation } from '@tanstack/react-query'
import React from 'react'
import { FormOptions } from '../../shared/form/types'
import TheForm from './../../shared/form/TheForm';
import { client } from './../../pb/config';
import { Admin } from 'pocketbase';
import { Record } from 'pocketbase';

interface NewPostProps {
user:Record|Admin|null|undefined
}

export const NewPost: React.FC<NewPostProps> = ({user}) => {
  const editing = true
  const [authing, setAuthing] = React.useState(true)
  const [error, setError] = React.useState({ name: "", message: "" })
  const queryClient = useQueryClient();

  const form_input: FormOptions[] = [
    { field_name: "body", field_type: "textarea", default_value: "", editing },
    { field_name: "media", field_type: "file", default_value: "", editing },
    { field_name: "emp", field_type: "text", default_value:user?.id, editing:false },
  ]
  const addUserMutation = useMutation(async (vars: { coll_name: string, payload: FormData }) => {
    try {
      const record = await client.collection('posts').create(vars.payload);
      console.log("successfull auth === ", record)
    }
    catch (err: any) {
      console.log("error in login mutation catch block", err.message)
      // setError({ name: "main", message: err?.messge })
      throw err
    }
  },
    {
      // onSettled: () => {
      //     queryClient.invalidateQueries(["user"]);
      // },
      onError: (err: any) => {
        setError({ name: "main", message: err?.message })
      }
    }

  )


  const handleSubmit = async (data: FormData) => {
    addUserMutation.mutate({ coll_name: 'user', payload: data })
  };


return (
  
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
