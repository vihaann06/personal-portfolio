import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector(`.${styles.navbar}`).offsetHeight;
      const elementPosition = element.offsetTop;
      window.scrollTo({
        top: elementPosition - navbarHeight - 50, 
        behavior: "smooth", 
      });
    }
  };

  return (
    <nav className={styles.navbar}>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="Navbar decoration"
        className={styles.navbarImage}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/closeIcon.png")
              : getImageUrl("nav/menuIcon.png")
          }
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a
              href="#experience"
              onClick={(e) => handleScroll(e, "experience")}
              className={styles.navLink}
            >
              Experience
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, "projects")}
              className={styles.navLink}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "contact")}
              className={styles.navLink}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
