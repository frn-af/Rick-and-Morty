import Link from "next/link";
import { ModeToggle } from "./togglemode";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-[90%] md:w-full mx-auto flex items-center justify-between p-4 m-4 md:m-0">
      <h1 className="text-2xl capitalize font-bold">rick and morty</h1>
      <div className="hidden max-h-screen md:flex items-center space-x-2 ">
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
      <div className="md:hidden flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="space-y-1">
            <DropdownMenuItem className="border text-center">
              <Link href="/">
                <h4 className="capitalize font-medium">
                  character
                </h4>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="border text-center">
              <Link href="/location">
                <h4 className="capitalize font-medium">
                  Location
                </h4>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
