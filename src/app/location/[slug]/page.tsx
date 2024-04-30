"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface LocationData {
  id: string;
  image: string;
  status: string;
  name: string;
  species: string;
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
                status: data.status,
                name: data.name,
                image: data.image,
                species: data.species,
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
      <h1 className="text-4xl text-center font-bold capitalize">
        character currently in {name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
        {locationData.map((data) => (
          <Card key={data.id}>
            <Link href={`/character/${data.id}`}>
              <CardHeader className="relative">
                {data.status === "Alive" && (
                  <Button className="absolute right-8 top-10 bg-green-500 text-xl text-white">
                    {data.status}
                  </Button>
                )}
                {data.status === "Dead" && (
                  <Button
                    variant={"destructive"}
                    className="absolute right-8 top-10 text-xl"
                  >
                    {data.status}
                  </Button>
                )}
                {data.status != "Dead" && data.status != "Alive" && (
                  <Button className="absolute right-8 top-10 text-xl bg-yellow-700 text-white">
                    {data.status}
                  </Button>
                )}
                <Image
                  src={data.image}
                  alt={data.name}
                  width={500}
                  height={500}
                  className="object-cover rounded-xl"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h2 className="text-2xl font-bold">{data.name}</h2>
                <p className="text-lg">{data.species}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LocationDetail;
