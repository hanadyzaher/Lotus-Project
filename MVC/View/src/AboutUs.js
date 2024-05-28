import React, { Component } from "react";
import "./style.css";
import Header from './Header';
import Footer from './Footer';

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUsPage: null,
      error: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/pages/2')
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => { throw err });
        }
        return res.json();
      })
      .then((data) => this.setState({ aboutUsPage: data }))
      .catch((err) => this.setState({ error: err.error }));
  }

  render() {
    const { aboutUsPage, error } = this.state;

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!aboutUsPage) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Header />

        <div className="aboutUsDiv">
          <h1 className="aboutUsTitle">{aboutUsPage.title}</h1>
          <h1 className="titleCont1">{aboutUsPage.h1}</h1>
          <p className="content1">{aboutUsPage.content1}</p>
          <h3 className="titleCont2">{aboutUsPage.story}</h3>
          <p className="content2">{aboutUsPage.content2}</p>
          <h3 className="titleCont3">{aboutUsPage.mission}</h3>
          <p className="content3">{aboutUsPage.content3}</p>
          <h3 className="titleCont4">{aboutUsPage.offer}</h3>
          <table className="aboutUsTable">
            <tbody>
              <tr>
                <td className="content4">{aboutUsPage.content4.array[0]}</td>
                <td className="content4">{aboutUsPage.content4.array[1]}</td>
              </tr>
              <tr>
                <td className="content4">{aboutUsPage.content4.array[2]}</td>
                <td className="content4">{aboutUsPage.content4.array[3]}</td>
              </tr>
            </tbody>
          </table>

          <p className="finalCont">{aboutUsPage.final}</p>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AboutUs;
