import { IMAGE_URL } from "@/utils/constants";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  banner: IMovie[];
}

export default function Banner({ banner }: Props) {
  const [movie, setMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    setMovie(banner[Math.floor(Math.random() * banner.length)]);
  }, [banner]);

  return (
    <div className="relative opacity-80 min-h-[calc(55vh)]">
      <Image
        src={`${IMAGE_URL}${movie?.backdrop_path}`}
        alt={movie?.title || ""}
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
