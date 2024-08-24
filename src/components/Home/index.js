import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";
const Home = () => (
  <>
    <Header />
    <div className="bgHom">
      <h1 className="homHead">Posts Assignment by ZuAI Compoany</h1>
      <button
        type="button"
        onClick={() => {
          console.log("clicked Create");
        }}
        className="addBtn"
      >
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
export default Home;
