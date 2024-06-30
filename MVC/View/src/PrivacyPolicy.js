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
    fetch('http://localhost:3001/pages/7', {
      method: 'POST',
      
    })
      .then(response => response.json())
      .then(data => this.setState({ pageData: data }))
      .catch(error => console.error('Error fetching page data:', error));
  }

  render() {
    const { pageData } = this.state;

    if (!pageData) {
      return <div>Loading JSON Data</div>;
    }

    // Parse the content4 field correctly
    let contentArray = [];
    if (pageData.content4) {
      contentArray = pageData.content4.split('|||').map(section => {
        const parts = section.split(':');
        return {
          title: parts[0].trim(),
          content: parts.slice(1).join(':').trim()
        };
      });
    }

    return (
      <div>
        <Header />
        <div className="privacy-policy-container">
          <div className="privacy-sidebar">
            <h3>Contents: </h3>
            <ul>
              {contentArray.map((section, index) => (
                <li key={index}>
                  <a href={`#section-${index}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="privacy-content">
            <h1>{pageData.title}</h1>
            <p>{pageData.content1}</p>
            {contentArray.map((section, index) => (
              <div key={index} id={`section-${index}`}>
                <h2>{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PrivacyPolicy;
