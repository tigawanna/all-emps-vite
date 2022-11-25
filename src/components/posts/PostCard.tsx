import React from 'react'
import { RecordItem } from './../../pages/posts/Posts';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { VscComment } from 'react-icons/vsc'
import { TheIcon } from '../../shared/TheIcon';
import { PostType } from './types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from './../../pb/config';
import { Record, Admin } from 'pocketbase';


interface PostCardProps {
    item: PostType 
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
                    {item.expand?.emp?.name}
                </div> 
                <div className='flex text-sm font-bold text-blue-900 dark:text-blue-300'>
                    @{item.expand?.emp?.username}
                </div> 
               
            </div>      
            <div className='w-full  flex  text-sm '>
                {item.body}
            </div>
        <div className='w-full  flex items-center justify-center '>
            {item.media ? <img src={makeUrl(item)}
                className=' w-fit max-h-80 rounded-lg' /> : null}
           </div>
            <div className='w-full  flex font-serif text-sm font-normal'>
               emp id:  {item.emp}
            </div>
            <div className='w-full  flex font-serif text-sm font-normal'>
                post id :  {item.id}
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
like:"yes"|"no";
comment:string
}

export const PostReactionsCard: React.FC<PostReactionsCardProps> = ({user,item}) => {
// console.log("post ids === ",user?.id,item.id)
const fetchReactionsCount = async () => {
    try {
        return await client.collection('reactions').getList(1,1,{
            filter: ` post="${item?.id}" && like="yes"`
        }
        )
    }
        catch (err) {
            console.log("error fetching one  ==> ", err)
            return {} as any
        }
    }       
const fetchOneReaction = async () => {
    try{
        return await client.collection('reactions').getFirstListItem(
        `emp="${user?.id}" && post="${item?.id}" `)
    }
     catch(err){
     console.log("error fetching one  ==> ",err)
     return {} as any
    }
}
const query_key = ['emp-reaction', user?.id, item?.id] 
const count_query_key = ['like-reaction-count',item?.id,user?.id]

const query = useQuery(query_key, fetchOneReaction,{})
const likes_count_query = useQuery(count_query_key, fetchReactionsCount, {})
const queryClient = useQueryClient();

const [liked, setLiked] = React.useState(query?.data?.like === "yes")
React.useEffect(()=>{
    setLiked(query?.data?.like === "yes")
},[query.data])


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
                queryClient.invalidateQueries(query_key);
                queryClient.invalidateQueries(count_query_key);
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
        queryClient.invalidateQueries(query_key);
            queryClient.invalidateQueries(count_query_key);
    },
    onError: (err: any) => {
        console.log("error updating ===> ", err)
    }
    }
    )

    if (query.isLoading || likes_count_query.isLoading){
    return (
        <div className='w-full flex items-center justify-evenly'>
           ...
        </div>
    )
   }

    const total_likes = likes_count_query?.data?.totalItems


const reaction = query.data as ReactionResponse
console.log("total likes  ====== ",total_likes)

const reaction_vars:ReactionRequest ={
post:reaction.post??item?.id,
emp:reaction.emp??user?.id,
like: reaction?.like ==="yes"?"no":"yes",
comment:"",

reaction: reaction.id,
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
                        if (reaction?.like) {
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
                    total_likes??0

                }
            </div>

    <TheIcon Icon={VscComment} size='1.5rem' />
</div>
 </div>
);
}
