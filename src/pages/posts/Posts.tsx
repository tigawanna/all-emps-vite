import React from 'react'

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../pb/useCollection';
import { Record } from 'pocketbase';
import { ListResult } from 'pocketbase';
import { usePaginatedCollection } from './../../pb/useCollection';
import { useInView } from 'react-intersection-observer'

interface PostsProps {

}
interface RecordItem extends Record {
  body: string
  media?: string
  emp: string
}

export const Posts: React.FC<PostsProps> = ({}) => {
  const { ref, inView } = useInView()
  const { 
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status, } = usePaginatedCollection({
    key:['posts'],
    rqOptions:{
        enabled:true,

        select: (data) => {
        return data
        },
        
        getNextPageParam: (lastPage, allPages) =>{
        if(lastPage.totalPages > lastPage.page){
            return lastPage.page + 1
          }
          return 
        }
     }
  }
  )

  React.useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

return (
 <div className='w-full flex flex-col gap-1 items-center justify-center'>
<div className='w-[95%] flex flex-col items-center justify-center gap-2'>
      {data?.pages.map((page) => {
        return page.items.map((item) => {
          return <PostsCard item={item as RecordItem} key={item.id} />
        })
      })
      }
</div>



    <div>
       <button
        ref={ref}
          onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage? 'Loading more...'
          : hasNextPage ? 'Load More'
           : !isLoading? 'Nothing more to load':null}
      </button>
    </div>

 </div>
);
}




interface PostsCardProps {
  item: RecordItem
}

export const PostsCard: React.FC<PostsCardProps> = ({item}) => {
  // console.log("url === ", makeUrl(item))
return (
 <div className='w-[90%] md:w-[50%] p-2 flex flex-col  border-[2px] rounded-sm gap-1'>
    <div className='w-full  flex text-xl font-bold '>
      {item.body}
    </div>

   {item.media?<img src={makeUrl(item)}
      className='w-full h-fit bg-red-600'/>:null}
   
    <div className='w-full  flex'>
      {item.emp}
    </div>
 </div>
);
}


const makeUrl = (record: RecordItem ) => {

  if (record?.media) {
    return `https://emps.tigawanna.tech/api/files/posts/${record.id}/${record?.media}`
  }
  return 

}
