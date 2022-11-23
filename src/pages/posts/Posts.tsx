import React from 'react'

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../pb/useCollection';
import { Record } from 'pocketbase';
import { ListResult } from 'pocketbase';
import { usePaginatedCollection } from './../../pb/useCollection';

interface PostsProps {

}

export const Posts: React.FC<PostsProps> = ({}) => {
  const pagquery = usePaginatedCollection({
    key:['posts'],
    rqOptions:{
        enabled:true,
        select: (data) => {
        return data
      } 
       }
  }
  )


  const query = useInfiniteQuery<ListResult<Record>, unknown, ListResult<Record>, string[]> 
  (['posts'],fetchPosts,
  
  )
  console.log("query =====>  ",query.data)

return (
 <div>
   all posts
 </div>
);
}
