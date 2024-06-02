import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

class VirtualGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      virtualGalleryPage: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/pages/5', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ virtualGalleryPage: data }))
      .catch((err) => console.error('Failed to fetch page data:', err));
  }

  render() {
    const { virtualGalleryPage } = this.state;

    if (!virtualGalleryPage) {
      return <div>Page not found</div>;
    }

    return (
      <div className="virtualGalleryMain">
        <div>
          <Link to="/firstpage">
            <i className="backIcon">
              <FontAwesomeIcon icon={faArrowLeft} />
            </i>
          </Link>
        </div>
        <Link className="startTour" to="./StartTour">{virtualGalleryPage.startButton}</Link>
      </div>
    );
  }
}

export default VirtualGallery;
