import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Link, useParams } from "react-router";
import Swal from "sweetalert2";
const image_hosting_key = "a9b9160b05e3d4e68e60f154f621c349";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateForm = () => {
  const { register, handleSubmit, reset } = useForm();

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
        driveLink: data.driveLink,
        imageUrl: imageURL,
      };

      fetch("http://localhost:4000/material", {
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

  const { _id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["Approved", _id],
    queryFn: () =>
      fetch(`http://localhost:4000/session/Approved/${_id}`).then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="bg-orange-400 py-2 text-white text-center text-xl">
        Add material to your session
      </h2>
      <div className="lg:w-3/5 bg-teal-900 mt-4 mx-auto p-8">
        <div className=" text-white ">
          <div className="label">
            <span className="label-text text-white text-lg">Title</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Type here"
              defaultValue={data.title}
              className=" py-3 border rounded-xl w-96 bg-black glass pl-4"
              {...register("title", { required: true })}
            />

            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text text-white text-lg">
                  Google drive link
                </span>
              </div>
              <input
                {...register("driveLink", { required: true })}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-96 bg-black glass"
              />
            </label>

            <label>
              <div className="py-4">
                <span className="text-lg border-b-4 ">Upload your photo</span>
              </div>
              <input
                {...register("image", { required: true })}
                type="file"
                name="image"
                accept="image/*"
              />
            </label>

            <div className="mt-4">
              <button className="p-2 glass rounded-md ">
                Upload materials
              </button>
            </div>
          </form>
          <div className=" mt-12">
            <Link to="/">
              <p className="text-center border  border-orange-300 ">
                Go back to home
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
