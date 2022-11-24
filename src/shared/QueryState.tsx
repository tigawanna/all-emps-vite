import React from 'react'

interface QueryStateProps {
isLoading:boolean;
isError:boolean;
error:any
data?:any[]
children: React.ReactNode
}

export const QueryStateWrapper: React.FC<QueryStateProps> = ({isLoading,isError,error,data,children}) => {
    if (isLoading) {
        return (
            <div className="w-full h-screen flex-center scroll-bar">
                <div className="w-[670%] h-[70%] flex-center ">loading....</div>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="w-full h-screen flex-center scroll-bar">
                <div className="w-[670%] h-[70%] flex-center ">
                   {error?.response?.message}
                </div>
            </div>
        );
    }
    if(data&&data?.length<1){
        <div className="w-full h-screen flex-center scroll-bar">
            <div className="w-[670%] h-[70%] flex-center ">
                Something went wrong , no records to show
            </div>
        </div>
    }
return (
<>{children}</>
);
}
