import { Component } from "react";
import "./index.css";

class FormFile extends Component {
  state = {
    title: "",
    imageUrl: "",
    content: "",
  };
  render() {
    return (
      <>
        <div className="bgForm">
          <h1 className="formHead">Create/Update Form</h1>
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
              />
            </div>
            <div className="inputCont">
              <label for="content" className="inputLabel">
                Content
              </label>
              <input
                placeholder="Enter Content"
                type="text"
                id="content"
                className="inputBox"
              />
            </div>
            <button className="formBtn" type="button">
              Create/Save
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default FormFile;
