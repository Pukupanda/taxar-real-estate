"use client";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useMemo, useRef } from "react";

var Size = Quill.import("attributors/style/size");
Size.whitelist = [
  "10px",
  "11px",
  "12px",
  "13px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
];
Quill.register(Size, true);

function TextEditor(props) {
  const quillRef = useRef();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ size: Size.whitelist }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link"],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
        ],
      },
    }),
    []
  );

  return (
    <>
      <ReactQuill
        theme="snow"
        className="textarea-control border-0 p-0 themeShadow"
        ref={quillRef}
        modules={modules}
        value={props.value}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        onChange={(content, delta, source, editor) => {
          props.formik.setFieldValue(props.name, content);
        }}
      />
    </>
  );
}
export default TextEditor;
