import React from 'react'
import { Profile } from '../../pages/emp/Profile';
import { Admin } from 'pocketbase';
import { Record } from 'pocketbase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from './../../pb/config';
import { FormOptions } from '../../shared/form/types';
import TheForm from './../../shared/form/TheForm';
import { FaPassport } from 'react-icons/fa';
import { TheSocialMediaForm } from '../../shared/form/TheSocialMediaForm';

interface TestProps {
    user: Record | Admin | null | undefined
}

export const Test: React.FC<TestProps> = ({user}) => {
    const editing = true
    const [authing, setAuthing] = React.useState(true)
    const [error, setError] = React.useState({ name: "", message: "" })
    const queryClient = useQueryClient();

    const form_input: FormOptions[] = [
        { field_name: "email", field_type: "text", default_value: "patient1@email.com", editing },
        { field_name: "password", field_type: "password", default_value: "1234_pass_1234", editing },
    ] 
    const addUserMutation = useMutation(async (vars: { coll_name: string, payload: FormData }) => {
        try {
            const result = await client.collection('patient').authWithPassword(
                "pat2",
                "1234_pass_1234"
            )
          console.log("successfull auth === ",result)
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
 <div className='h-full w-full'>
 <TheSocialMediaForm
    post='v6ynbnc6dz1o2lb'
    user={user}
    
 />
 </div>
);
}



{/* <TheForm
    form_title='Login'
    fields={form_input}
    validate={validate}
    submitFn={handleSubmit}
    is_submitting={addUserMutation.isLoading && !authing}
    error={error}
    editing={editing}
/> */}
export interface SignupFormInput {
    email: string
    password: string
    passwordConfirm: string
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
    if (!expression.test(input.email)) {
        setError({ name: "email", message: "invalid email pattern" })
        return false
    }
    if (input.password.length < 8) {
        setError({ name: "password", message: "password minimun length is 8" })
        return false
    }

    setError({ name: "", message: "" })
    return true
}
