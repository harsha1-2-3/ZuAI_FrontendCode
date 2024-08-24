import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Header from "../Header";
import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

const PostDetails = () => {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [postDetailsObj, setPostDetailsObj] = useState({});
  const { id } = useParams();

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
              Edit
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

  return (
    <>
      <Header />
      <div className="bgPostDetails">
        {apiStatus === apiConstants.success
          ? renderSuccessPostDetails()
          : apiStatus === apiConstants.loading
          ? renderLoading()
          : renderFailurePostDetails()}
      </div>
    </>
  );
};

export default PostDetails;
