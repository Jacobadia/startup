import React from 'react';
import './about.css';

export function About() {
  return (
    <main>
      <h1>What is the TTRPG Inventory?</h1>
      <div className="content-wrapper">
        <div className="description">
          <p>The TTRPG Inventory Manager is a web-based tool inspired by the Resident Evil 4 inventory system, designed to enhance tabletop role-playing games (TTRPGs). It provides players with a visual, intuitive way to manage and organize their in-game items, allowing them to optimize limited inventory space and keep track of everything they carry. With its drag-and-drop functionality, users can easily arrange weapons, equipment, and items within a grid-based layout, making it ideal for a wide range of TTRPG campaigns.</p>
          
          <p>I developed the TTRPG Inventory Manager as a portfolio project to demonstrate my expertise in HTML, CSS, and JavaScript. This project showcases my ability to create engaging, interactive web applications with responsive design, featuring dynamic layouts and smooth drag-and-drop interactivity. By merging creativity with practical problem-solving, this tool not only serves TTRPG players but also highlights my technical skills for potential employers and collaborators.</p>
        </div>
        <div className="image-container">
          <img alt="Suitcase_Wall" src="Suitcase_Wall.jpg" width="300" />
        </div>
      </div>
    </main>
  );
}