import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Upload from "./Upload";

const SurrogateProfileForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("form data : ", data);
  };

  const clickHandler = () => {
    // save all the form data in a variable
    const data = getValues();
    // console log the data
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="height">
          Height<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name="height"
          id="height"
          placeholder="Enter Height"
          {...register("height", { required: true })}
          className="form-style w-full"
        />
        {errors.height && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Height is required
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="weight">
          Weight<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name="weight"
          id="weight"
          placeholder="Enter Weight"
          {...register("weight", { required: true })}
          className="form-style w-full"
        />
        {errors.weight && (
          <span className="text-red-500">Weight is required</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="bloodGroup">
          Blood Group<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name="bloodGroup"
          id="bloodGroup"
          placeholder="Enter Blood Group"
          {...register("bloodGroup", { required: true })}
          className="form-style w-full"
        />
        {errors.bloodGroup && (
          <span className="text-red-500">Blood Group is required</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="city">
          City<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Enter city"
          {...register("city", { required: true })}
          className="form-style w-full"
        />
        {errors.city && <span className="text-red-500">city is required</span>}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="state">
          State<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name="state"
          id="state"
          placeholder="Enter State"
          {...register("state", { required: true })}
          className="form-style w-full"
        />
        {errors.state && (
          <span className="text-red-500">State is required</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="motivation">
          Motivation<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          name="motivation"
          id="motivation"
          placeholder="Enter Motivation for becoming Surrogate Mother"
          {...register("motivation", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.motivation && (
          <span className="text-red-500">Motivation is required</span>
        )}
      </div>

      {/* create a component for uploading and showing preview of media */}
      <Upload
        name="ID"
        id="ID"
        register={register}
        errors={errors}
        setValue={setValue}
        // editData={editCourse ? course?.thumbnail : null}
      />

      <div className="flex items-center justify-between">
        <input
          type="checkbox"
          name="agreement"
          id="agreement"
          {...register("agreement", { required: true })}
        />
        <label htmlFor="agreement" className="text-sm text-richblack-5">
          The above details are best provided by u and are truth by 100%. Any
          False info may lead to deletion of ur profile.
        </label>
      </div>

      <br />

      {/* TODO : Modify this code of button */}
      <button
        onClick={clickHandler}
        type="submit"
        className="bg-yellow-50 p-3 rounded-md"
      >
        <span>Save & Next</span>
      </button>
    </form>
  );
};

export default SurrogateProfileForm;
