import { useSelector } from "react-redux";
import { getAllSurrogates } from "../services/operations/profileAPI";
import MotherCard from "../components/MotherCard";
import { useEffect, useState } from "react";
import Loader from "../components/addOns/Loader";
import { getUserDetails } from "../../src/services/operations/profileAPI";
import profileSlice from "../slices/profileSlice";

const ShowMothers = () => {

  const {token} = useSelector((state) => state.auth);
  const [response, setResponse] = useState([]);
  const [btnText, setBtnText] = useState("Request");
  const user = useSelector((state) => state.profile);
  const [requestedMothers, setRequestedMothers] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const response = await getUserDetails(user.user._id,token);
      setRequestedMothers(response.data.data.requests);
    } catch (err) {
      console.error("ERROR IN FETCHING USER DETAILS ....", err);
    }
  };

  useEffect(() => {
    console.log("Updated requestedMothers: ", requestedMothers);
  }, [requestedMothers]);

  const showAllSurrogateMothers = async () => {
    try{
      const response = await getAllSurrogates(token);
      console.log("RESPONSE ....", response)
      setResponse(response);
    }
    catch(err){
      console.log("ERROR IN SHOW ALL SURROGATE MOTHERS ....", err);
    }
  }

  useEffect(() => {
    fetchUserDetails();
    showAllSurrogateMothers();
  },[]);

  return (
    <div className="">
      <h1 className="mb-14 text-3xl font-medium text-indigo-600">Surrogate Mothers</h1>

      <div className="">
      {
        !response ? (
          <Loader/>
        ) : (
            response.length > 0 ? (
              response.map((mother) => {
                const isRequested = requestedMothers.includes(mother._id);
                return <MotherCard key={mother._id} motherDetails={mother} btnText={btnText} setBtnText = {setBtnText} isRequested={isRequested}/>
              })
            ) : (
              <h1>No Surrogate Mothers Found</h1>
            )
        )
      }
      </div>

    </div>
  );
};

export default ShowMothers;
