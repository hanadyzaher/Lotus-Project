import React, { Component } from "react";
import "./style.css"
class GenerateImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      images: [],
      selectedImage: null,
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleGenerate = async () => {
    const { searchTerm } = this.state;
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=gComSj8XRN4U-a2FPBFLOPf54-o2h7dPxXYbdnxGrhM`);
      const data = await response.json();
      this.setState({ images: data.results });
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  handleSelectImage = (url) => {
    this.setState({ selectedImage: url });
    this.props.onSelectImage(url);
  };

  render() {
    const { searchTerm, images, selectedImage } = this.state;

    return (
      <div className="generateModal">
        <div className="modal-content">
          <span className="modal-close" onClick={this.props.onClose}>&times;</span>
          <div className="generate-image-container">
            <input
              type="text"
              value={searchTerm}
              onChange={this.handleSearchChange}
              placeholder="Enter search term"
            />
            <button onClick={this.handleGenerate}>Generate Image</button>
          </div>
          <div className="generated-images">
            {images.map((image) => (
              <div
                key={image.id}
                className={`image-item ${selectedImage === image.urls.small ? 'selected' : ''}`}
                onClick={() => this.handleSelectImage(image.urls.small)}
              >
                <img src={image.urls.small} alt={image.alt_description} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default GenerateImage;
