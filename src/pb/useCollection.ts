import { UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import {Record} from "pocketbase";
import { client } from "./config";
import { ListResult } from "./pb-types";


interface T {
  key: string[];
  filter?: string;
  expand?: string;
  rqOptions?: UseQueryOptions<Record[],unknown,any,string[]>;
}
// pass in the collaction argument at index 0

export const useCollection =({key,filter="",expand="",rqOptions={}}:T)=>{
  console.log("filter ===",filter)
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




