import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import appWriteService from "../appwrite/config";

function PostCard({ data }) {
  const { $id, content, featuredImage, title } = data;

  return (
    <li className="w-full border-b bg-black">
      <Link to={`/post/${$id}`}>
        <div className="w-full flex flex-col items-center bg-white rounded-sm">
          <img
            src={appWriteService.getFilePreview(featuredImage).href}
            alt={title}
            className="w-full max-w-sm aspect-square object-cover"
          />
          <div className="w-full px-4 pb-4">
            <h1 className="w-full text-xl text-start">{title}</h1>
            <div className="w-full text-sm">{parse(content)}</div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default PostCard;
