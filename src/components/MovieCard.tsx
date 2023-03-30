import { IMAGE_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

interface Props {
  result: IMovie;
  type: string;
}

export default function MovieCard({ result, type }: Props) {
  return (
    <Link href={type === "movie" ? `/movie/${result.id}` : `/tv/${result.id}`}>
      <div className="cursor-pointer transform hover:scale-105 transition duration-300">
        <Image
          src={`${IMAGE_URL}${result.poster_path}`}
          alt={result?.title || result?.name || ""}
          width={300}
          height={420}
          priority
          className="rounded-lg object-cover"
        />
        <div className="text-center truncate">
          {result?.title || result?.name}
        </div>
      </div>
    </Link>
  );
}
