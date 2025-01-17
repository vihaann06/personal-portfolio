import React from "react";

import styles from "./Projects.module.css";

export const Projects = () => {
  return (
    <section className={styles.container} id="projects">
      <h1 className={styles.tags}>&lt;div className = projects&gt;</h1>
        <ul className={styles.projects}>
              <li className={styles.projectItem}>
                <div className={styles.projectItemDetails}>
                  <h1 className={styles.name}>Prodspace</h1>
                  <p>Skills: React, NodeJS, JSON</p>
                  <h1 className={styles.description}>Developed a productivity-enhancing web application using React with features like habit tracker, calendar, etc. Added elements of Gamification like streaks and friends list to maintain a 30-day user retention of 25%. Active Users from over 63 countries within two years of its lifetime.</h1>
                </div>
              </li>
              <li className={styles.projectItem}>
                <div className={styles.projectItemDetails}>
                  <h1 className={styles.name}>FitLit</h1>
                  <p>Skills: Flutter, Firebase</p>
                  <h1 className={styles.description}>Developed a fitness and habit tracking mobile app. Provides features including calorie tracker, workout planner, and activity logger. Currently working on adding AI Image recognition to facilitate calorie tracking.</h1>
                </div>
              </li>
        </ul>
      <h1 className={styles.tags}>&lt;/div&gt;</h1>
    </section>
  );
};
