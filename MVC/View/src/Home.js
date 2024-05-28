import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homepage: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/pages/6')
      .then(response => response.json())
      .then(data => this.setState({ homepage: data }))
      .catch(error => console.error('Error fetching page data:', error));
  }

  render() {
    const { homepage } = this.state;

    if (!homepage) {
      return <div>Page not found</div>;
    }

    return (
      <div className="homeContainer">
        <div className="homeContentContainer">
          <h1 className="homeTitle">{homepage.title}</h1>
          <p className='homeDescription'>{homepage.content}</p>
          <div className="homeButtons">
            <Link to="/signup" className="homeButton">{homepage.signupButton}</Link>
            <Link to="/signin" className="homeButton">{homepage.signinButton}</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
