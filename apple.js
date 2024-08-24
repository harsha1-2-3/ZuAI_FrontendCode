import { Component } from "react";
import "./App.css";

class Blog extends Component {
  state = {
    posts: [],
    title: "",
    content: "",
    content_url: "",
    currentId: null,
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://zuai-backendcode-2.onrender.com/posts"
      );
      const data = await response.json();
      this.setState({ posts: data });
      const { posts } = this.state;
      console.log(data);
      console.log(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  handleCreate = async () => {
    const { title, content, content_url } = this.state;
    try {
      const newPost = { title, content, content_url };
      const response = await fetch(
        "https://zuai-backendcode-2.onrender.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        }
      );
      if (response.ok) {
        this.fetchPosts();
        this.setState((prevState) => ({
          posts: [...prevState.posts, newPost],
        }));
      } else {
        console.error("Error creating post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  handleUpdate = async () => {
    const { title, content, content_url, currentId } = this.state;
    try {
      const response = await fetch(
        `https://zuai-backendcode-2.onrender.com/posts/${currentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, content_url }),
        }
      );
      if (response.ok) {
        this.fetchPosts();
      } else {
        console.error("Error updating post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://zuai-backendcode-2.onrender.com/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        this.fetchPosts();
      } else {
        console.error("Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleEdit = (post) => {
    this.setState({
      title: post.title,
      content: post.content,
      content_url: post.content_url,
      currentId: post.id,
    });
  };

  render() {
    const { posts, title, content, content_url } = this.state;

    return (
      <div>
        <h1>Blog Posts</h1>
        <div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleInputChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="content"
            value={content}
            onChange={this.handleInputChange}
            placeholder="Content"
          />
          <input
            type="text"
            name="content_url"
            value={content_url}
            onChange={this.handleInputChange}
            placeholder="Content URL"
          />
          <button onClick={this.handleCreate}>Create Post</button>
          <button onClick={this.handleUpdate}>Update Post</button>
        </div>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <img
                src={post.content_url}
                alt={post.title}
                style={{ width: "150px" }}
              />
              <button onClick={() => this.handleEdit(post)}>Edit</button>
              <button onClick={() => this.handleDelete(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Blog;
