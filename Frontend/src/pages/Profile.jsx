import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useGetTeamListQuery, useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { getInitials } from "../utils";
import Textbox from "../components/Textbox";
import { Button } from "../components/ui/button";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();

  // Admin can pass ?userId=xxx to edit another user's profile
  const targetUserId = searchParams.get("userId");
  const isAdmin = Boolean(
    loggedInUser?.isAdmin ||
    loggedInUser?.role === "Admin" ||
    loggedInUser?.role?.toLowerCase() === "admin"
  );
  const isEditingOther = isAdmin && targetUserId && targetUserId !== loggedInUser?._id;

  useEffect(() => {
    if (targetUserId && targetUserId !== loggedInUser?._id && !isAdmin) {
      toast.error("Access denied! Only Admin can edit other users' profiles.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, [targetUserId, loggedInUser?._id, isAdmin]);

  // Fetch team list so admin can find the target user's data
  const { data: teamData } = useGetTeamListQuery(undefined, {
    skip: !isEditingOther,
  });

  const targetUser = isEditingOther
    ? teamData?.users?.find((u) => u._id === targetUserId)
    : loggedInUser;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      title: "",
      role: "",
      email: "",
    },
  });

  const [updateUser, { isLoading: isUpdatingProfile }] = useUpdateUserMutation();

  // Reset form whenever the target user's data is loaded
  useEffect(() => {
    if (targetUser) {
      reset({
        name: targetUser?.name || "",
        title: targetUser?.title || "",
        role: targetUser?.role || "",
        email: targetUser?.email || "",
      });
    }
  }, [targetUser, reset]);

  const onSubmit = async (formData) => {
    try {
      const payload = {
        _id: targetUser?._id,
        ...formData,
      };

      const result = await updateUser(payload).unwrap();
      const updatedUser = result?.user || result?.data?.user;

      // Only update redux credentials when editing own profile
      // Merge with existing user so isAdmin / other fields are never lost
      if (updatedUser && !isEditingOther) {
        dispatch(setCredentials({ ...loggedInUser, ...updatedUser }));
      }

      toast.success(result?.message || "Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isEditingOther && !targetUser) {
    return (
      <div className="mt-16 max-w-3xl">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="mt-16 max-w-3xl">
      <h1 className="text-2xl font-semibold text-gray-900">
        {isEditingOther ? `Edit Profile — ${targetUser?.name || "User"}` : "My Profile"}
      </h1>

      {isEditingOther && (
        <p className="mt-1 text-sm text-amber-600 font-medium">
          ⚠ You are editing another user&apos;s profile as an admin.
        </p>
      )}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-blue-700 text-white flex items-center justify-center text-lg font-semibold">
            {getInitials(targetUser?.name || "U")}
          </div>

          <div>
            <p className="text-lg font-medium text-gray-900">{targetUser?.name || "User"}</p>
            <p className="text-sm text-gray-500">{targetUser?.title || "No title"}</p>
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
            register={register("title")}
            error={errors.title ? errors.title.message : ""}
          />

          <Textbox
            placeholder="Role (e.g. Developer)"
            type="text"
            name="role"
            label="Role"
            className="w-full rounded"
            register={register("role")}
            error={errors.role ? errors.role.message : ""}
          />

          <Textbox
            placeholder="Email address"
            type="email"
            name="email"
            label="Email"
            className="w-full rounded"
            register={register("email", { required: "Email is required" })}
            error={errors.email ? errors.email.message : ""}
          />

          <div className="sm:col-span-2 flex justify-end pt-2">
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
