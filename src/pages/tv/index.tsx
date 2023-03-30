import Layout from "@/components/Layout";
import MovieCard from "@/components/MovieCard";
import { getSerieWithGenre, requests } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "flowbite-react";
import { GetStaticProps } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ClipLoader } from "react-spinners";

interface Props {
  genres: IGenre[];
}

export default function Serie({ genres }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const genreParams = searchParams.get("genre");
  const pageParams = searchParams.get("page") ?? "1";

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["tv", genreParams, pageParams],
    queryFn: async () => {
      const series = getSerieWithGenre(Number(genreParams), Number(pageParams));
      const response = await fetch(series);
      return response.json();
    },
    keepPreviousData: true,
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const onPageChange = (selected: number) => {
    router.push(pathname + "?" + createQueryString("page", String(selected)));
  };

  return (
    <Layout title="Lista de Series">
      <section>
        <div className="text-2xl font-sans font-semibold mb-4">Séries</div>
        <div className="w-full rounded flex flex-col md:flex-row bg-white dark:bg-gray-800">
          <div className="md:w-1/3 lg:w-1/5 px-4 py-4">
            {genres.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  router.push(
                    pathname + "?" + createQueryString("genre", String(item.id))
                  )
                }
                className={`${
                  Number(genreParams) === item.id && "text-white bg-blue-500"
                } block w-full text-left rounded-lg p-4 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-600`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="md:w-2/3 lg:w-4/5 px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {isLoading && <ClipLoader />}
              {isError && <div>Ops! Algo deu errado.</div>}
              {isSuccess &&
                data?.results.map((item: IMovie) => (
                  <MovieCard result={item} key={item.id} type="serie" />
                ))}
            </div>
            {data?.results.length > 0 && (
              <div className="flex items-start justify-start pt-4">
                <Pagination
                  currentPage={Number(pageParams)}
                  layout="pagination"
                  onPageChange={(e) => onPageChange(e)}
                  totalPages={data?.total_pages}
                />
              </div>
            )}
            {data?.results.length === 0 && (
              <div>Busque por uma Série, ao selecionar um gênero.</div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [genres] = await Promise.all([
    fetch(requests.fetchGenreSeries).then((response) => response.json()),
  ]);

  return {
    props: {
      genres: genres.genres,
    },
  };
};
