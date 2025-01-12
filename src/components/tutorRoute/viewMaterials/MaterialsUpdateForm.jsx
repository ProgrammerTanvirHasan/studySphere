import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const image_hosting_key = "a9b9160b05e3d4e68e60f154f621c349";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MaterialsUpdateForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { _id } = useParams();

  const {
    isLoading,
    isError,
    error,
    data: materials,
  } = useQuery({
    queryKey: ["update", _id],
    queryFn: () =>
      fetch(`http://localhost:4000/material/update/${_id}`).then((res) =>
        res.json()
      ),
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
        `http://localhost:4000/material/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
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

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>An error has occurred: {error.message}</p>;

  return (
    <div>
      <h2 className="bg-orange-400 py-2 text-white text-center text-xl">
        Update Your Materials
      </h2>
      <div className="lg:w-3/5 bg-teal-700 mt-4 mx-auto p-8">
        <div className="text-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-lg mb-2">Title</label>
              <input
                placeholder="Type here"
                defaultValue={materials.title}
                className="py-3 border rounded-xl w-96 bg-black glass pl-4"
                {...register("title", { required: "Title is required" })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg mb-2">Google Drive Link</label>
              <input
                type="text"
                defaultValue={materials.driveLink}
                placeholder="Type here"
                className="py-3 border rounded-xl w-96 bg-black glass pl-4"
                {...register("driveLink", {
                  required: "Drive link is required",
                })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg mb-2">Update Your Photo</label>
              <input type="file" accept="image/*" {...register("image")} />
            </div>

            <div className="mt-4">
              <button className="p-2 glass rounded-md px-6 bg-orange-400 text-white">
                Update
              </button>
            </div>
          </form>

          <div className="mt-12">
            <Link to="/">
              <p className="text-center border border-orange-300 text-white py-2 rounded">
                Go back to home
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialsUpdateForm;
