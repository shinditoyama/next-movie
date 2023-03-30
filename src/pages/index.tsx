import Banner from "@/components/Banner";
import Collection from "@/components/Collection";
import Layout from "@/components/Layout";
import { requests } from "@/utils/request";
import { GetServerSideProps } from "next";

interface Props {
  pMovies: IMovie[];
  pSeries: IMovie[];
}

export default function Home({ pMovies, pSeries }: Props) {
  return (
    <Layout title="Home">
      <Banner banner={pMovies} />
      <Collection results={pMovies} title="Filmes Populares" type="movie" />
      <Collection results={pSeries} title="Series Populares" type="serie" />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [pMovies, pSeries, tMovies, tSeries] = await Promise.all([
    fetch(requests.fetchPopularMovies).then((response) => response.json()),
    fetch(requests.fetchPopularSeries).then((response) => response.json()),
    fetch(requests.fetchTopRatedMovies).then((response) => response.json()),
    fetch(requests.fetchTopRatedSeries).then((response) => response.json()),
  ]);

  return {
    props: {
      pMovies: pMovies.results,
      pSeries: pSeries.results,
      tMovies: tMovies.results,
      tSeries: tSeries.results,
    },
  };
};
