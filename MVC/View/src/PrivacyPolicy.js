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
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
          <div className="privacy-sidebar">
            <h3>On This Page</h3>
            <ul>
              {pageData.sections.map((section, index) => (
                <li key={index}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="privacy-content">
            <h1>{pageData.title}</h1>
            <p>{pageData.content}</p>
            {pageData.sections && pageData.sections.map((section, index) => (
              <div key={index} id={section.id}>
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
