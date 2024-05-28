import React, { Component } from "react";
import Header2 from "./Header2";
import Footer from "./Footer";
import { FiUpload } from "react-icons/fi";
import Sidebar from "./SideBar";

class FirstPage extends Component {
  handleFileUpload = (e) => {
    // Handle file upload logic here
    console.log("File uploaded:", e.target.files[0]);
  };

  render() {
    return (
      <div>
        <div className="firstPageDiv">
          <Header2 />
          <Sidebar />
          <div className="firstPageRect">
            {/* White rectangle with an icon for uploading image */}
            <div className="firstPageRect2">
              <label htmlFor="upload-input">
                <input
                  id="upload-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={this.handleFileUpload}
                />
                <div className="insideRectIcon">
                  <i className="FiUpload">
                    <FiUpload className="uploadIcon" />
                  </i>
                  <div>Click or drag file to upload</div>
                  <div>png, jpg, jpeg</div>
                </div>
                <a className="generatButton">Generate NFT</a>
              </label>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default FirstPage;
