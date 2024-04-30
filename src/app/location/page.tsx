"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
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
    <div className="p-4 w-[90%] mx-auto">
      <h1 className="text-center text-4xl font-bold p-4 capitalize">
        Location List
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-5 p-10 gap-2">
        {locations.map((location, index) => (
          <div key={index}>
            <Link href={`/location/${location}`}>
              <Button className="w-full h-16">
                <h1 className="text-2xl uppercase">{location}</h1>
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
