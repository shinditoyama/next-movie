import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-6 bg-white dark:bg-gray-800">
      <span className="container text-sm text-gray-600 dark:text-gray-400">
        &copy; 2022 -{" "}
        <Link
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          The Movie Database (TMDB).
        </Link>
      </span>
    </footer>
  );
}
