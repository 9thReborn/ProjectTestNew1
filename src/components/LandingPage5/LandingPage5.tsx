import * as React from "react";
import landing5Style from "./landing5.module.css";

function LandingPageFive() {
  return (
    <div>
      <div className={landing5Style.main}>
        <div className={landing5Style.container}>
          <div className={landing5Style.information}>
            <div className={landing5Style.bar}></div>
            <div className={landing5Style.info}>
              <p className={landing5Style.header}>
                Emergency help at the touch of a button.
              </p>
              <p className={landing5Style.parag}>
                in three simple steps, get the professional help you need.
              </p>
            </div>
          </div>
        </div>
        <div className={landing5Style.cards}>
          <section className={landing5Style.login}>
            <img src="../Login.png" alt="auth" />
            <a href="/signup">Login or Register</a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada
              quam malesuada in ultrices augue ac maecenas.
            </p>
          </section>

          <section className={landing5Style.book}>
            <img src="../Dashboard.png" alt="auth" />
            <a href="#">Book a session</a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada
              quam malesuada in ultrices augue ac maecenas.
            </p>
          </section>

          <section className={landing5Style.talk}>
            <img src="../Spinning.png" alt="auth" />
            <a href="#">Talk to a Doctor</a>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada
              quam malesuada in ultrices augue ac maecenas.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LandingPageFive;
