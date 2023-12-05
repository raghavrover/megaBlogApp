// Need to work on the appearance and editor resizing

import { useId } from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import envVars from "../envVars/envVars";

function RealTimeEditor({ name, control, label, defaultValue = "" }) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="text-sm inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <Controller
        name={name || "content"} // name of the form field(textarea)
        id={id}
        control={control} // to establish connection with the react-hook-form
        render={({ field: { onChange } }) => (
          // rendering the form field element along with `onChange` event attribute
          <Editor
            initialValue={defaultValue}
            apiKey={envVars.tinyMceAPIKey}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "searchreplace",
                "visualblocks",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | fontfamily bold italic forecolor  link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
            }}
          />
        )}
      />
    </div>
  );
}

export default RealTimeEditor;
