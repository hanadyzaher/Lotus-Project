import React, { Component } from 'react';
import './style.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerMenuItems: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/menu/2')
      .then((res) => res.json())
      .then((data) => this.setState({ footerMenuItems: data }))
      .catch((err) => console.error('Failed to fetch menu data:', err));
  }

  render() {
    const { footerMenuItems } = this.state;

    return (
      <footer className="footer">
        <ul className="footer-menu">
          {footerMenuItems.map((menuItem) => (
            <li key={menuItem.id}>
              <a href={menuItem.url} className={menuItem.class} id={menuItem.idCss}>
                {menuItem.text}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    );
  }
}

export default Footer;
