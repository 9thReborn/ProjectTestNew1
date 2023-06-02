import React from "react";
import { HiBell } from "react-icons/hi";
// import { RxAvatar } from "react-icons/rx";
import "./Header.css";
import avatar from "../../assets/Ellipse 134.png";

interface HeaderProps {
  headerText: string;
  createBtn: any;
}

const Header1: React.FC<HeaderProps> = ({ headerText, createBtn }) => {
  return (
    <div className="header-container1">
      <header className="header1">
        <div className="header-text1">{headerText}</div>
        {createBtn}
        <div className="header-icons1">
          <span className="bell-icon">
            <HiBell size={30} />
          </span>
          <span className="avatar-icon">
            <img src={avatar} alt="avatar" />
            {/* <RxAvatar size={30} /> */}
          </span>
        </div>
      </header>
    </div>
  );
};

export default Header1;
