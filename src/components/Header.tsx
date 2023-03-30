import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Navbar } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import ToggleButton from "./ToggleButton";

export default function Header() {
  const router = useRouter();
  const search = useRef<HTMLInputElement | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.current?.value) return;

    router.push(
      {
        pathname: "/search",
        query: search ? { q: search.current.value } : {},
      },
      undefined,
      { shallow: true }
    );

    search.current.value = "";
  };

  return (
    <Navbar>
      <div className="md:flex md:space-x-8 items-center">
        <Navbar.Brand href="/">
          <Image src="/logo.svg" alt="Logo" width={220} height={40} priority />
        </Navbar.Brand>
        <Navbar.Collapse>
          <Navbar.Link href="/" active={router.pathname === "/"}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/movie" active={router.pathname === "/movie"}>
            Movie
          </Navbar.Link>
          <Navbar.Link href="/tv" active={router.pathname === "/tv"}>
            Serie
          </Navbar.Link>
          <Navbar.Link href="/person" active={router.pathname === "/person"}>
            Person
          </Navbar.Link>
        </Navbar.Collapse>
      </div>
      <div className="flex space-x-4">
        <div className="flex md:order-1">
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span className="sr-only">Search icon</span>
            </div>
            <div className="flex gap-2">
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  ref={search}
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </form>
              <ToggleButton />
            </div>
          </div>
        </div>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
