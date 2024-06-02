import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import './header.css';
import logo from './images/logo2.png';


class Header2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOpen: false,
      headerMenuItems: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/menu/4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ headerMenuItems: data }))
      .catch((err) => console.error('Failed to fetch menu data:', err));
  }

  handleToggleOpen = () => {
    this.setState((prevState) => ({
      isToggleOpen: !prevState.isToggleOpen
    }));
  };

  render() {
    const { isToggleOpen, headerMenuItems } = this.state;

    return (
      <header className="styled-header">
        <div className="nav_logo">
        <img src={logo} className="logo-image" alt=""></img>
          <Link to="/" className="nav-logo-link">
            ArtVista
          </Link>
        </div>

        <ul className={`nav-menu ${isToggleOpen ? "open" : ""}`}>
          {headerMenuItems.map((menuItem, index) => (
            <li key={index}>
              <Link to={menuItem.url} className="nav-menu-list">
                {menuItem.text}
              </Link>
            </li>
          ))}
        </ul>
        <FaBars className="menuToggleBtn" onClick={this.handleToggleOpen} />
      </header>
    );
  }
}

export default Header2;
