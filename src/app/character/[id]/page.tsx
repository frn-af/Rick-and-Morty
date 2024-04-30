"use client";
import Error from "@/components/error";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
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
      {location && (
        <Link href={`/location/${location}`} className="flex gap-2 items-center">
          <p className="text-xl capitalize font-medium">Location :</p>
          <Button className="text-xl capitalize font-medium">
            {location}
          </Button>
        </Link>
      )}
      {!location && (
        <div>
          {assigningLocation ? (
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter location name"
                value={inputLocation}
                onChange={handleInputChange}
              />
              <Button onClick={handleAssign}>submit</Button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          ) : (
            <Button onClick={assignLocation} className="text-xl">
              Assign to Location
            </Button>
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

  const { data, status } = useQuery({
    queryKey: ["characters", params.id],
    queryFn: fetchData,
  });

  if (status === "pending") return <Loading />;
  if (status === "error") return <Error />;

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <Card className="p-4 m-4 md:flex">
        <CardHeader className="">
          <Image
            src={data.image}
            width={300}
            height={300}
            alt={data.name}
            className="rounded-lg"
          />
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <CardTitle className="uppercase text-4xl">{data.name}</CardTitle>
          <p className="text-xl font-medium">Status : {data.status}</p>
          <p className="text-xl font-medium">Species : {data.species}</p>
          <p className="text-xl font-medium">Gender :{data.gender}</p>
          <Location character={data.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
