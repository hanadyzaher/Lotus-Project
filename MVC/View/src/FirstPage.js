import React, { Component } from "react";
import Header2 from "./Header2";
import Footer from "./Footer";
import { FiUpload } from "react-icons/fi";
import Sidebar from "./SideBar";
import Modal from "./Modal"; 
import GenerateImage from "./GenerateImage"; 

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedFile: null,
      previewUrl: '',
      uploadStatus: '',
      showGenerateImage: false,
      userId: localStorage.getItem('userId'), // Retrieve userId from local storage
    };
  }

  handleFileChange = (e) => {
    const file = e.target.files[0];
    this.setState({ 
      selectedFile: file, 
      previewUrl: URL.createObjectURL(file) 
    });
  };

  handleFileUpload = async () => {
    const { selectedFile, userId } = this.state;

    if (!selectedFile) {
      this.setState({ uploadStatus: 'No file selected' });
      alert('No file selected');
      return;
    }

    if (!userId) {
      this.setState({ uploadStatus: 'User not logged in' });
      alert('User not logged in');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('userId', userId);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.text();
        this.setState({ uploadStatus: result });
        alert('File uploaded successfully');
      } else {
        const error = await response.text();
        this.setState({ uploadStatus: `Upload failed: ${error}` });
        alert(`Upload failed: ${error}`);
      }
    } catch (error) {
      this.setState({ uploadStatus: `Upload failed: ${error.message}` });
      alert(`Upload failed: ${error.message}`);
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
      selectedFile: null,
      previewUrl: ''
    }));
  };

  toggleGenerateImage = () => {
    this.setState((prevState) => ({
      showGenerateImage: !prevState.showGenerateImage,
    }));
  };

  handleGeneratedImageSelect = (imageUrl) => {
    this.setState({ previewUrl: imageUrl, selectedFile: imageUrl, isModalOpen: true, showGenerateImage: false });
  };

  render() {
    const { isModalOpen, previewUrl, uploadStatus, showGenerateImage } = this.state;

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
                <button className="generateButton" onClick={this.toggleGenerateImage}>
                  Use AI to Generate Image
                </button>
              </div>
              {isModalOpen && (
                <Modal onClose={this.toggleModal}>
                  <div className="uploadContainer">
                    <label htmlFor="upload-input" className="uploadLabel">
                      <input
                        id="upload-input"
                        type="file"
                        onChange={this.handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <div className="insideRectIcon">
                        {previewUrl ? (
                          <img src={previewUrl} alt="Preview" className="imagePreview" />
                        ) : (
                          <>
                            <i className="FiUpload">
                              <FiUpload className="uploadIcon" />
                            </i>
                            <div>Click or drag file to upload</div>
                            <div>png, jpg, jpeg</div>
                          </>
                        )}
                      </div>
                    </label>
                    <button onClick={this.handleFileUpload}>Upload</button>
                  </div>
                </Modal>
              )}
              {uploadStatus && <div>{uploadStatus}</div>}
              {showGenerateImage && (
                <Modal onClose={this.toggleGenerateImage}>
                  <GenerateImage onImageSelect={this.handleGeneratedImageSelect} />
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
