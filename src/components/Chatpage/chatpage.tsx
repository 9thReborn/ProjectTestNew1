import React from "react";
import "./chatpage.css";
import arrowImage from "./assets/arrow-up.png";
import userImage from "./assets/userImage.png";
import doctorImage from "./assets/doctorImage.png";

interface ChatsPageProps {
  user: {
    username: string;
    secret: string;
  };
}

const ChatsPage: React.FC<ChatsPageProps> = () => {
  return (
    <section className="msger">
      <main className="msger-chat">
        <div className="msg left-msg">
          <div
            className="msg-img"
            style={{
              backgroundImage: `url(${userImage})`, // Use the local image file
            }}
          />
          <div className="msg-bubble">
            <div className="msg-text">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. It is a
              long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout.{" "}
            </div>
          </div>
        </div>
        <div className="msg right-msg">
          <div
            className="msg-img"
            style={{
              backgroundImage: `url(${doctorImage})`,
            }}
          />
          <div className="msg-bubble">
            <div className="msg-text">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. It is a
              long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout.{" "}
            </div>
          </div>
        </div>
        <div className="msg left-msg">
          <div
            className="msg-img"
            style={{
              backgroundImage: `url(${userImage})`, // Use the local image file
            }}
          />
          <div className="msg-bubble">
            <div className="msg-text">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. It is a
              long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout.{" "}
            </div>
          </div>
        </div>
        <div className="msg right-msg">
          <div
            className="msg-img"
            style={{
              backgroundImage: `url(${doctorImage})`,
            }}
          />
          <div className="msg-bubble">
            <div className="msg-text">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. It is a
              long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout.{" "}
            </div>
          </div>
        </div>
        <div className="msg left-msg">
          <div
            className="msg-img"
            style={{
              backgroundImage: `url(${userImage})`, // Use the local image file
            }}
          />
          <div className="msg-bubble">
            <div className="msg-text">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. It is a
              long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout.{" "}
            </div>
          </div>
        </div>
        <div className="msg right-msg">
          <div
            className="msg-img"
            style={{
              backgroundImage: `url(${doctorImage})`,
            }}
          />
          <div className="msg-bubble">
            <div className="msg-text">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. It is a
              long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout.{" "}
            </div>
          </div>
        </div>
      </main>
      <form className="msger-inputarea">
        <div>
          <input
            type="text"
            className="msger-input"
            placeholder="Type your question here"
          />
          <img className="imageArrow" src={arrowImage} alt="Arrow-up" />
        </div>
      </form>
    </section>
  );
};

export default ChatsPage;
