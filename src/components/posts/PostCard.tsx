import React from 'react'
import { RecordItem } from './../../pages/posts/Posts';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { VscComment } from 'react-icons/vsc'
import { TheIcon } from '../../shared/TheIcon';
import { PostType } from './types';
import { isError, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts } from '../../pb/useCollection';
import { client } from './../../pb/config';
import { Record, Admin } from 'pocketbase';






interface PostCardProps {
    item: PostType 
    user: Record | Admin | null | undefined
}

export const PostsCard: React.FC<PostCardProps> = ({ item,user }) => {
    // console.log("url === ", makeUrl(item))




    return (
        <div className='w-[90%] md:w-[50%] p-2 flex flex-col  border-[2px] rounded-sm gap-1'>
            <div className='w-full flex'>
                <div className='flex text-xl font-bold '>
                    {item.expand?.emp?.name}
                </div> 
                <div className='flex text-lg '>
                    @{item.expand?.emp?.username}
                </div> 
               
            </div>      
            <div className='w-full  flex text-lg font-bold '>
                {item.body}
            </div>

            {item.media ? <img src={makeUrl(item)}
                className='w-full h-fit bg-red-600' /> : null}

            <div className='w-full  flex'>
                {item.emp}
            </div>
            <div className='w-full  flex'>
             <PostReactionsCard user={user} item={item}/>
            </div>
        </div>
    );
}

const makeUrl = (record: RecordItem|PostType) => {

    if (record?.media) {
        return `https://emps.tigawanna.tech/api/files/posts/${record.id}/${record?.media}`
    }
    return

}

interface PostReactionsCardProps {

user: Record | Admin | null | undefined
item: PostType
}

export const PostReactionsCard: React.FC<PostReactionsCardProps> = ({user,item}) => {
// console.log("post ids === ",user?.id,item.id)
    const fetchReaction = async () => {
        return await client.collection('reactions').getFirstListItem(
            `emp="${user?.id}" && post="${item?.id}" `)
            
            }

    const query = useQuery(['emp-reaction'], fetchReaction,{
        enabled:(user?.id && item?.id)?true:false
    })
    const queryClient = useQueryClient();

    const reactMutation = useMutation(async () => {
        try {
            // const result = await client.collection('emps').authWithPassword(
            //     vars.payload.get('email') as string,
            //     vars.payload.get('password') as string
            // )
            const result = client.collection('reactions').update(
                query?.data?.id as string,{
                    post: query?.data?.post as string,
                    emp: query?.data?.emp as string,
                    like: !query?.data?.like,
                    comment: ""
                })
            // queryClient.setQueryData(['user'], () => result.record);
          
        }
        catch (err: any) {
            console.log("error in login mutation catch block", err.message)
            // setError({ name: "main", message: err?.messge })
            throw err
        }


 
    },
        {
            onSettled: () => {
                queryClient.invalidateQueries(["user"]);
            },
            onError: (err: any) => {
           console.log("error updating ===> ",err)
            }
        }
    )

   if(query.isLoading){
    return (
        <div className='w-full flex items-center justify-evenly'>
            <TheIcon Icon={AiOutlineHeart}
                size='1.5rem' color={""} iconAction={()=>{
                    if(reaction){
                        reactMutation.mutate()
                    }
                }} />
            <TheIcon Icon={VscComment} size='1.5rem' />
        </div>
    )
   }

   
const reaction = query.data

return (
 <div className='w-full p-1'>
<div className='w-full flex items-center justify-evenly'>
<TheIcon Icon={reaction?.like ? AiFillHeart : AiOutlineHeart} 
    size='1.5rem' color={reaction?.like ? 'red':""}/>
<TheIcon Icon={VscComment} size='1.5rem' />
</div>
 </div>
);
}
