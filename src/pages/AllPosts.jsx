import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import appWriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await appWriteService.getPosts();
        setPosts(response.documents);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <>
      <div className="w-full max-w-[992px] flex justify-center">
        <ul className="w-full flex flex-col items-center">
          {posts &&
            posts.map((post) => <PostCard key={post.$id} data={post} />)}
        </ul>
      </div>
    </>
  );
}

export default AllPosts;
