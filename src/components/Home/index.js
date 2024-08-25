import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const Home = () => {
  const [title, setTitle] = useState("");
  const [contentUrl, setcontentUrl] = useState("");
  const [content, setContent] = useState("");
  const [formOrHome, setFormOrHome] = useState("HOME");

  const [isTitleError, setIsTitleError] = useState(false);
  const [isContentUrlError, setIsContentUrlError] = useState(false);
  const [isContentError, setIsContentError] = useState(false);

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
    let hasErrors = false;

    if (title.trim() === "") {
      setIsTitleError(true);
      hasErrors = true;
    } else {
      setIsTitleError(false);
    }

    if (contentUrl.trim() === "") {
      setIsContentUrlError(true);
      hasErrors = true;
    } else {
      setIsContentUrlError(false);
    }

    if (content.trim() === "") {
      setIsContentError(true);
      hasErrors = true;
    } else {
      setIsContentError(false);
    }

    if (!hasErrors) {
      try {
        const url = `https://zuai-backendcode-2.onrender.com/posts`;
        const sendingData = {
          title,
          content_url: contentUrl,
          content,
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendingData),
        });

        if (response.ok) {
          setFormOrHome("HOME");
          console.log("Post created successfully!");
        } else {
          console.error("Error creating post:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    } else {
      console.log(
        "Validation failed, post creation halted. Please fill in all fields."
      );
    }
  };

  const onClickCreate = () => {
    setFormOrHome("FORM");
  };

  const renderForm = () => {
    const titleErrorClass = isTitleError ? "inputBoxError" : "";
    const contentUrlErrorClass = isContentUrlError ? "inputBoxError" : "";
    const contentErrorClass = isContentError ? "inputBoxError" : "";
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
              className={`inputBox ${titleErrorClass}`}
              onChange={onChangeTitle}
              value={title}
            />
            {isTitleError && (
              <p className="errorMsg">*Entering title required</p>
            )}
          </div>
          <div className="inputCont">
            <label htmlFor="url" className="inputLabel">
              Image Url
            </label>
            <input
              placeholder="Enter Image Url"
              type="text"
              id="url"
              className={`inputBox ${contentUrlErrorClass}`}
              onChange={onChangecontentUrl}
              value={contentUrl}
            />
            {isContentUrlError && (
              <p className="errorMsg">*Entering image url required</p>
            )}
          </div>
          <div className="inputCont">
            <label htmlFor="content" className="inputLabel">
              Content
            </label>
            <textarea
              placeholder="Enter Content"
              id="content"
              className={`inputBox ${contentErrorClass}`}
              onChange={onChangeContent}
              value={content}
            />
            {isContentError && (
              <p className="errorMsg">*Entering content required</p>
            )}
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
          <h1 className="homHead">
            Posts Assignment by <br /> <span>ZuAI Compoany</span>
          </h1>
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
