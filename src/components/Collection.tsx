import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import Thumbnail from "./Thumbnail";

interface Props {
  results: IMovie[];
  title: string;
  type: string;
}

export default function Collection({ results, title, type }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: string) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-14">
      <div className="h-40 space-y-0.5 md:space-y-2">
        <h2 className="w-56 text-sm font-semibold transition duration-200 md:text-2xl">
          {title}
        </h2>
        <div className="group relative md:-ml-2">
          <ChevronLeftIcon
            color="white"
            className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
            onClick={() => handleClick("left")}
          />
          <div
            className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
            ref={rowRef}
          >
            {results.map((movie) => (
              <Thumbnail key={movie.id} result={movie} type={type} />
            ))}
          </div>
          <ChevronRightIcon
            color="white"
            className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    </section>
  );
}
