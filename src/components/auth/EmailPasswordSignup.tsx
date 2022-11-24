import React from 'react'
import TheForm from '../../shared/form/TheForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormOptions } from '../../shared/form/types';
import { client } from './../../pb/config';





interface EmailPasswordSignupProps {

}

export const EmailPasswordSignup: React.FC<EmailPasswordSignupProps> = ({}) => {
    const editing= true
    const [error, setError] = React.useState({name: "", message:""})

    const queryClient = useQueryClient();

   
    const form_input: FormOptions[] = [
        { field_name: "email", field_type: "text", default_value: "",required:true,editing },
        { field_name: "password", field_type: "password", default_value: "", required: true,editing },
        { field_name: "passwordConfirm", field_type: "password", default_value: "", required: true,editing },
  ]  
    const addUserMutation = useMutation(async(vars: { coll_name: string, payload: FormData }) => {
       try{
        await client.collection('emps').create(vars.payload);
        return await client.collection('emps').authWithPassword(
            vars.payload.get('email') as string,
            vars.payload.get('password') as string
        )
         
        }catch(e){
        console.log("error signing up ",e)
           throw e

        }
     
    },
    {
        onSettled: () => {
            queryClient.invalidateQueries(["user"]);
            // navigate('/profile')
            // navigate('/profile')
        },
        onError:(err:any)=>{
            // console.log("mutation error ==== ", concatErrors(err))
            setError({ name: "main", message:err.message })
        
        }
    }
    )
    const handleSubmit = async (data: FormData) => {
     await addUserMutation.mutate({ coll_name: 'user', payload: data })
    };

    // console.log("errors state === ",error)
return (
<div className="w-full h-full flex flex-col items-center justify-center">

  <TheForm
   form_title='Sign Up'
   fields={form_input}
   validate={validate}
   submitFn={handleSubmit}
    is_submitting={addUserMutation.isLoading}
    error={error}
    editing={editing}
  />
</div>
);
}

export interface SignupFormInput{
email:string
password:string
passwordConfirm:string
}
interface Validate {
    input: SignupFormInput;
    setError: (error: { name: string; message: string }) => void;
}




const validate = ({ input, setError }: Validate) => {
    // console.log("input === ",input)
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (input.email === "") {
        setError({ name: "email", message: "email field required" })
        return false
    }
    if (!expression.test(input.email)){
        setError({ name: "email", message: "invalid email pattern" })
        return false
    }
    if (input.password.length < 8) {
        setError({ name: "password", message: "password minimun length is 8" })
        return false
    }
    if (input.passwordConfirm.length < 8) {
        setError({ name: "passwordConfirm", message: "password minimun length is 8" })
        return false
    }
    if (input.passwordConfirm !== input.password) {
        setError({ name: "passwordConfirm", message: "ensure the passwords match" })
        return false
    }

    setError({ name: "", message: "" })
    return true
}





