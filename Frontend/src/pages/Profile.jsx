import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { getInitials } from "../utils";
import Textbox from "../components/Textbox";
import { Button } from "../components/ui/button";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      title: user?.title || "",
      email: user?.email || "",
    },
  });

  const [updateUser, { isLoading: isUpdatingProfile }] = useUpdateUserMutation();

  useEffect(() => {
    reset({
      name: user?.name || "",
      title: user?.title || "",
      email: user?.email || "",
    });
  }, [user, reset]);

  const onSubmit = async (formData) => {
    try {
      const payload = {
        _id: user?._id,
        role: user?.role,
        ...formData,
      };

      const result = await updateUser(payload).unwrap();
      const updatedUser = result?.user || result?.data?.user;

      if (updatedUser) {
        dispatch(setCredentials({ ...updatedUser }));
      }

      toast.success(result?.message || "Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="mt-16 max-w-3xl">
      <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-blue-700 text-white flex items-center justify-center text-lg font-semibold">
            {getInitials(user?.name || "U")}
          </div>

          <div>
            <p className="text-lg font-medium text-gray-900">{user?.name || "User"}</p>
            <p className="text-sm text-gray-500">{user?.title || "No title"}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 sm:grid-cols-2">
          <Textbox
            placeholder="Full name"
            type="text"
            name="name"
            label="Full Name"
            className="w-full rounded"
            register={register("name", { required: "Full name is required" })}
            error={errors.name ? errors.name.message : ""}
          />

          <Textbox
            placeholder="Job title"
            type="text"
            name="title"
            label="Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          <div className="sm:col-span-2">
            <Textbox
              placeholder="Email address"
              type="email"
              name="email"
              label="Email"
              className="w-full rounded"
              register={register("email", { required: "Email is required" })}
              error={errors.email ? errors.email.message : ""}
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-2">
            <p className="text-sm text-gray-500">
              Role: <span className="font-medium text-gray-700">{user?.role || "Not available"}</span>
            </p>

            <Button
              type="submit"
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700"
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
