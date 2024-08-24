import { Component } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Header from "../Header";
import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

class BlogPosts extends Component {
  state = {
    apiStatus: apiConstants.initial,
    postsList: [],
  };

  componentDidMount() {
    this.getPosts();
  }

  onClickDelete = async (id) => {
    this.setState({ apiStatus: apiConstants.loading });
    const url = `https://zuai-backendcode-2.onrender.com/posts/${id}`;
    const options = {
      method: "DELETE",
    };
    const response = await fetch(url, options);
    if (response.ok) {
      this.setState({ apiStatus: apiConstants.success });
      this.getPosts();
    } else {
      this.setState({ apiStatus: apiConstants.failure });
    }
  };

  renderSuccessPosts = () => {
    const { postsList } = this.state;

    return (
      <ul className="postsUl">
        {postsList.map((each) => (
          <li key={each.id} className="postLi">
            <Link to={`/posts/${each.id}`} className="linkHeadCont">
              <div className="textImgCont">
                <img
                  src={each.contentUrl}
                  className="postLiImg"
                  alt="postLiImg"
                />
                <div className="postLiTextCont">
                  <h1 className="postLiHead">{each.title}</h1>
                  <p className="postLiPara">
                    Posted On {each.createdAt.split(" ")[0]}
                  </p>
                </div>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => this.onClickDelete(each.id)}
              className="deleteBtn"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUP7TrJfCjHBn3Qhm7A67Go8IogxNZRo6cVh9NszqVXIywWFEkryTn-0wr&s=10"
                className="deleteIcon"
                alt="deleteIcon"
              />
            </button>
          </li>
        ))}
      </ul>
    );
  };

  renderLoading = () => (
    <div className="loader-container">
      <ThreeDots height="100" width="100" color="#0000000" />
    </div>
  );

  renderFailurePosts = () => (
    <div className="failCont">
      <h1 className="failHead">Loading Failed!!!</h1>
    </div>
  );

  getPosts = async () => {
    this.setState({ apiStatus: apiConstants.loading });
    const url = "https://zuai-backendcode-2.onrender.com/posts";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const updatedPosts = data.map((e) => ({
        id: e.id,
        title: e.title,
        content: e.content,
        contentUrl: e.content_url,
        createdAt: e.created_at,
      }));
      console.log(data);
      this.setState({
        postsList: updatedPosts,
        apiStatus: apiConstants.success,
      });
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      });
    }
  };

  renderAllPages = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessPosts();
      case apiConstants.loading:
        return this.renderLoading();
      case apiConstants.failure:
        return this.renderFailurePosts();
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="bgHome">
          <h1 className="homeHead">All Posts</h1>
          {this.renderAllPages()}
        </div>
      </>
    );
  }
}
export default BlogPosts;
