import React from 'react'
import TheForm from '../../shared/form/TheForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormOptions } from '../../shared/form/types';
import { client } from './../../pb/config';
import { concatErrors } from './utils';




interface EmailPasswordLoginProps {

}

export const EmailPasswordLogin: React.FC<EmailPasswordLoginProps> = ({}) => {
    const editing=true

    const [authing,setAuthing]=React.useState(true)
    const [error, setError] = React.useState({ name: "main", message: "" })
    const queryClient = useQueryClient();

    const form_input: FormOptions[] = [
        { field_name: "email", field_type: "text", default_value: "",editing },
        { field_name: "password", field_type: "password", default_value: "",editing },
   ] 
//    console.log("error in login ==== > ",error) 
    const addUserMutation = useMutation(async(vars: { coll_name: string, payload: FormData }) => {
       try{
            const result = await client.collection('emps').authWithPassword(
                vars.payload.get('email') as string,
                vars.payload.get('password') as string
            )
            queryClient.setQueryData(['user'], () => result.record);
            setAuthing(false)
        }
        catch(err:any){
            // console.log("error in login mutation catch block", err.message)
            // setError({ name: "main", message: err?.messge })
            throw err
       }


        // return client.collection('emps').authWithPassword(
        //     vars.payload.get('email') as string,
        //      vars.payload.get('password') as string)
        //          .then((res) => {
        //         queryClient.setQueryData(['user'], () => res.record);
        //         setAuthing(false)
        //         navigate('/')
        //     })
        //      .catch((err)=>{
        //     setAuthing(false)
        //     console.log("error in auth mutation ",err.message)
        //     setError({ name: "main", message: err.messge})
        
        // })
    },
    {
        onSettled: () => {
            queryClient.invalidateQueries(["user"]);
        },
        onError: (err:any) => {
            // console.log("errror logging in ",err.data)
            setError({ name: "main", message: concatErrors(err) })
        }
    }
    )


    const handleSubmit = async (data: FormData) => {
        await addUserMutation.mutate({ coll_name: 'user', payload: data })

    };

// console.log("add mutation ----==> ", addUserMutation)
return (
<div className="w-full h-full flex flex-col items-center justify-center">
    

  <TheForm
   form_title='Login'
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

    setError({ name: "", message: "" })
    return true
}





// const form_input: FormOptions[] = [

//     { field_name: "email", field_type: "text", default_value: "" },
//     { field_name: "password", field_type: "password", default_value: "" },

//     { field_name: "bio", field_type: "textarea", default_value: "" },
//     { field_name: "pic", field_type: "file", default_value: "" },
//     { field_name: "color", field_type: "color", default_value: "#ffffff" },
//     {
//         field_name: "gender", field_type: "select", default_value: "",
//         options: [
//             { name: "male", value: "male" },
//             { name: "femal", value: "female" },
//             { name: "NB", value: "nb" },
//         ]
//     },

// ]

// const queryFn = ({ key, keyword }: QueryFnProps) => {
//     const getCountries = async () => {
//         return fetch('https://restcountries.com/v3.1/all').then((response) => response.json())
//     }
//     return useQuery(key,
//         getCountries,
//         {
//             select: (data: Country[]) => {
//                 if (keyword !== "" && keyword.length > 1) {
//                     return data.filter((item) => item.name.common.toLowerCase().includes(keyword.toLowerCase()))
//                 }
//                 console.log("data", data)
//                 return data
//             },
//             enabled: keyword.length > 1

//         })

// }
