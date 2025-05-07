import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
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
      fetch(`http://localhost:27017/session/Approved/${_id}`).then((res) =>
        res.json()
      ),
  });

  if (isPending) return <p className="text-center text-white">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-white">
        An error occurred: {error.message}
      </p>
    );

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

      fetch("http://localhost:27017/material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire({
            title: "Upload successful",
            icon: "success",
            draggable: true,
            confirmButtonText: "OK",
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
    <div className="py-8">
      <div className="max-w-3xl mx-auto py-8 px-6 rounded-lg shadow-lg bg-gray-700 text-white">
        <h2 className="text-center text-4xl font-bold text-teal-400 mb-6">
          Add Material to Your Session
        </h2>
        <p className="text-center text-lg text-gray-300 mb-8">
          Fill in the details below to add material to your session. You can
          upload preview images and provide a Google Drive link for easy access.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-lg font-medium">
              Title of Material
            </label>
            <input
              placeholder="Enter session title"
              defaultValue={sessionData.title}
              className="w-full px-4 py-3 bg-gray-700 border border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("title", { required: true })}
            />
          </div>

          <div>
            <label className="block text-lg font-medium">
              Google Drive Link
            </label>
            <input
              type="text"
              placeholder="Paste the link to your material here"
              className="w-full px-4 py-3 bg-gray-700 border border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("driveLink", { required: true })}
            />
          </div>

          <div>
            <label className="block text-lg font-medium">
              Upload a Preview Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered w-full bg-gray-700 text-white border border-teal-600 rounded-lg focus:outline-none"
              {...register("image", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 rounded-lg text-white font-semibold transition duration-200 shadow-md"
          >
            Upload Material
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
