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
      account: null,
      userName: '',
      email: '',
      userExists: false
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
        const account = accounts[0];
        this.setState({ account });

        // Check if user exists
        fetch('http://localhost:3001/users/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress: account }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.exists) {
              this.setState({ userExists: true, userName: data.user.userName });
              localStorage.setItem('userId', data.user.userId); // Store user ID in local storage
            } else {
              this.setState({ userExists: false });
            }
          })
          .catch(err => console.error('Failed to check user existence:', err));
      } catch (error) {
        console.error("Failed to connect to MetaMask:", error);
      }
    } else {
      console.error("MetaMask not detected");
      alert("MetaMask not detected. Please install MetaMask and try again.");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { account, userName, email } = this.state;

    fetch('http://localhost:3001/users', {
      method: 'POST',
      body: JSON.stringify({ walletAddress: account, userName, email }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log('User saved:', data);
          this.setState({ userExists: true });
          localStorage.setItem('userId', data.userId); // Store user ID in local storage
        } else {
          console.error('Failed to save user:', data);
        }
      })
      .catch(err => console.error('Failed to save user:', err));
  };

  renderFormFields = () => {
    const { pageData } = this.state;
    const { form } = pageData;

    if (!form || !form.inputs) return null;

    return form.inputs.map((input) => (
      <div key={input.inputId}>
        <label>{input.placeholder}:</label>
        <input
          type={input.type}
          value={this.state[input.name]}
          onChange={(e) => this.setState({ [input.name]: e.target.value })}
          required
        />
      </div>
    ));
  };

  render() {
    const { pageData, account, userExists, userName } = this.state;

    if (!pageData) {
      return <div>Loading JSON Data</div>;
    }

    const { page, form } = pageData;

    return (
      <div className="signInMainDev">
        <Header />
        <h1 className="signInTitle">{page.title}</h1>
        <form className="signInForm" onSubmit={this.handleSubmit}>
          <h2 className="signInformTitle">{form.title}</h2>
          {!account && (
            <Link className="connectMetaMaskButton" onClick={this.connectMetaMask}>
              {page.Button}
            </Link>
          )}
          {account && (
            <div>
              {userExists ? (
                <>
                  <p>Welcome Back, {userName}!</p>
                  <Link to="/firstpage" className="signinButton">
                    {form.Button}
                  </Link>
                </>
              ) : (
                <>
                  {this.renderFormFields()}
                  <Link type="submit" className="signinButton">
                    {form.Button}
                  </Link>
                </>
              )}
            </div>
          )}
        </form>
        <div className="half-circle"></div>
        <Footer />
      </div>
    );
  }
}

export default SignIn;
