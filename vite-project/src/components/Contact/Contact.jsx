import React from "react";

import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <h1 className={styles.tags}>&lt;div className = contact&gt;</h1>
      <h2>To connect, reach out via any platform and I'd be happy to chat!</h2>
      <ul className={styles.links}>
        <li className={styles.link}>
          <a href="vihaangupta@college.harvard.edu" aria-label="Email">
            <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
          </a>
        </li>
        <li className={styles.link}>
          <a href="www.linkedin.com/in/vihaan-gupta-1595332a7" aria-label="LinkedIn">
            <img
              src={getImageUrl("contact/linkedinIcon.png")}
              alt="LinkedIn icon"
            />
          </a>
        </li>
        <li className={styles.link}>
          <a href="https://www.instagram.com/vihaangupta14" aria-label="Instagram">
            <img
              src={getImageUrl("contact/instagramIcon.webp")}
              alt="Instagram icon"
            />
          </a>
        </li>
        <li className={styles.link}>
          <a href="x.com/2phon3babyk33m" aria-label="X">
            <img
              src={getImageUrl("contact/xIcon.png")}
              alt="X"
            />
          </a>
        </li>
      </ul>
      <h1 className={styles.tags}>&lt;/div&gt;</h1>
    </footer>
  );
};
