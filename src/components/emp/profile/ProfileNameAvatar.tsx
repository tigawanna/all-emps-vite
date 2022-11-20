import React from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { ProfileInput } from '../../../pages/emp/Profile';
import { TheIcon } from './../../../shared/TheIcon';


interface ProfileNameAvatarProps {
editing?:boolean    
input:ProfileInput
setInput: React.Dispatch<React.SetStateAction<ProfileInput>>
img_url?:string
}

interface FileState {
    file: File | null, file_url: string | null
}

export const ProfileNameAvatar: React.FC<ProfileNameAvatarProps> = ({input,setInput,editing}) => {
const fileInput = React.useRef<HTMLInputElement | null>(null);
const enableFileInput = () => {fileInput.current?.click()};

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (event.target.files) {
            const file = event.target.files[0]
            // console.log("file === ",file)
            setInput(prev => {
                return { ...prev, [event.target.id]: file }
            })
        }
        else {
            setInput(prev => {
                return { ...prev, [event.target.id]: value }
            })
        }
    }

return (
    <div className='w-full flex flex-col  items-center justify-center custom-border p-5 m-1 rounded-md'>
    <div className='w-fit '>
        <div
        onClick={() => enableFileInput()}
        className='w-32 h-32 rounded-lg  flex-center  custom-border hover:border-2 hover:scale-105'>
        {
        input.avatar===null ? <TheIcon Icon={AiOutlineCamera} color="" size='50px' /> :
        <img src={URL.createObjectURL(input.avatar)} className="h-full w-full rounded-full" />
        }
        </div>
        <input 
         type="file"
         id="avatar"
         ref={fileInput}
         style={{ display: 'none' }}
         onChange={handleChange}
         
        />
        </div>




        <div className='w-full flex flex-col text-lg   m-2 p-2 rounded-md'>
            <label htmlFor='name' className='font-bold'>
            Email
            </label>
           <div 
            className="w-[90%] p-2 m-1 h-10 text-base border-b rounded-sm   
            focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600"
           >{input.email}</div>
        </div>


        <div className='w-full flex flex-col text-lg   p-2 m-2 rounded-md'>
            <label htmlFor='name' className='font-bold'>
                Name
            </label>
            {editing ? <input
            id='name'
            className='input-styles'
            value={input.name}
            onChange={handleChange} /> :
            <div
            className="w-[90%] p-2 m-1 h-10 text-base border-b rounded-sm   
            focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600"
            >{input.name}</div>}
        </div>
 </div>
);
}
