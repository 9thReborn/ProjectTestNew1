import { useState } from "react";
import "./LandingPage3.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const LandingPageThree: React.FC = () => {
  const names = [
    {
      name: "Adekola1 Johnson",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget ipsum, sed praesent. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      name: "Adekola2 Johnson",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget ipsum, sed praesent. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      name: "Adekola3 Johnson",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget ipsum, sed praesent. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      name: "Adekola4 Johnson",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget ipsum, sed praesent. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      name: "Adekola5 Johnson",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget ipsum, sed praesent. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      name: "Adekola6 Johnson",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget ipsum, sed praesent. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      name: "Adekola7 Johnson",
      info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget ipsum, sed praesent. Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
  ];

  const [cardIndex, setCardIndex] = useState(0);

  const showNextCards = () => {
    if (cardIndex + 3 < names.length) {
      setCardIndex(cardIndex + 1);
    } else {
      setCardIndex(0);
    }
  };

  const showPreviousCards = () => {
    if (cardIndex - 1 >= 0) {
      setCardIndex(cardIndex - 1);
    } else {
      setCardIndex(names.length - 3);
    }
  };

  return (
    <div className="carousel-container">
      <h1 className="landingPageHeader">Hear what our customers are saying</h1>
      <p className="landingPageParagraph">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget
        ipsum, sed praesent.
      </p>

      <div className="carousel-cards">
        <button className="carousel-button" onClick={showPreviousCards}>
          <GrFormPrevious className="carousel-icon" />
        </button>

        {names.slice(cardIndex, cardIndex + 3).map((element, index) => (
          <CardBoard
            key={index}
            name={element.name}
            information={element.info}
            isActive={index === 1}
          />
        ))}

        <button className="carousel-button" onClick={showNextCards}>
          <GrFormNext className="carousel-icon" />
        </button>
      </div>
    </div>
  );
};

type CardProps = {
  name: string;
  information: string;
  isActive: boolean;
};

const CardBoard: React.FC<CardProps> = ({ name, information, isActive }) => {
  return (
    <div className={`carousel-card-container ${isActive ? "card-active" : ""}`}>
      <center>
        <p>{name}</p>
        <p>{information}</p>
      </center>
    </div>
  );
};

export default LandingPageThree;
