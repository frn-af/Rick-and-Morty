"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

const Location = ({ character }: { character: number }) => {
  const [location, setLocation] = useState(
    localStorage.getItem(`location_${character}`) || ""
  );
  const [inputLocation, setInputLocation] = useState("");
  const [assigningLocation, setAssigningLocation] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLocation(e.target.value);
    setError("");
  };

  const assignLocation = () => {
    setAssigningLocation(true);
  };

  const handleAssign = () => {
    const existingCharacterInLocation = (id: number) => {
      const charLocation = localStorage.getItem(`location_${id}`);
      return charLocation === inputLocation;
    };

    if (existingCharacterInLocation(character)) {
      setError("Location name must be unique.");
    } else {
      setLocation(inputLocation);
      localStorage.setItem(`location_${character}`, inputLocation);
      setInputLocation("");
      setAssigningLocation(false);
    }
  };

  useEffect(() => {
    const storedLocation = localStorage.getItem(`location_${character}`);
    if (storedLocation) {
      setLocation(storedLocation);
    }
  }, [character]);

  return (
    <div>
      <p>Location: {location}</p>
      {!location && (
        <div>
          {assigningLocation ? (
            <div>
              <input
                type="text"
                placeholder="Enter location name"
                value={inputLocation}
                onChange={handleInputChange}
              />
              <button onClick={handleAssign}>Assign</button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          ) : (
            <button onClick={assignLocation}>Assign to Location</button>
          )}
        </div>
      )}
    </div>
  );
};

const Details = ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  const fetchData = async () => {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character/" + params.id
    );
    return response.json();
  };

  const locations = async () => {
    const response = localStorage.getItem("location");
    return response ? JSON.parse(response) : [];
  };

  const { data, status } = useQuery({
    queryKey: ["characters", params.id],
    queryFn: fetchData,
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>something went wrong</div>;

  return (
    <div>
      <h1>detail</h1>
      <div>
        <Image src={data.image} width={400} height={400} alt={data.name} />
        <h2>{data.name}</h2>
        <p>{data.species}</p>
        <p>{data.status}</p>
        <p>{data.gender}</p>
      </div>
      <Location character={data.id} />
    </div>
  );
};

export default Details;
