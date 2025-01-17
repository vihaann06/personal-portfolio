import React from "react";

import styles from "./Experience.module.css";

export const Experience = () => {
  return (
    <section className={styles.container} id="experience">
      <h1 className={styles.tags}>&lt;div className = experience&gt;</h1>
        <ul className={styles.history}>
              <li className={styles.historyItem}>
                <div className={styles.historyItemDetails}>
                  <h3>Software Engineering Intern, Avalon Infosys</h3>
                  <p>June 2024 - Aug 2024</p>
                  <ul>
                      <li>Contributed towards 3wmaps, a mobile app that helps locate schools in third world countries</li>
                      <li>Increased data accessibility for key metrics like gender-ratio and teacher-student ratio by 30%</li>
                  </ul>
                </div>
              </li>
              <li className={styles.historyItem}>
                <div className={styles.historyItemDetails}>
                  <h3>Software Engineering Intern, SMVDU Narayana Hospital</h3>
                  <p>Jul 2024 - Aug 2024</p>
                  <ul>
                      <li>Developed an algorithm to keep track of vacant beds and oxygen during the pandemic reducing emergency response time by 20%.</li>
                      <li>Maintained database of the oxygen availability in the COVID-19 wards and Operation Theatres.</li>
                  </ul>
                </div>
              </li>
        </ul>
      <h1 className={styles.tags}>&lt;/div&gt;</h1>
    </section>
  );
};
