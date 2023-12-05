import { Link } from "react-router-dom";
import appWriteService from "../appwrite/config";

function PreviewPostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full max-w-[250px] border flex flex-col">
        <img
          src={appWriteService.getFilePreview(featuredImage)}
          className="w-full object-cover aspect-square m-0"
          alt={title}
        />
        <h1 className="text-sm">{title}</h1>
      </div>
    </Link>
  );
}

export default PreviewPostCard;
