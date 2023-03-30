import Layout from "@/components/Layout";
import MovieCard from "@/components/MovieCard";
import PersonCard from "@/components/PersonCard";
import { typeState } from "@/store/atoms";
import { getSearch } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("q") ?? "";
  const [type, setType] = useAtom(typeState);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["search", type, queryParams],
    queryFn: async () => {
      const search = getSearch(type, queryParams);
      const response = await fetch(search);
      return response.json();
    },
    keepPreviousData: true,
  });

  return (
    <Layout title="Pesquisar">
      <section>
        <div className="pb-4">
          {queryParams && `Buscando por: ${queryParams}`}
        </div>
        <div className="w-full rounded flex flex-col md:flex-row bg-white dark:bg-gray-800">
          <div className="md:w-1/3 lg:w-1/5 px-4 py-4">
            <button
              onClick={() => setType("movie")}
              className={`${
                type === "movie" && "text-white bg-blue-500"
              } block w-full text-left rounded-lg p-4 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-600`}
            >
              Filme
            </button>
            <button
              onClick={() => setType("tv")}
              className={`${
                type === "tv" && "text-white bg-blue-500"
              } block w-full text-left rounded-lg p-4 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-600`}
            >
              Série
            </button>
            <button
              onClick={() => setType("person")}
              className={`${
                type === "person" && "text-white bg-blue-500"
              } block w-full text-left rounded-lg p-4 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-600`}
            >
              Pessoas
            </button>
          </div>
          <div className="md:w-2/3 lg:w-4/5 px-4 py-4">
            {queryParams ? (
              <>
                <div
                  className={`${
                    type === "person" &&
                    "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  } ${
                    type !== "person" &&
                    "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                  }`}
                >
                  {isLoading && <Spinner />}
                  {type !== "person"
                    ? data?.results?.map((item: IMovie) => (
                        <MovieCard result={item} key={item.id} type={type} />
                      ))
                    : data?.results?.map((item: IPerson) => (
                        <PersonCard result={item} key={item.id} />
                      ))}
                </div>
                {data?.total_results === 0 &&
                  "Não foram encontrados filmes que correspondam aos seus critérios de busca."}
              </>
            ) : (
              "Busque por um Filme, Série ou Pessoa..."
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

/* export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/search");
  const json = await res.json();

  return {
    props: {
      data: "dasd",
    },
  };
}; */
