import React, { Component } from "react";
import Header2 from "./Header2";
import Footer from "./Footer";
import { FiUpload } from "react-icons/fi";
import Sidebar from "./SideBar";
import Modal from "./Modal"; // Assume Modal is another component you create

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  handleFileUpload = (e) => {
    // Handle file upload logic here
    console.log("File uploaded:", e.target.files[0]);
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  render() {
    return (
      <div>
        <div className="firstPageDiv">
          <Header2 />
          <Sidebar />
          <div className="firstPageRect">
            <div className="firstPageRect2">
              <div className="insideRectIcon">
                <button className="uploadButton" onClick={this.toggleModal}>
                  Upload Image
                </button>
                <button className="generateButton">
                  Use AI to Generate Image
                </button>
              </div>
              {this.state.isModalOpen && (
                <Modal onClose={this.toggleModal}>
                  <label htmlFor="upload-input">
                    <input
                      id="upload-input"
                      type="file"
                      onChange={this.handleFileUpload}
                    />
                     <div className="insideRectIcon">
                  <i className="FiUpload">
                    <FiUpload className="uploadIcon" />
                  </i>
                  <div>Click or drag file to upload</div>
                  <div>png, jpg, jpeg</div>
                </div>
                  </label>
                </Modal>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default FirstPage;
