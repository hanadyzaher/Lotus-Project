import React, { Component } from "react";
import Web3 from "web3";

import { Link } from "react-router-dom";
import "./SignIn.css";
import Header from "./Header";
import Footer from "./Footer";



class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: null,
      account: null, // For MetaMask account
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

  connectMetaMask = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.setState({ account: accounts[0] });
        console.log("Connected account:", accounts[0]);
      } catch (error) {
        console.error("Failed to connect to MetaMask:", error);
      }
    } else {
      console.error("MetaMask not detected");
      alert("MetaMask not detected. Please install MetaMask and try again.");
    }
  };



  render() {
    const {pageData, account } = this.state;

    if (!pageData) {
      return <div>Loading JSON Data</div>;
    }

    const { page, form } = pageData;

    return (
      <div className="signInMainDev">
        <Header />
        <h1 className="signInTitle">{page.title}</h1>
        <form className="signInForm">
          <h2 className="signInformTitle">{form.title}</h2>
          <h1 className="signInText">{form.text}</h1>
          {account ? (
            <div>
              <p>Connected Account: {account}</p>
            </div>
          ) : (
            <button type="button" className="connectMetaMaskButton" onClick={this.connectMetaMask}>
              Connect to MetaMask
            </button>
          )}
          <Link to="/firstpage" className="signinButton">
            {form.signinButton}
          </Link>
        </form>
        <div className="half-circle"></div>
        <Footer/>
      </div>
    );
  }
}

export default SignIn;
