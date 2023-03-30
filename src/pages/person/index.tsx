import Layout from "@/components/Layout";
import PersonCard from "@/components/PersonCard";
import { getPerson } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ClipLoader } from "react-spinners";

export default function People() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParams = searchParams.get("page") ?? "1";

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["person", pageParams],
    queryFn: async () => {
      const movies = getPerson(Number(pageParams));
      const response = await fetch(movies);
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
    <Layout title="Lista de atores">
      <section>
        <div className="text-2xl font-sans font-semibold mb-4">Pessoas</div>
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading && <ClipLoader />}
          {isError && <div>Ops! Algo deu errado.</div>}
          {isSuccess &&
            data?.results.map((item: IPerson) => (
              <PersonCard key={item.id} result={item} />
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
      </section>
    </Layout>
  );
}
