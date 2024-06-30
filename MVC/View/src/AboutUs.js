import React, { Component } from "react";
import "./bookFlip.css";
import Header from './Header';
import Footer from './Footer';
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from './images/logo2.png';
import aboutus from './images/aboutus.png';
import story from './images/story.png';
import mission from './images/mission.png';
import offer from './images/offer.png';

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUsPage: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/pages/2', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data); // Log the data
        this.setState({ aboutUsPage: data });
      })
      .catch((err) => console.error('Failed to fetch page data:', err));
  }

  render() {
    const { aboutUsPage } = this.state;

    if (!aboutUsPage) {
      return <div>Loading JSON Data</div>;
    }

    const content = JSON.parse(aboutUsPage.content);
    const contentArray = content.content4 || [];

    return (
      <div>
        <Header />
        <div className="book-flip-container">
          <input type="checkbox" id="checkbox-cover" />
          <input type="checkbox" id="checkbox-page1" />
          <input type="checkbox" id="checkbox-page2" />
          <input type="checkbox" id="checkbox-page3" />
          <input type="checkbox" id="checkbox-page4" />

          <div className="book">
            <div className="cover">
              <label htmlFor="checkbox-cover">
                <div className="cover-content">
                  <h2 className="welcomeLabel">Welcome To</h2>
                  <h1 className="bookTitle">ArtVista</h1>
                  <img src={logo} className="about-logo-image" alt="" />
                  <p>Click to open</p>
                </div>
              </label>
            </div>

            <div className="page" id="page1">
              <div className="front-page">
                <h1 className="fpageTitle">{aboutUsPage.title}</h1>
                <img src={aboutus} className="about-image" alt="" />
                <label className="next" htmlFor="checkbox-page1">
                  <FontAwesomeIcon icon={faArrowRight} />
                </label>
              </div>
              <div className="back-page">
                <h3 className="storyTitle">{content.story}</h3>
                <img src={story} className="story-image" alt="" />
                <label className="prev" htmlFor="checkbox-page1">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </label>
              </div>
            </div>

            <div className="page" id="page2">
              <div className="front-page">
                <p className="story-paragraph">{content.content2}</p>
                <label className="next" htmlFor="checkbox-page2">
                  <FontAwesomeIcon icon={faArrowRight} />
                </label>
              </div>
              <div className="back-page">
                <h3 className="storyTitle">{content.mission}</h3>
                <img src={mission} className="story-image" alt="" />
                <label className="prev" htmlFor="checkbox-page2">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </label>
              </div>
            </div>

            <div className="page" id="page3">
              <div className="front-page">
                <p className="mission-paragraph">{content.content3}</p>
                <label className="next" htmlFor="checkbox-page3">
                  <FontAwesomeIcon icon={faArrowRight} />
                </label>
              </div>
              <div className="back-page">
                <h3 className="storyTitle">{content.offer}</h3>
                <img src={offer} className="story-image" alt="" />
                <label className="prev" htmlFor="checkbox-page3">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </label>
              </div>
            </div>

            <div className="page" id="page4">
              <div className="front-page">
                <ol className="offerList">
                  {contentArray.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
                <label className="next" htmlFor="checkbox-page4">
                  <FontAwesomeIcon icon={faArrowRight} />
                </label>
              </div>
              <div className="back-page">
                <p className="story-paragraph">{content.final}</p>
                <label className="prev" htmlFor="checkbox-page4">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </label>
              </div>
            </div>

            <div className="back-cover"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AboutUs;
