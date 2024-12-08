import React, { useState, useEffect } from 'react';
import './about.css';

export function About() {
  const [funFact, setFunFact] = useState('Loading...');
  const [artImage, setArtImage] = useState(null);

  useEffect(() => {
    // Fetch a random image from Picsum Photos API
    fetch('https://picsum.photos/v2/list?page=1&limit=30')  // Fetch a list of random images (30 per page)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Debug API response
        if (data && data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const selectedImage = data[randomIndex];
          console.log(selectedImage); // Debug selected image
          setArtImage(selectedImage.download_url); // Set the download URL of the image
        } else {
          console.error('No images found');
          setArtImage(null); // Handle missing images gracefully
        }
      })
      .catch((error) => {
        console.error('Error fetching image from Picsum:', error);
        setArtImage(null); // Handle API failure
      });

    // Fetch fun fact
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the fun fact response
        setFunFact(data.text || 'No fun fact available');
      })
      .catch((error) => {
        console.error('Error fetching fun fact:', error);
        setFunFact('Sorry, we couldn\'t fetch a fun fact right now.');
      });
  }, []);

  return (
    <main>
      <h1>What is the TTRPG Inventory?</h1>
      <div className="content-wrapper">
        <section className="description">
          <p>
            The TTRPG Inventory Manager is a web-based tool inspired by the Resident Evil 4 inventory system, designed to enhance tabletop role-playing games (TTRPGs). It provides players with a visual, intuitive way to manage and organize their in-game items, allowing them to optimize limited inventory space and keep track of everything they carry. With its drag-and-drop functionality, users can easily arrange weapons, equipment, and items within a grid-based layout, making it ideal for a wide range of TTRPG campaigns.
          </p>
          <p>
            I developed the TTRPG Inventory Manager as a portfolio project to demonstrate my expertise in HTML, CSS, and JavaScript. This project showcases my ability to create engaging, interactive web applications with responsive design, featuring dynamic layouts and smooth drag-and-drop interactivity. By merging creativity with practical problem-solving, this tool not only serves TTRPG players but also highlights my technical skills for potential employers and collaborators.
          </p>
        </section>
        <section id="image-container" className="image-container">
          {artImage ? (
            <img id="dynamic-image" src={artImage} alt="Random artwork" />
          ) : (
            <p>Loading artwork...</p>
          )}
          <div className="fun-fact-box">
            <p>
              <div>Fun Fact!</div>
              <div>{funFact}</div>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

