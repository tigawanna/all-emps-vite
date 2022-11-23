import React from 'react'

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../pb/useCollection';
import { Record } from 'pocketbase';
import { ListResult } from 'pocketbase';
import { usePaginatedCollection } from './../../pb/useCollection';
import { useInView } from 'react-intersection-observer'
import { PostsCard } from '../../components/posts/PostCard';
import { PostType } from './../../components/posts/types';

interface PostsProps {

}
export interface RecordItem extends Record {
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
    status, } = usePaginatedCollection<PostType>(
    ['posts'],
    "",
    "emp",
    {
   
     getNextPageParam: (lastPage, allPages) =>{
        if(lastPage.totalPages > lastPage.page){
            return lastPage.page + 1
        }
          return 
        }
     }
  
  )
console.log("data ====>> ",data)
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
          return <PostsCard item={item} key={item.id} />
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





