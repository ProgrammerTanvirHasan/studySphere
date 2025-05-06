import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Link, useParams } from "react-router";
import Swal from "sweetalert2";
const image_hosting_key = "a9b9160b05e3d4e68e60f154f621c349";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const { _id } = useParams();
  const {
    isPending,
    error,
    data: sessionData,
  } = useQuery({
    queryKey: ["Approved", _id],
    queryFn: () =>
      fetch(
        `https://stydy-sphere-server-vrnk.vercel.app/session/Approved/${_id}`
      ).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const response = await fetch(image_hosting_api, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();

    if (result.success) {
      const imageURL = result.data.display_url;

      const updatedData = {
        title: data.title,
        studySessionId: sessionData._id,
        tutorEmail: sessionData.email,
        driveLink: data.driveLink,
        imageUrl: imageURL,
      };

      fetch("https://stydy-sphere-server-vrnk.vercel.app/material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire({
            title: "Upload successfully",
            icon: "success",
            draggable: true,
          });
          reset();
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  };

  return (
    <div>
      <h2 className="text-teal-500 font-bold py-4 text-center text-3xl">
        Add Material to Your Session
      </h2>

      <div className="min-h-[60vh] bg-gradient-to-br from-[#2c2a4a]/70 to-[#1f1d3a]/80 mx-auto p-8 rounded-2xl shadow-2xl max-w-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 text-white"
        >
          <div>
            <label className="block text-base font-semibold mb-2">Title</label>
            <input
              placeholder="Enter session title"
              defaultValue={sessionData.title}
              className="w-full px-4 py-3 bg-[#1a1a2e] border border-teal-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
              {...register("title", { required: true })}
            />
          </div>

          <div>
            <label className="block text-base font-semibold mb-2">
              Google Drive Link
            </label>
            <input
              type="text"
              placeholder="Paste link here"
              className="w-full px-4 py-3 bg-[#1a1a2e] border border-teal-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
              {...register("driveLink", { required: true })}
            />
          </div>

          <div>
            <label className="block text-base font-semibold mb-2">
              Upload a Preview Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered w-full max-w-xs bg-gray-900 text-white border border-teal-600"
              {...register("image", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 transition duration-200 text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            Upload Materials
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
