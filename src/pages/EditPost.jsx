import PostForm from "../Components/PostForm";
import { Container } from "../Components/Index";

function EditPost({ post }) {
  return (
    <>
      <Container>
        <PostForm post={post} />
      </Container>
    </>
  );
}

export default EditPost;
