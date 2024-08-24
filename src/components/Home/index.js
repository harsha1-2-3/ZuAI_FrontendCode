import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const Home = () => {
  const [title, setTitle] = useState("");
  const [contentUrl, setcontentUrl] = useState("");
  const [content, setContent] = useState("");
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

  const onPostCreate = async () => {
    try {
      const url = `https://zuai-backendcode-2.onrender.com/posts`;
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
        setFormOrHome("HOME");
      } else {
        console.error("Error creating/updating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating/updating post:", error);
    }
  };

  const onClickCreate = () => {
    setFormOrHome("FORM");
  };

  const renderForm = () => {
    return (
      <div className="bgForm">
        <h1 className="formHead">Create Form</h1>
        <div className="formCont">
          <div className="inputCont">
            <label htmlFor="title" className="inputLabel">
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
            <label htmlFor="url" className="inputLabel">
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
            <label htmlFor="content" className="inputLabel">
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
          <button onClick={onPostCreate} className="formBtn" type="button">
            Createing...
          </button>
        </div>
      </div>
    );
  };

  const renderHome = () => {
    return (
      <>
        <div className="bgHom">
          <h1 className="homHead">Posts Assignment by ZuAI Compoany</h1>
          <button type="button" onClick={onClickCreate} className="addBtn">
            Create Post
          </button>
          <button type="button" className="linkBtn">
            <Link className="linkHome" to="/posts">
              See All Posts
            </Link>
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <Header />
      {formOrHome === "FORM" ? renderForm() : renderHome()}
    </>
  );
};

export default Home;
