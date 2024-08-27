import React, { useState } from "react";
import {requestMother} from '../services/operations/parentAPI';
import { useSelector } from "react-redux";

const MotherCard = ({ motherDetails,setBtnText, btnText, isRequested}) => {

  // const user = useSelector((state) => state.profile)
  const {firstName, lastName, image, additionalDetails, surrogateDetails} = motherDetails;
  const {token} = useSelector((state) => state.auth);
  // const [isRequested, setIsRequested] = useState(false);

  let dateOfBirth;
  let profilePic;
  if(additionalDetails){
    dateOfBirth = additionalDetails.dateOfBirth;
    profilePic = additionalDetails.profilePic;
  }

  let height, weight, city='NA', state='NA', bloodGroup, motivation='Nav-Shishu Motivation';
  if(surrogateDetails){
    height = surrogateDetails.height;
    weight = surrogateDetails.weight;
    city = surrogateDetails.city;
    state = surrogateDetails.state;
    bloodGroup = surrogateDetails.bloodGroup;
    motivation = surrogateDetails.motivation;
  }

  // to be changed...
  const btnHandler = async () => {
    try {
      // Assuming requestMother returns a promise
      if(!isRequested){
        const response = await requestMother({requested: true, motherId: motherDetails._id}, token);
        window.location.reload(); //not a good practice
      }
      else{
        console.log('Request already sent, please do not send again');
      }
    } catch (error) {
      // Handle error - Update UI or notify user
      console.error('Request sent failed', error);
    }
  }

  return (
    <div className="flex flex-row justify-center items-centerborder bg-richblack-100 min-h-[250px] w-[500px] mb-5 border-gray-300 rounded-lg p-4 m-4 shadow-md hover:shadow-lg transition-shadow duration-500">
      <div className="flex flex-col min-h-[200px] mr-5 justify-evenly">
        <img src={profilePic ? profilePic : image} className="h-[100px] w-[100px] rounded-lg"/>
        <button
          className="bg-indigo-600 hover:bg-green-600 text-white py-2 px-4 rounded-md"
          onClick={btnHandler}
        >
          {/* <span>{btnText}</span> */}
          <span>{isRequested ? ('Requested') : (btnText)}</span>
        </button>
      </div>

      <div className="flex flex-col justify-evenly">
        <p>
          Name : <span>{`${firstName} ${lastName}`}</span>
        </p>
        <p>
          DOB : <span>{dateOfBirth ? (dateOfBirth) : (`not defined`)}</span>
        </p>
        <p>
          Height : <span>{height ? (height) : (`not defined`)}</span>
        </p>
        <p>
          Weigth : <span>{weight ? (weight) : (`not defined`)}</span>
        </p>
        <p>
          Blood Group : <span>{bloodGroup ? (bloodGroup) : (`not defined`)}</span>
        </p>
        <p>
          Address : <span>{`${city}, ${state}`}</span>
        </p>
        <p>
          Motivation : <span>{motivation}</span>
        </p>
      </div>
    </div>
  );
};

export default MotherCard;
