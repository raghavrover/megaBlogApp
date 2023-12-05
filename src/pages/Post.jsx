import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import appWriteService from "../appwrite/config";

function Post() {
  const [post, setPost] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await appWriteService.getPost(id);
        setPost(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    }

    fetchPost();
  }, [id]);

  return (
    <>
      {post ? (
        <div className="w-full flex flex-col items-center bg-white rounded-sm">
          <img
            src={appWriteService.getFilePreview(post.featuredImage).href}
            alt={post.title}
            className="w-full max-w-sm aspect-square object-cover"
          />
          <div className="w-full px-4 pb-4">
            <h1 className="w-full text-xl text-start">{post.title}</h1>
            <div className="w-full text-xs">{parse(post.content)}</div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default Post;
