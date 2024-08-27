import {parentEndpoints} from '../apis';
import {apiConnector} from '../apiconnector';
import {toast} from 'react-hot-toast';

const {
    REQUEST_MOTHER_API
} = parentEndpoints;

export async function requestMother({requested, motherId},token){
    const toastId = toast.loading("Loading....");
    try{
        const response = await apiConnector(
            "POST",
            REQUEST_MOTHER_API,
            {
                requested,
                motherId
            },
            {
                Authorization : `Bearer ${token}`
            }
        )

        console.log('REQUEST MOTHER API RESPONSE ....', response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success('Request Sent Successfully');
    }
    catch(error){
        console.log("REQUEST MOTHER API ERROR............", error);
        toast.error("Request Failed");
    }
    toast.dismiss(toastId);
}