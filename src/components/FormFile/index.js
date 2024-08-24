import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const FormFile = () => {
  const [title, setTitle] = useState("");
  const [contentUrl, setcontentUrl] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [formOrHome, setFormOrHome] = useState("HOME");

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangecontentUrl = (event) => {
    setcontentUrl(event.target.value);
  };

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const onClickCreate = async () => {
    try {
      const url = `https://zuai-backendcode-2.onrender.com/posts/${id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          contentUrl,
          content,
        }),
      });

      if (response.ok) {
        console.log("Post created/updated successfully!");
      } else {
        console.error("Error creating/updating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating/updating post:", error);
    }
  };

  const renderForm = () => {
    return (
      <div className="bgForm">
        <h1 className="formHead">Create Form</h1>
        <div className="formCont">
          <div className="inputCont">
            <label for="title" className="inputLabel">
              Title
            </label>
            <input
              placeholder="Enter Title"
              type="text"
              id="title"
              className="inputBox"
              onChange={onChangeTitle}
              value={title}
            />
          </div>
          <div className="inputCont">
            <label for="url" className="inputLabel">
              Image Url
            </label>
            <input
              placeholder="Enter Image Url"
              type="text"
              id="url"
              className="inputBox"
              onChange={onChangecontentUrl}
              value={contentUrl}
            />
          </div>
          <div className="inputCont">
            <label for="content" className="inputLabel">
              Content
            </label>
            <textarea
              placeholder="Enter Content"
              id="content"
              className="inputBox"
              onChange={onChangeContent}
              value={content}
            />
          </div>
          <button onClick={onClickCreate} className="formBtn" type="button">
            Create
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      {formOrHome === "FORM" ? renderForm() : renderHome()}
    </>
  );
};

export default FormFile;
