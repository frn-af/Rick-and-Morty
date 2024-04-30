import Link from "next/link";
import { ModeToggle } from "./togglemode";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between p-4">
      <h1 className="text-2xl capitalize font-bold">rick and morty</h1>
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Button variant="outline" className="capitalize">
            character
          </Button>
        </Link>
        <Link href="/location">
          <Button variant="outline" className="capitalize">
            location
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
