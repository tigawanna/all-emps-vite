import React from 'react'


import { Record, Admin } from 'pocketbase';
import { usePaginatedCollection } from './../../pb/useCollection';
import { useInView } from 'react-intersection-observer'
import { PostsCard } from '../../components/posts/PostCard';
import { PostType } from './../../components/posts/types';
import { QueryStateWrapper } from '../../shared/QueryStateWrapper';
import { TheIcon } from '../../shared/TheIcon';
import {FaPlus} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { pb_url } from './../../utils/env';
import dayjs  from 'dayjs';
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
  interface Deps {
    pageParam: {
      created: string, id: string
    }
  }
  // console.log("user === ",user)
  const fetchPosts = async (deps: Partial<Deps>) => {
    // console.log("page params dependaces === ", deps, deps.pageParam?.id)
    const currentdate = dayjs(new Date()).format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]') 
    let headersList = {
      "Accept": "*/*",
    }
    const response = await fetch(
      `${pb_url}/post_reactions/?id=${deps.pageParam?.id??""}&user=${user?.id??""}&created=${deps.pageParam?.created??currentdate}`, {
      method: "GET",
      headers: headersList
    });
    return await response.json();
  }
  const customPostsQuery = useInfiniteQuery<CustomPostType[], unknown, CustomPostType[], string[]>(
    ['posts-list'],
  fetchPosts,
    {
      getNextPageParam: (lastPage, allPages) => {
        // console.log("last page ==== ",lastPage,allPages)
        if (lastPage && lastPage[lastPage.length - 1]) {
        return { 
          created: lastPage[lastPage?.length - 1]?.created_at, 
          id: lastPage[lastPage?.length - 1]?.post_id
}
        }
        return
      }
    })
  
  // console.log("fetched posts querys=== ",customPostsQuery.data)
  
  // const postsQuery = usePaginatedCollection<PostType>(
  //   ['posts'],
  //    {
  //     perpage:5,
  //     expand:'emp',
  //    },
  //   {
  //     getNextPageParam: (lastPage, allPages) =>{
  //       if(lastPage.totalPages > lastPage.page){
  //           return lastPage.page + 1
  //       }
  //         return 
  //     }
  //    }
  
  // )
  const data = customPostsQuery.data
// const data =postsQuery.data
// console.log("data ====>> ",data?.pages)
  React.useEffect(() => {
    if (inView) {
      customPostsQuery.fetchNextPage()
    }
  }, [inView])

return (
  <QueryStateWrapper
  error={customPostsQuery.error}
  isError={customPostsQuery.isError}
  isLoading={customPostsQuery.isLoading}
  data={data?.pages}
  >
 <div className='w-full min-h-full flex flex-col gap-2 items-center justify-center'>
<div className='w-[95%] h-full flex flex-col items-center justify-center gap-2'>
      {data?.pages.map((page) => {
        // console.log("page=== ",page)
        return page.map((item) => {
          return <PostsCard item={item} key={item.post_id} user={user}/>
        })
        return <div>hey</div>
      })
      }
</div>


<div className='w-fit h-fit p-2 bg-slate-500 text-white rounded-full fixed bottom-[10%] right-[5%]'>
  <Link to={'/post/new'}>
          <TheIcon Icon={FaPlus} size={'40'} />
  </Link>

</div>
    <div>
       <button
        ref={ref}
          onClick={() => customPostsQuery.fetchNextPage()}
        disabled={!customPostsQuery.hasNextPage || customPostsQuery.isFetchingNextPage}
      >
        {customPostsQuery.isFetchingNextPage? 'Loading more...'
            : customPostsQuery.hasNextPage ? 'Load More'
              : !customPostsQuery.isLoading? 'Nothing more to load':null}
      </button>
    </div>

 </div>
  </QueryStateWrapper>
);
}



export interface CustomPostType {
  creator_id: string
  creator_name: string
  creator_image: string
  post_id: string
  post_body: string
  post_media: string
  created_at: string
  likes: number
  mylike: string
  reaction_id:string
}

