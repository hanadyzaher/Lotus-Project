import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "./SignUp.css";
import Header from "./Header";

const iconMapping = {
  faUser: faUser,
  faGoogle: faGoogle,
  faEnvelope: faEnvelope,
  faKey: faKey,
  faEye: faEye,
  faEyeSlash: faEyeSlash,
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      showPassword: false,
      passIconIndex: 2,
      homePage: null,
      form: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/pages/3')
      .then((res) => res.json())
      .then((data) => this.setState({ homePage: data }))
      .catch((err) => console.error('Failed to fetch page data:', err));

    fetch('http://localhost:3001/forms/2')
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
    const { name, email, password, showPassword, passIconIndex, homePage, form } = this.state;

    if (!homePage || !form) {
      return <div>Loading...</div>;
    }

    return (
      <div className="signUpMain">
        <Header />
        <h1 className="signUpTitle">{homePage.title}</h1>
        <form className="signUpForm">
          <h2 className="signUpformTitle">{form.title}</h2>
          <div>
            <a href="#" className="googleIconSignUp">
              <i>
                <FontAwesomeIcon
                  icon={iconMapping[form.googleIcon]}
                  style={{ color: "#724C14" }}
                />
              </i>
            </a>
          </div>
          <h1 className="signUpText">{form.text}</h1>
          <div className="inputs">
            <div className="inputContainer">
              <FontAwesomeIcon
                icon={iconMapping[form.inputs.nameInput.icon]}
                className="icon"
              />
              <input
                type={form.inputs.nameInput.type}
                name="name"
                value={name}
                placeholder={form.inputs.nameInput.placeholder}
                onChange={this.handleChange}
              />
            </div>
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
          <button type="submit" className="signUpButton">
            {form.signUnButton}
          </button>
          <Link to="/signin" className="login">{form.text2}</Link>
        </form>
        <div className="half-circle-signup"></div>
      </div>
    );
  }
}

export default SignUp;
