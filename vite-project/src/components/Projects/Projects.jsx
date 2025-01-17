import React from "react";

import styles from "./Projects.module.css";

import projects from "../../data/projects.json";

export const Projects = () => {
  return (
    <section className={styles.container} id="projects">
      <h1 className={styles.tags}>&lt;div className = projects&gt;</h1>
        <ul className={styles.projects}>
          {projects.map((projectItem, id) => {
            return (
              <li key={id} className={styles.projectItem}>
                <div className={styles.projectItemDetails}>
                  <h1 className={styles.name}>{projectItem.title}</h1>
                  <p>Skills: {projectItem.skills}</p>
                  <h1 className={styles.description}>{projectItem.description}</h1>
                </div>
              </li>
            );
          })}
        </ul>
      <h1 className={styles.tags}>&lt;/div&gt;</h1>
    </section>
  );
};
