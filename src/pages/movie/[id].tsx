import Layout from "@/components/Layout";
import ToggleButton from "@/components/ToggleButton";
import VideoPlayer from "@/components/VideoPlayer";
import { IMAGE_URL, TMDB_URL } from "@/utils/constants";
import { getMovieDetails } from "@/utils/request";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  movie: IMovieDetail;
}

export default function MovieId({ movie }: Props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <Layout title={movie.title}>
      <div className="relative min-h-[calc(100vh)] opacity-40">
        <Image
          src={`${IMAGE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute top-4 inset-x-4 md:inset-x-12">
        <div className="flex justify-between">
          <ArrowLeftIcon
            className="h-8 w-8 cursor-pointer hover:scale-125"
            onClick={() => router.back()}
          />
          <ToggleButton />
        </div>
      </div>
      <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          {movie.title || movie.original_name}
        </h1>

        <div className="flex items-center space-x-3 md:space-x-5">
          <Link
            href={`${TMDB_URL}/movie/${movie.id}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs md:text-base bg-white/90 text-black border border-white py-3 px-6 rounded hover:bg-[#c6c6c6]"
          >
            <span className="uppercase font-medium tracking-wide">Play</span>
          </Link>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-xs md:text-base bg-black/60 text-white border border-white py-3 px-6 rounded hover:bg-[#c6c6c6]"
          >
            <span className="uppercase font-medium tracking-wide">Trailer</span>
          </button>
        </div>

        <p className="text-xs md:text-sm">
          {movie.release_date} • {Math.floor(movie.runtime / 60)}h{" "}
          {movie.runtime % 60}m •{" "}
          {movie.genres.map((genre) => genre.name).join(" / ")}{" "}
        </p>

        <h4 className="text-sm md:text-lg max-w-4xl">{movie.overview}</h4>
      </div>

      {showModal && (
        <VideoPlayer movie={movie} open={showModal} toggleModal={toggleModal} />
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.query;

  const request = await fetch(getMovieDetails(id)).then((response) =>
    response.json()
  );

  return {
    props: {
      movie: request,
    },
  };
};
