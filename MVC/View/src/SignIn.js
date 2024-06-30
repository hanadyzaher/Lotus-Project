import React, { Component } from "react";
import Header2 from "./Header2";
import Footer from "./Footer";
import { FiUpload } from "react-icons/fi";
import Sidebar from "./SideBar";
import Modal from "./Modal";
import GenerateImage from "./GenerateImage";
import "./style.css"

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedFile: null,
      previewUrl: '',
      uploadStatus: '',
      showGenerateImage: false,
      aiGeneratedImage: null,
    };
  }

  handleFileChange = (e) => {
    const file = e.target.files[0];
    this.setState({ 
      selectedFile: file, 
      previewUrl: URL.createObjectURL(file),
      aiGeneratedImage: null, // Clear AI generated image if a new file is selected
    });
  };

  handleFileUpload = async () => {
    const { selectedFile } = this.state;
    const userId = 1; // Replace with actual user ID from session or props

    if (!selectedFile) {
      this.setState({ uploadStatus: 'No file selected' });
      alert('No file selected');
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

  handleAIImageSelect = (imageUrl) => {
    this.setState({ 
      aiGeneratedImage: imageUrl,
      previewUrl: imageUrl,
      selectedFile: null, // Clear selected file if an AI image is selected
    });
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

  render() {
    const { isModalOpen, previewUrl, uploadStatus, showGenerateImage, aiGeneratedImage } = this.state;

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
                            <i className="FiUpload uploadIcon">
                              <FiUpload />
                            </i>
                            <div className="clickDiv">Click or drag file to upload</div>
                            <div className="typeDiv">png, jpg, jpeg</div>
                          </>
                        )}
                      </div>
                    </label>
                    <button onClick={this.handleFileUpload} className="uploadButton">Upload</button>
                  </div>
                </Modal>
              )}
              {uploadStatus && <div>{uploadStatus}</div>}
              {showGenerateImage && (
                <Modal onClose={this.toggleGenerateImage} customClass="generateModal">
                  <GenerateImage onSelectImage={this.handleAIImageSelect} onClose={this.toggleGenerateImage} />
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
