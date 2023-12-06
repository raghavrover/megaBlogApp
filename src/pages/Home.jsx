import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Query } from "appwrite";
import appWriteService from "../appwrite/config";
import { PreviewPostCard } from "../Components/Index";
import { Container } from "../Components/Index";
import { storePosts } from "../store/postSlice";

function Home() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const postsData = useSelector((state) => state.posts.postsData);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await appWriteService.getPosts([
          Query.equal("userId", userData.$id),
        ]);
        const { documents } = response;
        dispatch(storePosts(documents));
        setPosts(documents);
      } catch (error) {
        console.log(error);
      }
    }

    if (postsData.length !== 0) {
      setPosts(postsData);
    } else {
      fetchPosts();
    }
  }, []);

  return (
    <Container>
      <div className="h-full w-full max-w-[1440px]">
        {posts.length === 0 && <p>Loading...</p>}
        {posts && (
          <ul className="flex justify-start flex-wrap gap-1">
            {posts.map((post) => (
              <PreviewPostCard key={post.$id} {...post} />
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}

export default Home;
