import React from 'react'
import { CustomPostType, RecordItem } from './../../pages/posts/Posts';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { VscComment } from 'react-icons/vsc'
import { TheIcon } from '../../shared/TheIcon';
import { PostType } from './types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from './../../pb/config';
import { Record, Admin } from 'pocketbase';
import { QueryClient } from '@tanstack/react-query';


interface PostCardProps {
    item: CustomPostType 
    user: Record | Admin | null | undefined
}


export const PostsCard: React.FC<PostCardProps> = ({ item,user }) => {
    // console.log("url === ", makeUrl(item))

return (
        <div className='w-[90%] md:w-[50%]  p-2 flex flex-col  border-black border-2 
        dark:border-[1px]  dark:border-white
        rounded-lg gap-3'>
            <div className='w-full flex flex-col gap-[1px]'>
                <div className='flex text-sm font-bold'>
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
            {item.creator_image ? <img src={makeUrl(item)}
                className=' w-fit max-h-80 rounded-lg' /> : null}
           </div>
            <div className='w-full  flex font-serif text-sm font-normal'>
               emp id:  {item.creator_id}
            </div>
            <div className='w-full  flex font-serif text-sm font-normal'>
                post id :  {item.post_id}
            </div>
            <div className='w-full  flex'>
             <PostReactionsCard user={user} item={item}/>
            </div>
        </div>
    );
}









const makeUrl = (record: RecordItem|CustomPostType) => {

    if (record?.creator_image) {
        return `https://emps.tigawanna.tech/api/files/posts/${record.post_id}/${record?.post_media}`
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
const queryClient = useQueryClient()
const [liked, setLiked] = React.useState(item.mylike === "yes")
const updateReactionMutation = useMutation(async (vars:ReactionRequest) => {
        // console.log("update vars =====> ", vars) 
        try {
             await client.collection('reactions').update(vars?.reaction as string,vars)}
        catch (err: any) {
            console.log("error in login mutation catch block", err.message)
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
           console.log("error updating ===> ",err)
            }
        }
    )
const newReactionMutation = useMutation(async (vars:ReactionRequest) => {
        // console.log("create vars =====> ",vars) 
        try { await client.collection('reactions').create(vars)}
        catch (err: any) {
            console.log("error in login mutation catch block", err.message)
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
        console.log("error updating ===> ", err)
    }
    }
    )





// console.log("total likes  ====== ",total_likes)

const reaction_vars:ReactionRequest ={
post:item.post_id,
emp:item.creator_id??user?.id,
liked: item?.mylike ==="yes"?"no":"yes",
reaction:item.reaction_id,
}

return (
 <div className='w-full p-1'>
<div className='w-full flex items-center justify-evenly'>
            <div className='w-full flex '>
                <TheIcon
                    Icon={liked ? AiFillHeart : AiOutlineHeart}
                    size='1.5rem'
                    color={liked ? "red" : ""}
                    iconAction={() => {
                        if (item?.mylike === 'yes') {
                            updateReactionMutation.mutate(reaction_vars)
                            setLiked(prev => !prev)
                        }
                        else {
                            newReactionMutation.mutate(reaction_vars)
                            setLiked(prev => !prev)
                        }
                    }}
                />
                {
                    item.likes??0

                }
            </div>

    <TheIcon Icon={VscComment} size='1.5rem' />
</div>
 </div>
);
}
