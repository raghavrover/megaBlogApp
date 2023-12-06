/**
 * 0. Creates a new `Post` or Edits the existing post
 * 1. Post data is received from the `handleSubmit` function, after the form is validated
 * 2.1 Use the `createPost` AppWrite service to create a new post
 * 2.2 Use the `updatePost` AppWrite service to update an existing post
 * 3. If the posting operation is successful, navigate to the Post page
 */

import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Select, Button, RealTimeEditor } from "./Index";
import appWriteService from "../appwrite/config";

const optionArray = ["active", "in-active"];

function PostForm({ post }) {
  const userData = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  // Posting or Updating a Post
  const createPost = async (data) => {
    let dbPost;
    try {
      const image = data.image[0]; //Images are stored in an array, accessing the updated input image
      if (post) {
        // Updating the Post
        const file = image ? await appWriteService.uploadFile(image) : null; // Uploading imgFile to the bucket if there's an updated image, else return `null`

        if (file) {
          // Deleting the previous image of the post from the storage bucket
          await appWriteService.deleteFile(post.featuredImage);
        }
        // Updating the Post
        dbPost = await appWriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });
      } else {
        // Creating new Post
        const file = await appWriteService.uploadFile(image);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          data.userId = userData.$id;
          dbPost = await appWriteService.createPost(data);
        }
      }

      //If the operation is successful take the user to the Post route
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  // Handling errors raised due to invalid form
  const handleError = (data) => {
    console.log("error", data);
  };

  // Generating the slug with the title value
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue, slugTransform]);

  return (
    <div className="w-[90%] my-8 max-w-[1440px] mx-auto flex items-start lg:my-14">
      <form
        className="w-full flex flex-col space-y-7"
        onSubmit={handleSubmit(createPost, handleError)}
      >
        <div className="w-full flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
          <Input
            label="Title"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug"
            placeholder="Slug"
            readOnly
            className="cursor-not-allowed focus:outline-none"
            {...register("slug", { required: true })}
          />
        </div>
        <div className="w-full flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
          <div className="flex flex-col space-y-6 lg:w-2/5 lg:order-1">
            <div className="">
              {!post && (
                <Input
                  label="Image"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })} // we don't need the image, if we're updating an existing post
                />
              )}
              {post && (
                <div className="w-full mb-4">
                  <img
                    className="w-full object-contain"
                    src={""}
                    alt={post?.title}
                  />
                </div>
              )}
              <Select
                label="Status"
                options={optionArray}
                {...register("status", { required: true })}
              />
            </div>
            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="hidden w-full py-4 bg-slate-600 rounded-md md:w-40 lg:inline"
            >
              {post ? "Update" : "Post"}
            </Button>
          </div>
          <RealTimeEditor
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full py-4 bg-slate-600 rounded-md md:w-40 lg:hidden"
        >
          {post ? "Update" : "Post"}
        </Button>
      </form>
    </div>
  );
}

export default PostForm;
