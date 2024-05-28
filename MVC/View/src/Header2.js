import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import './header.css';

class Header2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOpen: false,
      headerMenuItems: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/menu/4')
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
