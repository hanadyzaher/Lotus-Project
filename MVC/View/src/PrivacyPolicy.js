import React, { Component } from 'react';
import './style.css';
import Header from './Header';
import Footer from './Footer';

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/pages/7')
      .then(response => response.json())
      .then(data => this.setState({ pageData: data }))
      .catch(error => console.error('Error fetching page data:', error));
  }

  render() {
    const { pageData } = this.state;

    if (!pageData) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Header />
        <div className="privacy-policy-container">
          <h1>{pageData.title}</h1>
          <p>{pageData.content}</p>
          {pageData.sections && pageData.sections.map((section, index) => (
            <div key={index}>
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default PrivacyPolicy;
