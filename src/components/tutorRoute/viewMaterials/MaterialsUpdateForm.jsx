import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const image_hosting_key = "a9b9160b05e3d4e68e60f154f621c349";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MaterialsUpdateForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { _id } = useParams();

  const {
    isPending,
    isError,
    error,
    data: materials,
  } = useQuery({
    queryKey: ["update", _id],
    queryFn: () =>
      fetch(`http://localhost:4001/material/update/${_id}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  const onSubmit = async (data) => {
    try {
      let imageURL = materials.imageUrl;

      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          imageURL = result.data.display_url;
        } else {
          throw new Error("Image upload failed.");
        }
      }

      const updatedData = {
        title: data.title,
        driveLink: data.driveLink,
        imageUrl: imageURL,
      };

      const updateResponse = await fetch(
        `http://localhost:4001/material/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(updatedData),
          credentials: "include",
        }
      );

      if (updateResponse.ok) {
        Swal.fire({
          title: "Update successful",
          icon: "success",
          draggable: true,
        });
        reset();
      } else {
        throw new Error("Failed to update material.");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (isPending)
    return <p className="text-center text-white">Please wait...</p>;

  if (isError)
    return (
      <p className="text-center text-white">
        An error has occurred: {error.message}
      </p>
    );

  return (
    <div>
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-4xl text-center font-semibold text-teal-600 mb-8">
          Update Your Material
        </h2>
        <p className="text-center text-gray-700 mb-6 text-lg">
          Modify the details and upload a new photo or link to the material.
        </p>
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-xl font-medium text-gray-800 mb-2">
                Material Title
              </label>
              <input
                placeholder="Enter material title"
                defaultValue={materials.title}
                className="w-full py-3 px-4 rounded-xl border border-teal-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                {...register("title", { required: "Title is required" })}
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-800 mb-2">
                Google Drive Link
              </label>
              <input
                type="text"
                defaultValue={materials.driveLink}
                placeholder="Enter the Google Drive link"
                className="w-full py-3 px-4 rounded-xl border border-teal-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                {...register("driveLink", {
                  required: "Drive link is required",
                })}
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-800 mb-2">
                Update Material Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full py-3 px-4 rounded-xl border border-teal-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                {...register("image")}
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition duration-200 shadow-md"
              >
                Update Material
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MaterialsUpdateForm;
