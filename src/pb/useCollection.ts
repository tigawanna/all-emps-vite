import { UseMutationOptions, useQuery, UseQueryOptions,
  useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query"
import {ListResult, Record} from "pocketbase";
import { client } from "./config";



interface T {
  key: string[];
  filter?: string;
  expand?: string;
  rqOptions?: UseQueryOptions<Record[],unknown,any,string[]>;
}
// pass in the collaction argument at index 0

export const useCollection =({key,filter="",expand="",rqOptions={}}:T)=>{
  // console.log("filter ===",filter)
    const fetcherFunction = async () => {
      return await client.collection(key[0]).getFullList(
        5,
        {
          filter: `${filter}`,
          expand:expand,
        }
      );
    };
  return useQuery< Record[],unknown,Record[],string[]>
  (key, fetcherFunction,rqOptions);
}


interface VarsT{
    coll_name: string;
    payload: {};

}
interface UseMutateProps {
  vars: VarsT;
  rqOptions?: UseMutationOptions<
    Record,
    unknown,
    VarsT,
    string[]
  >;
}

// export const useMutateCollection = ({vars,rqOptions}:UseMutateProps) => {
//   return useMutation<Record,unknown,VarsT,string[]>((variables) => {
//     return client.records.create(
//       vars.coll_name,
//       vars.payload
//     );
//   },rqOptions
  
//   );
// };




interface pageT {
  key: string[];
  filter?: string;
  expand?: string;
  rqOptions?:
    | Omit<
        UseInfiniteQueryOptions<
          ListResult<Record>,
          unknown,
          ListResult<Record>,
          ListResult<Record>,
          string[]
        >,
        "queryKey" | "queryFn"
      >
    | undefined;
}
// pass in the collaction argument at index 0

export const usePaginatedCollection = ({key,filter = "",expand = "",rqOptions = {}}: pageT) => {
  // console.log("filter ===",filter)
  const fetcherFunction = async (deps:any) => {
    // console.log("-- page  ---> ",deps.pageParam)
    return await client
      .collection(key[0])
      .getList(
        deps.pageParam,
        2, {
        filter: `${filter}`,
        expand: expand, 
      });
  };
  return useInfiniteQuery<
    ListResult<Record>,
    unknown,
    ListResult<Record>,
    string[]
  >(key, fetcherFunction, rqOptions);
};

  export const fetchPosts = async () => {
    return await client
      .collection('posts')
      .getList(
        1,
        5, {
        // filter: `${filter}`,
        // expand: expand,
      });
  };
