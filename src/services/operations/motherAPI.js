import { motherEndpoints } from '../apis'
import { apiConnector } from '../apiconnector'
import { toast } from 'react-hot-toast'

const {
    SHOW_REQUESTED_PARENTS_API,
} = motherEndpoints

export async function showRequestedParents(token){
    let result = [];
    const toastId = toast.loading("Loading....")
    try{

        const response = await apiConnector(
            "GET",
            SHOW_REQUESTED_PARENTS_API,
            null,
            {
                Authorization : `Bearer ${token}`
            }
        )

        if(!response.data.success){
            toast.error("Error in getting all requested parents")
            return null;
        }

        result = response.data.data;

    }   
    catch(error){
        console.log("ERROR IN SHOW REQUESTED PARENTS ....", error);
    }
    toast.dismiss(toastId);
    return result;
}