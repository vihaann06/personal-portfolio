import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container} id="hero">
      <h1 className={styles.tags}> &lt;div className = aboutMe&gt; </h1><br />
      <div className={styles.topSection}>
        <h1 className={styles.title}> Hi, I'm Vihaan</h1>
      </div>
      <div className={styles.bottomSection}>
        <p className={styles.description}>
          I'm a college sophomore studying CS and Philosophy.
          I love human-centered products that
          impact society in a positive way.
          I have over 3 years of experience in web/app development and a
          passion for developing efficient systems and crafting creative designs.
        </p>
        <a href="mailto:vihaangupta@college.harvard.edu" className={styles.contactBtn}>
          Contact Me
        </a>
        <h1 className={styles.tags}> &lt;/div&gt; </h1>
      </div>
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
