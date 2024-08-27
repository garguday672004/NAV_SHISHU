import React from "react";
import RenderSteps from "../addMotherDetails/RenderSteps";

const AddMotherDetails = () => {
  return (
    <>
      <div className="flex w-full items-start gap-x-6">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-indigo-600">
            Fill Mother Details ....
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Course Upload Tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-5">
            ⚡ Instructions to fill the form
          </p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>
              Height: Measure accurately in feet and inches or centimeters by
              standing straight against a wall or using a measuring tape.
            </li>
            <li>
              Weight: Step onto a properly calibrated scale on a flat surface
              and provide your weight in kilograms or pounds.
            </li>
            <li>
              Blood Group: If unsure, get tested at a medical facility or
              consult your healthcare provider to determine your blood type (A,
              B, AB, O) and Rh factor.
            </li>
            <li>
              City and State: Enter your current city and state to match with
              intended parents seeking a surrogate in a specific location.
            </li>
            <li>
              Motivation: Explain your reasons for becoming a surrogate, such as
              helping others build a family, positive pregnancy experiences, or
              personal connections to infertility.
            </li>
            <li>ID: Upload any govt. ID proof to verify your identity.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddMotherDetails;
