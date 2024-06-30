import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faMessage } from "@fortawesome/free-solid-svg-icons";
import "./contactUs.css";
import { Link } from "react-router-dom";
import contactImage from "./images/contactus.jpg"; // Adjust the path as necessary
import Footer from "./Footer";
import Header from "./Header";

const iconMapping = {
  faUser: faUser,
  faEnvelope: faEnvelope,
  faMessage: faMessage,
};

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        fnameInput: "",
        lnameinput: "",
        emailInput: "",
        messageInput: ""
      },
      contactusPage: null,
      form: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/data/4', {
      method: 'POST',
     
    })  // Fetch combined data from the new endpoint
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => { throw err });
        }
        return res.json();
      })
      .then((data) => {
        const { page, form } = data;
        this.setState({ contactusPage: page, form });
      })
      .catch((err) => console.error('Failed to fetch page data:', err));  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formValues: {
        ...prevState.formValues,
        [name]: value,
      }
    }));
  };

  render() {
    const { contactusPage, form, formValues } = this.state;


    if (!contactusPage || !form) {
      return <div>Loading JSON Data</div>;
    }

    return (
      <div>
        <Header />
        <div className="contactUsContainer">
          <div className="contactUsImageContainer">
            <img src={contactImage} alt="Contact Us" className="contactUsImage" />
          </div>
          <div className="contactUsFormContainer">
            <h1 className="contactUsTitle">{contactusPage.title}</h1>
            {
              <form className="contactUsForm">
                <div className="contactUsInputs">
                  {Object.keys(form.inputs).map((key) => (
                    <div 
                      className={`contactUsInputContainer ${key === "messageInput" ? "contactUsInputContainerMessage" : ""}`} 
                      key={key}
                    >
                      <FontAwesomeIcon
                        icon={iconMapping[form.inputs[key].icon]}
                        className="contactsIcon"
                      />
                      <input
                        type={form.inputs[key].type}
                        name={key}
                        value={formValues[key]}
                        placeholder={form.inputs[key].placeholder}
                        onChange={this.handleChange}
                        className={key === "messageInput" ? "messageInput" : ""}
                      />
                    </div>
                  ))}
                </div>
                <Link to=" " className="sendMessage">
                  {form.Button}
                </Link>
              </form>
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ContactUs;
