"use client";
import { useEffect, useState } from "react";

interface LocationData {
  id: string;
  name: string;
}

const LocationDetail = ({ params }: { params: { slug: string } }) => {
  const [locationData, setLocationData] = useState<LocationData[]>([]);
  const name = params.slug;

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const locations: LocationData[] = [];

    keys.forEach((key) => {
      if (key.startsWith("location_")) {
        const id = key.replace("location_", "");
        const locationName = localStorage.getItem(key);
        if (locationName === name) {
          fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then((response) => response.json())
            .then((data) => {
              locations.push({
                id: data.id,
                name: data.name,
              });
              setLocationData(locations);
            });
        }
      }
    });

    setLocationData(locations);
  }, [name]);

  return (
    <div>
      <h1>character currently in {name}</h1>
      <ul>
        {locationData.map((data) => (
          <li key={data.id}>{data.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LocationDetail;
