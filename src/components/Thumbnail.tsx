import { IMAGE_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

interface Props {
  result: IMovie;
  type: string;
}

export default function Thumbnail({ result, type }: Props) {
  return (
    <Link href={type === "movie" ? `/movie/${result.id}` : `/tv/${result.id}`}>
      <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Image
          src={`${IMAGE_URL}${result.poster_path}`}
          alt={result?.name || result?.title || ""}
          fill
          //blurDataURL={`${IMAGE_URL}${result.poster_path}`}
          //placeholder="blur"
          loading="lazy"
          className="object-cover rounded-sm md:rounded"
        />
      </div>
    </Link>
  );
}
