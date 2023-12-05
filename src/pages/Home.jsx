import { useEffect, useState } from "react";
import appWriteService from "../appwrite/config";
import { PreviewPostCard } from "../Components/Index";

function Home() {
  const [posts, setPosts] = useState([]);

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
    <div className=" h-full w-full max-w-[1440px]">
      {posts.length === 0 && <p>Loading...</p>}
      {posts && (
        <ul className="flex justify-start flex-wrap gap-1">
          {posts.map((post) => (
            <PreviewPostCard key={post.$id} {...post} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
