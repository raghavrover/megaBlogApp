import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import appWriteService from "../appwrite/config";
import { Container } from "../Components/Index";
import { storePosts } from "../store/postSlice";

function Post() {
  const [post, setPost] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const postsData = useSelector((state) => state.posts.postsData);

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

    if (postsData.length !== 0) {
      const data = postsData.find((post) => post.$id === id);
      setPost(data);
    } else {
      fetchPost();
    }
  }, [id]);

  return (
    <>
      <Container>
        {post ? (
          <div className="w-full max-w-[1440px] flex flex-col items-center bg-white rounded-sm">
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
      </Container>
    </>
  );
}

export default Post;
