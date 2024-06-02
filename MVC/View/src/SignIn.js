import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "./SignIn.css";
import Header from "./Header";

const iconMapping = {
  faGoogle: faGoogle,
  faEnvelope: faEnvelope,
  faKey: faKey,
  faEye: faEye,
  faEyeSlash: faEyeSlash,
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      passIconIndex: 2, // Index of the icon to show in password input
      pageData: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/data/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => { throw err; });
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ pageData: data });
      })
      .catch((err) => console.error('Failed to fetch page data:', err));
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  togglePassIcon = () => {
    this.setState((prevState) => ({
      passIconIndex: prevState.passIconIndex === 1 ? 2 : 1,
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const { showPassword, passIconIndex, pageData } = this.state;

    if (!pageData) {
      return <div>Loading...</div>;
    }

    const { page, form } = pageData;

    return (
      <div className="signInMainDev">
        <Header />
        <h1 className="signInTitle">{page.title}</h1>
          <form className="signInForm">
            <h2 className="signInformTitle">{form.title}</h2>
            <h1 className="signInText">{form.text}</h1>
            <Link to="/firstpage" className="signinButton">
              {form.signinButton}
            </Link>
          </form>
        
        <div className="half-circle"></div>
      </div>
    );
  }
}

export default SignIn;
