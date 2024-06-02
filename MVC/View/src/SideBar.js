import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBars, faImage, faUser, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { Link, Outlet } from 'react-router-dom';
import logo from './images/logo2.png';

const iconMapping = {
  faImage: faImage,
  faUser: faUser,
  faClockRotateLeft: faClockRotateLeft,
  faHouse: faHouse,
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      sideBarMenuItems: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/menu/3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ sideBarMenuItems: data }))
      .catch((err) => console.error('Failed to fetch menu data:', err));
  }

  toggle = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { isOpen, sideBarMenuItems } = this.state;

    return (
      <div className="container">
        <div style={{ width: isOpen ? '200px' : '50px' }} className="sidebar">
          <div className="top_section">
            <img src = {logo} style={{ display: isOpen ? 'block' : 'none' }} className="SideBarlogo"></img>
            <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className="bars">
              <FontAwesomeIcon icon={faBars} onClick={this.toggle} style={{ color: "#f6cfa0", position: "relative", justifyItems: "center" }} />
            </div>
          </div>
          {sideBarMenuItems.map((item, index) => (
            <Link key={index} to={item.url} className="link">
              <div className="icons">
                <FontAwesomeIcon icon={iconMapping[item.icon]} style={{ color: "#f6cfa0" }} />
              </div>
              <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">{item.text}</div>
            </Link>
          ))}
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    );
  }
}

export default Sidebar;
