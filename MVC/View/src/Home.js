import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';
import logo from './images/LOGO.png';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homepage: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/pages/6', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => this.setState({ homepage: data }))
      .catch(error => console.error('Error fetching page data:', error));
  }

  render() {
    const { homepage } = this.state;

    if (!homepage) {
      return <div>Loading JSON Data</div>;
    }

    return (
      <div className="homeContainer">
        <div className="homeContentContainer">
          <h1 className="homeTitle">{homepage.title}</h1>
          <img src={logo} className='homeLogo' alt="Logo"></img>
          <p className='homeDescription'>{homepage.content}</p>
          <div className="homeButtons">
            <Link to="/signin" className="homeButton">{homepage.signinButton}</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
