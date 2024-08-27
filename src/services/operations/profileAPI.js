import { apiConnector } from "../apiconnector";
import { parentEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";

const { GET_ALL_SURROGATES_API } = parentEndpoints;

const { UPDATE_PROFILE_PIC_API, UPDATE_PROFILE_API , GET_USER_DETAILS_API } = profileEndpoints;

export async function getAllSurrogates(token) {
  let result = [];
  const toastId = toast.loading("Loading....");
  try {
    const response = await apiConnector("GET", GET_ALL_SURROGATES_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      toast.error("Error in getting all surrogates");
      return null;
    }

    result = response.data.data;
  } catch (error) {
    console.log("ERROR IN GET ALL SURROGATES ....", error);
  }
  toast.dismiss(toastId);
  return result;
}

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        UPDATE_PROFILE_PIC_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/8.x/pixel-art/svg?seed=${response.data.firstName} ${response.data.lastName}`;
      dispatch(
        setUser({ ...response.data.data, image: userImage })
      );
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
}

export async function getUserDetails(id,token){
  let response;
  try{
    response = await apiConnector("GET",GET_USER_DETAILS_API,{id:id},{
        Authorization: `Bearer ${token}`,
      });
      console.log("RESPONSE IN GET USER DETAILS API = ",response)
    }
    catch(error){
      console.log("ERROR IN FETCHING USER DETAILS",error)
    }
    return response;
}