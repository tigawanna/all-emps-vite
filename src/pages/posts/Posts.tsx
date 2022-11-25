import React from 'react'


import { Record, Admin } from 'pocketbase';
import { usePaginatedCollection } from './../../pb/useCollection';
import { useInView } from 'react-intersection-observer'
import { PostsCard } from '../../components/posts/PostCard';
import { PostType } from './../../components/posts/types';
import { QueryStateWrapper } from '../../shared/QueryStateWrapper';

interface PostsProps {
  user: Record | Admin | null | undefined
}
export interface RecordItem extends Record {
  body: string
  media?: string
  emp: string
}

export const Posts: React.FC<PostsProps> = ({user}) => {
  const { ref, inView } = useInView()

  const postsQuery = usePaginatedCollection<PostType>(
    ['posts'],
     {
      perpage:5,
      expand:'emp',
     },
    {
   
     getNextPageParam: (lastPage, allPages) =>{
        if(lastPage.totalPages > lastPage.page){
            return lastPage.page + 1
        }
          return 
        }
     }
  
  )
const data =postsQuery.data
// console.log("data ====>> ",data)
  React.useEffect(() => {
    if (inView) {
      postsQuery.fetchNextPage()
    }
  }, [inView])

return (
  <QueryStateWrapper
  error={postsQuery.error}
  isError={postsQuery.isError}
  isLoading={postsQuery.isLoading}
  data={data?.pages}
  >
 <div className='w-full min-h-full flex flex-col gap-2 items-center justify-center'>
<div className='w-[95%] h-full flex flex-col items-center justify-center gap-2'>
      {data?.pages.map((page) => {
        return page.items.map((item) => {
          return <PostsCard item={item} key={item.id} user={user}/>
        })
      })
      }
</div>



    <div>
       <button
        ref={ref}
        onClick={() => postsQuery.fetchNextPage()}
        disabled={!postsQuery.hasNextPage || postsQuery.isFetchingNextPage}
      >
        {postsQuery.isFetchingNextPage? 'Loading more...'
          : postsQuery.hasNextPage ? 'Load More'
            : !postsQuery.isLoading? 'Nothing more to load':null}
      </button>
    </div>

 </div>
  </QueryStateWrapper>
);
}





