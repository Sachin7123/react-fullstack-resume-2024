import { useQuery } from "react-query"
import { toast } from "react-toastify"
import { getUserDetail } from "../api";

const useUser = () => {
    const {data, isLoading, isError, refetch} = useQuery(
        "user",
        async() => {
            try{
                const userDetail = await getUserDetail();
                return userDetail
            }catch(err){
                if(!err.message.includes("not authenticated")){
                    toast.err("Somthing went wrong")
                }
            }
        },
        {refetchOnWindowFocus : false }
    );

    return { data, isLoading, isError, refetch}
};

export default useUser;