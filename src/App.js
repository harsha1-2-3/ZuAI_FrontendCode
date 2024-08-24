import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PostDetails from "./components/PostDetails";
import BlogPosts from "./components/BlogPosts";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/posts" element={<BlogPosts />} />
          <Route exact path="/posts/:id" element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
