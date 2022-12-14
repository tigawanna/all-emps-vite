import React from 'react'
import { CustomPostType, RecordItem } from './../../pages/posts/Posts';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { VscComment } from 'react-icons/vsc'
import { FcComments } from 'react-icons/fc'
import { TheIcon } from '../../shared/TheIcon';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from './../../pb/config';
import { Record, Admin } from 'pocketbase';
import { pb_url } from './../../utils/env';
import { concatErrors } from './../auth/utils';



interface PostCardProps {
    item: CustomPostType 
    user: Record | Admin | null | undefined
}


export const PostsCard: React.FC<PostCardProps> = ({ item,user }) => {
    console.log("url === ", makeUrl('posts', item.post_id, item.post_media))

return (
        <div className='w-[90%] md:w-[50%]  p-2 flex flex-col  border-black border-2 
          dark:border-[1px]  dark:border-white rounded-lg gap-3'>
            <div className='w-full flex justify-start itemscenter gap-[1px]'>
            <div className='flex items-center justify-center '>
                {item.creator_image ? <img src={makeUrl('emps',item.creator_id,item.creator_image)}
                    className=' w-fit max-h-10 rounded-full aspect-square' /> : null}
            </div>
                <div className='flex items-center text-blue-700 justifycenter text-md font-bold px-2'>
                {item.creator_name}
                </div> 
                {/* <div className='flex text-sm font-bold text-blue-900 dark:text-blue-300'>
                    @{item.expand?.emp?.username}
                </div>  */}
               
            </div>      
            <div className='w-full  flex  text-sm '>
                {item.post_body}
            </div>
        <div className='w-full  flex items-center justify-center '>
            {item.post_media ? <img src={makeUrl('posts',item.post_id,item.post_media)}
                className=' w-fit max-h-80 rounded-lg' /> : null}
           </div>
            {/* <div className='w-full  flex font-serif text-sm font-normal'>
               emp id:  {item.creator_id}
            </div>
            <div className='w-full  flex font-serif text-sm font-normal'>
                post id :  {item.post_id}
            </div> */}
            <div className='w-full  flex'>
             <PostReactionsCard user={user} item={item}/>
            </div>
        </div>
    );
}



const makeUrl = (coll_name:string,coll_id:string,media:string) => {
   if (media) {
        return `${pb_url}/api/files/${coll_name}/${coll_id}/${media}`
    }
    return
}
interface PostReactionsCardProps {
user: Record | Admin | null | undefined
item: CustomPostType
}
interface ReactionResponse {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    post: string
    emp: string
    like: "yes" | "no";
    comment: string
}
interface ReactionRequest {
reaction?:string    
post:string,
emp:string;
liked:"yes"|"no";
}

export const PostReactionsCard: React.FC<PostReactionsCardProps> = ({user,item}) => {
// console.log("post ids === ",user?.id,item.id)
console.log("user ====",user?.id)
console.log("item ===== ",item)
const queryClient = useQueryClient()
const [liked, setLiked] = React.useState(item.reacted === "yes")

    const updateReactionMutation = useMutation(async (vars: CustomPostType) => {
    
      const updatevars={
        liked: item.reacted === "yes"?"no":"yes"
        }
        console.log("update mutation vars=== ",updatevars,vars.my_reaction_id)
      try {
        const response  = await client.collection('reactions')
        .update(vars?.my_reaction_id as string,updatevars)
         console.log("update reaction response === ",response)
       }
       catch (err: any) {
          console.log("error updating ===> ", concatErrors(err))
            // setError({ name: "main", message: err?.messge })
            throw err
          } 
          },
        {
            onSettled: () => {
                queryClient.invalidateQueries(['posts-list']);
                // queryClient.invalidateQueries(count_query_key);
            },
            onError: (err: any) => {
                console.log("error updating ===> ",concatErrors(err))
            }
        }
    )
    const newReactionMutation = useMutation(async (vars: CustomPostType) => {
   
        const newReaction={
            post:vars.post_id,
            emp:user?.id,
            liked: "yes"
        } 
        console.log("create vars =====> ", newReaction)
        try { 
      const response =  await client.collection('reactions').create(newReaction)
            console.log("new reaction response === ", response)
         }
        catch (err: any) {
            console.log("error liking post",concatErrors(err))
            // setError({ name: "main", message: err?.messge })
            throw err
        }
    },
    {
    onSettled: () => {
            queryClient.invalidateQueries(['posts-list']);
        //     queryClient.invalidateQueries(count_query_key);
    },
    onError: (err: any) => {

        console.log("error liking post",concatErrors(err))
        updateReactionMutation.mutate(item)
    
    }
    }
    )

// console.log("total likes  ====== ",total_likes)

return (
 <div className='w-full p-1'>
<div className='w-full flex items-center justify-evenly'>
            <div className='w-full flex '>
                <TheIcon
                    Icon={liked ? AiFillHeart : AiOutlineHeart}
                    size='1.5rem'
                    color={liked ? "red" : ""}
                    iconAction={() => {
                        if (item.reacted !=="virgin" && item.my_reaction_id &&item.my_reaction_id !=="") {
                            updateReactionMutation.mutate(item)
                            setLiked(prev => !prev)
                        }
                        else {
                            newReactionMutation.mutate(item)
                            setLiked(prev => !prev)
                        }
                    }}
                />
                { item.like_count??0}
            </div>
            <div className='flex '>
                <TheIcon Icon={item.my_reply_id !== "virgin" ? FcComments :VscComment} 
                size='1.5rem' 
                color={item.my_reply_id !== "virgin"?"purple":""} />
                {item.reply_count??0}
            </div>

</div>
 </div>
);
}
