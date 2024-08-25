import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { FaPencil } from "react-icons/fa6";
import Header from "../Header";
import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  updatedForm: "UPDATEFORM",
  failure: "FAILURE",
};

const PostDetails = () => {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [postDetailsObj, setPostDetailsObj] = useState({});
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [contentUrl, setcontentUrl] = useState("");
  const [content, setContent] = useState("");

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangecontentUrl = (event) => {
    setcontentUrl(event.target.value);
  };

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setApiStatus(apiConstants.loading);
        const url = `https://zuai-backendcode-2.onrender.com/posts/${id}`;
        const options = {
          method: "GET",
        };
        const response = await fetch(url, options);

        if (response.ok) {
          const data = await response.json();
          setPostDetailsObj({
            id: data.id,
            title: data.title,
            content: data.content,
            contentUrl: data.content_url,
            createdAt: data.created_at,
          });
          setApiStatus(apiConstants.success);
          setTitle(data.title);
          setcontentUrl(data.content_url);
          setContent(data.content);
        } else {
          setApiStatus(apiConstants.failure);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
        setApiStatus(apiConstants.failure);
      }
    };

    fetchPostDetails();
  }, [id]);

  const onClickEdit = () => {
    console.log("clicked edit");
    setApiStatus(apiConstants.updatedForm);
  };

  const renderSuccessPostDetails = () => {
    return (
      <div className="bgPostDetails">
        <div className="postDetails">
          <h1 className="pdHead">{postDetailsObj.title}</h1>
          <img className="pdImg" src={postDetailsObj.contentUrl} alt="pdImg" />
          <div className="dateCont">
            <p className="datePara">
              Posted On {postDetailsObj.createdAt.split(" ")[0]}
            </p>
            <button onClick={onClickEdit} className="editBtn" type="button">
              Edit <FaPencil className="editIcon" />
            </button>
          </div>
          <p className="contentPara">{postDetailsObj.content}</p>
          <div className="contactCont">
            <h1 className="contactHead">Contact</h1>
            <button type="button" className="contactBtn">
              <img
                src="https://img.icons8.com/?size=100&id=118467&format=png&color=000000"
                className="contactIcon"
                alt="contactIcon"
              />
            </button>
            <button type="button" className="contactBtn">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBzynjjh7N14Lsuh79XBZVJEMEdUoSCH4pSdbT1pk4zrvLCvXR13lnEoU&s=10"
                className="contactIcon"
                alt="contactIcon"
              />
            </button>
            <button type="button" className="contactBtn">
              <img
                src="https://static.vecteezy.com/system/resources/previews/023/986/970/non_2x/linkedin-logo-linkedin-logo-transparent-linkedin-icon-transparent-free-free-png.png"
                className="contactIcon"
                alt="contactIcon"
              />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const onClickSave = async () => {
    try {
      setApiStatus(apiConstants.loading);

      const url = `https://zuai-backendcode-2.onrender.com/posts/${id}`;
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          contentUrl,
          content,
        }),
      };

      const response = await fetch(url, options);

      if (response.ok) {
        setPostDetailsObj({
          ...postDetailsObj,
          title,
          contentUrl,
          content,
        });
        setApiStatus(apiConstants.success);
      } else {
        console.error("Error updating post:", await response.text());
        setApiStatus(apiConstants.failure);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      setApiStatus(apiConstants.failure);
    }
  };

  const renderUpdateForm = () => {
    return (
      <>
        <div className="bgForm">
          <h1 className="formHead">Update Form</h1>
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
            <button onClick={onClickSave} className="formBtn" type="button">
              Save
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderLoading = () => {
    <div className="loader-container">
      <ThreeDots height="100" width="100" color="#0000000" />
    </div>;
  };

  const renderFailurePostDetails = () => {
    <div className="failCont">
      <h1 className="failHead">Loading Failed!!!</h1>
    </div>;
  };

  const renderAllPages = () => {
    switch (apiStatus) {
      case apiConstants.success:
        return renderSuccessPostDetails();
      case apiConstants.loading:
        return renderLoading();
      case apiConstants.updatedForm:
        return renderUpdateForm();
      case apiConstants.failure:
        return renderFailurePostDetails();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="bgPostDetails">{renderAllPages()}</div>
    </>
  );
};

export default PostDetails;
