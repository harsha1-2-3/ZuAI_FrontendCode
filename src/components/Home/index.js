import { Link } from "react-router-dom";
import Header from "../Header";
import './index.css'
const Home = () => (
  <div className="bgHom">
    <Header />
    <Link to="/posts">See All Posts</Link>;
  </div>
);
export default Home;
