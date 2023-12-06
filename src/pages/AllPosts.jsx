import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Query } from "appwrite";
import appWriteService from "../appwrite/config";
import PostCard from "../Components/PostCard";
import { Container } from "../Components/Index";
import { storePosts } from "../store/postSlice";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("");
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
    <>
      <Container>
        {posts.length === 0 && <h1>Loading...</h1>}
        <div className="w-full max-w-[992px] flex justify-center">
          <ul className="w-full flex flex-col items-center">
            {posts &&
              posts.map((post) => <PostCard key={post.$id} data={post} />)}
          </ul>
        </div>
      </Container>
    </>
  );
}

export default AllPosts;
