import React, { Component } from "react"; // Importing React and the Component class from the React library
import "./bookFlip.css"; // Importing the CSS file for styling the book flip component
import Header from './Header'; // Importing the Header component
import Footer from './Footer'; // Importing the Footer component
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Importing specific icons from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing the FontAwesomeIcon component
import logo from './images/logo2.png'; // Importing the logo image
import aboutus from './images/aboutus.png'; // Importing the about us image
import story from './images/story.png'; // Importing the story image
import mission from './images/mission.png'; // Importing the mission image
import offer from './images/offer.png'; // Importing the offer image

class AboutUs extends Component { // Defining the AboutUs class component
  constructor(props) {
    super(props); // Calling the parent class constructor
    this.state = {
      aboutUsPage: null, // Initializing state with aboutUsPage set to null
    };
  }

  componentDidMount() { // Lifecycle method that runs after the component is mounted
    fetch('http://localhost:3001/pages/2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }) // Fetching data from the server
      .then((res) => res.json()) // Parsing the response as JSON
      .then((data) => this.setState({ aboutUsPage: data })) // Updating the state with the fetched data
      .catch((err) => console.error('Failed to fetch page data:', err)); // Handling any errors that occur during the fetch
  }

  render() { // Render method to display the component
    const { aboutUsPage } = this.state; // Destructuring the aboutUsPage state

    if (!aboutUsPage) { // If aboutUsPage is null (data hasn't loaded yet)
      return <div>Loading JSON Data</div>; // Display a loading message
    }

    return ( // Returning the JSX to render the component
      <div>
        <Header /> {/* Rendering the Header component */}
        <div className="book-flip-container"> {/* Container for the book flip effect */}
          <input type="checkbox" id="checkbox-cover" /> {/* Checkbox for the cover state */}
          <input type="checkbox" id="checkbox-page1" /> {/* Checkbox for the first page state */}
          <input type="checkbox" id="checkbox-page2" /> {/* Checkbox for the second page state */}
          <input type="checkbox" id="checkbox-page3" /> {/* Checkbox for the third page state */}
          <input type="checkbox" id="checkbox-page4" /> {/* Checkbox for the fourth page state */}

          <div className="book"> {/* Main book container */}
            <div className="cover"> {/* Cover of the book */}
              <label htmlFor="checkbox-cover"> {/* Label that controls the cover checkbox */}
                <div className="cover-content"> {/* Content inside the cover */}
                  <h2 className="welcomeLabel">Welcome To</h2> {/* Welcome text */}
                  <h1 className="bookTitle">ArtVista</h1> {/* Book title */}
                  <img src={logo} className="about-logo-image" alt="" /> {/* Logo image */}
                  <p>Click to open</p> {/* Instruction text */}
                </div>
              </label>
            </div>

            <div className="page" id="page1"> {/* First page of the book */}
              <div className="front-page"> {/* Front side of the first page */}
                <h1 className="fpageTitle">{aboutUsPage.title}</h1> {/* Title from JSON data */}
                <img src={aboutus} className="about-image" alt="" /> {/* About us image */}
                <label className="next" htmlFor="checkbox-page1"> {/* Label to go to the next page */}
                  <FontAwesomeIcon icon={faArrowRight} /> {/* Right arrow icon */}
                </label>
              </div>
              <div className="back-page"> {/* Back side of the first page */}
                <h3 className="storyTitle">{aboutUsPage.story}</h3> {/* Story title from JSON data */}
                <img src={story} className="story-image" alt="" /> {/* Story image */}
                <label className="prev" htmlFor="checkbox-page1"> {/* Label to go back to the previous page */}
                  <FontAwesomeIcon icon={faArrowLeft} /> {/* Left arrow icon */}
                </label>
              </div>
            </div>

            <div className="page" id="page2"> {/* Second page of the book */}
              <div className="front-page"> {/* Front side of the second page */}
                <p className="story-paragraph">{aboutUsPage.content2}</p> {/* Content from JSON data */}
                <label className="next" htmlFor="checkbox-page2"> {/* Label to go to the next page */}
                  <FontAwesomeIcon icon={faArrowRight} /> {/* Right arrow icon */}
                </label>
              </div>
              <div className="back-page"> {/* Back side of the second page */}
                <h3 className="storyTitle">{aboutUsPage.mission}</h3> {/* Mission title from JSON data */}
                <img src={mission} className="story-image" alt="" /> {/* Mission image */}
                <label className="prev" htmlFor="checkbox-page2"> {/* Label to go back to the previous page */}
                  <FontAwesomeIcon icon={faArrowLeft} /> {/* Left arrow icon */}
                </label>
              </div>
            </div>

            <div className="page" id="page3"> {/* Third page of the book */}
              <div className="front-page"> {/* Front side of the third page */}
                <p className="mission-paragraph">{aboutUsPage.content3}</p> {/* Content from JSON data */}
                <label className="next" htmlFor="checkbox-page3"> {/* Label to go to the next page */}
                  <FontAwesomeIcon icon={faArrowRight} /> {/* Right arrow icon */}
                </label>
              </div>
              <div className="back-page"> {/* Back side of the third page */}
                <h3 className="storyTitle">{aboutUsPage.offer}</h3> {/* Offer title from JSON data */}
                <img src={offer} className="story-image" alt="" /> {/* Offer image */}
                <label className="prev" htmlFor="checkbox-page3"> {/* Label to go back to the previous page */}
                  <FontAwesomeIcon icon={faArrowLeft} /> {/* Left arrow icon */}
                </label>
              </div>
            </div>

            <div className="page" id="page4"> {/* Fourth page of the book */}
              <div className="front-page"> {/* Front side of the fourth page */}
                <ol className="offerList"> {/* Ordered list for the offer details */}
                  <li>{aboutUsPage.content4.array[0]}</li> {/* List item from JSON data */}
                  <li>{aboutUsPage.content4.array[1]}</li> {/* List item from JSON data */}
                  <li>{aboutUsPage.content4.array[2]}</li> {/* List item from JSON data */}
                  <li>{aboutUsPage.content4.array[3]}</li> {/* List item from JSON data */}
                </ol>
                <label className="next" htmlFor="checkbox-page4"> {/* Label to go to the next page */}
                  <FontAwesomeIcon icon={faArrowRight} /> {/* Right arrow icon */}
                </label>
              </div>
              <div className="back-page"> {/* Back side of the fourth page */}
                <p className="story-paragraph">{aboutUsPage.final}</p> {/* Final paragraph from JSON data */}
                <label className="prev" htmlFor="checkbox-page4"> {/* Label to go back to the previous page */}
                  <FontAwesomeIcon icon={faArrowLeft} /> {/* Left arrow icon */}
                </label>
              </div>
            </div>

            <div className="back-cover"></div> {/* Back cover of the book */}
          </div>
        </div>
        <Footer /> {/* Rendering the Footer component */}
      </div>
    );
  }
}

export default AboutUs; // Exporting the AboutUs component as the default export
