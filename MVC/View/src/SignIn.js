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
      email: "",
      password: "",
      showPassword: false,
      passIconIndex: 2, // Index of the icon to show in password input
      homePage: null,
      form: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/pages/1')
      .then((res) => res.json())
      .then((data) => this.setState({ homePage: data }))
      .catch((err) => console.error('Failed to fetch page data:', err));

    fetch('http://localhost:3001/forms/1')
      .then((res) => res.json())
      .then((data) => this.setState({ form: data }))
      .catch((err) => console.error('Failed to fetch form data:', err));
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
    const { email, password, showPassword, passIconIndex, homePage, form } = this.state;

    if (!homePage || !form) {
      return <div>Loading...</div>;
    }

    return (
      <div className="signInMainDev">
        <Header />
        <h1 className="signInTitle">{homePage.title}</h1>
        <form className="signInForm">
          <h2 className="signInformTitle">{form.title}</h2>
          <div>
            <a href="#" className="googleIcon">
              <i>
                <FontAwesomeIcon
                  icon={iconMapping[form.googleIcon]}
                  style={{ color: "#724C14" }}
                />
              </i>
            </a>
          </div>
          <h1 className="signInText">{form.text}</h1>
          <div className="inputs">
            <div className="inputContainer">
              <FontAwesomeIcon
                icon={iconMapping[form.inputs.emailInput.icon]}
                className="icon"
              />
              <input
                type={form.inputs.emailInput.type}
                name="email"
                value={email}
                placeholder={form.inputs.emailInput.placeholder}
                onChange={this.handleChange}
              />
            </div>
            <div className="inputContainer">
              <FontAwesomeIcon
                icon={iconMapping[form.inputs.passInput.icons[0]]}
                className="icon"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                placeholder={form.inputs.passInput.placeholder}
                onChange={this.handleChange}
              />
              <FontAwesomeIcon
                icon={iconMapping[form.inputs.passInput.icons[passIconIndex]]}
                onClick={this.togglePassIcon}
                className="password-icon"
              />
            </div>
          </div>

          <a href="#" className="forgetPass">
            {form.forgotPass}
          </a>
          <Link to="/firstpage" className="signinButton">
            {form.signinButton}
          </Link>
          <Link to="/signup" className="register">{form.text2}</Link>
        </form>
        <div className="half-circle"></div>
      </div>
    );
  }
}

export default SignIn;
