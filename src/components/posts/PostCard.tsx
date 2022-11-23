import React from 'react'
import { RecordItem } from './../../pages/posts/Posts';
import { AiOutlineLike, AiOutlineDislike,AiFillLike,AiFillDislike } from 'react-icons/ai'
import { VscComment } from 'react-icons/vsc'
import { TheIcon } from '../../shared/TheIcon';
import { PostType } from './types';

interface PostCardProps {

}




interface PostCardProps {
    item: PostType 
}

export const PostsCard: React.FC<PostCardProps> = ({ item }) => {
    // console.log("url === ", makeUrl(item))
    return (
        <div className='w-[90%] md:w-[50%] p-2 flex flex-col  border-[2px] rounded-sm gap-1'>
            <div className='w-full flex'>
                <div className='flex text-xl font-bold '>
                    {item.expand.emp?.name}
                </div> 
                <div className='flex text-lg '>
                    @{item.expand.emp?.username}
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
             <PostReactionsCard/>
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

}

export const PostReactionsCard: React.FC<PostReactionsCardProps> = ({}) => {
return (
 <div className='w-full p-1'>
<div className='w-full flex items-center justify-evenly'>
            <TheIcon Icon={AiOutlineLike} size='1.2rem'/>
            <TheIcon Icon={AiOutlineDislike} size='1.2rem' />
            <TheIcon Icon={VscComment} size='1.2rem' />
</div>
 </div>
);
}
