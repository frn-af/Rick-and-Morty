"use client";

import { useEffect, useState } from "react";

const Location = () => {
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    // Get all keys from localStorage
    const keys = Object.keys(localStorage);

    // Create a Set to store unique location names
    const uniqueLocations = new Set<string>(); // Add type annotation for string

    // Iterate over keys and extract location names
    keys.forEach((key) => {
      if (key.startsWith("location_")) {
        const locationName = localStorage.getItem(key) as string; // Add type assertion for string
        uniqueLocations.add(locationName);
      }
    });

    // Convert Set to an array and set it in state
    setLocations(Array.from(uniqueLocations) as string[]); // Add type assertion for string array
  }, []);

  return (
    <div>
      <h1>Location List</h1>
      <ul>
        {locations.map((location, index) => (
          <li key={index}>{location}</li>
        ))}
      </ul>
    </div>
  );
};

export default Location;
