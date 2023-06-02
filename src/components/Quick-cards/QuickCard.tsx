import React from "react";
import "./QuickCard.css";
import pic1 from "./assets/emergency.png";
import pic2 from "./assets/Plus.png";
import pic3 from "./assets/Nurse.png";
import pic4 from "./assets/First Aid Kit.png";
import { Link } from "react-router-dom";

const QuickCard: React.FC = () => {
  return (
    <div className="card-list">
      <div className="emergency bg">
        <div className="icon1">
          <img src={pic1} alt="icon" />
        </div>
        <div className="emergencyP">
          <p>Call Emergency</p>
        </div>
      </div>
      <div className="emergency bg2">
        <Link to="/findhospital">
          <div className="icon2">
            <img src={pic2} alt="icon" />
          </div>
          <div className="emergencyP">
            <p>Find a hospital</p>
          </div>
        </Link>
      </div>
      <div className="emergency bg3">
        <Link to="/askdoctor">
          <div className="icon3">
            <img src={pic3} alt="icon" />
          </div>
          <div className="emergencyP">
            <p>Talk to a doctor</p>
          </div>
        </Link>
      </div>
      <div className="emergency bg4">
        <Link to="/firstaid">
          <div className="icon2">
            <img src={pic4} alt="icon" />
          </div>
          <div className="emergencyP">
            <p>First aid for kids</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default QuickCard;
