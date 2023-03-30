import Layout from "@/components/Layout";
import { IMAGE_URL } from "@/utils/constants";
import { getPersonDetails } from "@/utils/request";
import { GetServerSideProps } from "next";
import Image from "next/image";

interface Props {
  person: IPersonDetail;
}

export default function PeopleId({ person }: Props) {
  const FormatBirthday = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <Layout title={person.name}>
      <section>
        <div className="w-full flex flex-col md:flex-row ">
          <div className="md:w-1/3 lg:w-1/5 px-4">
            <Image
              src={`${IMAGE_URL}${person.profile_path}`}
              alt={person.name}
              width={260}
              height={340}
              className="object-cover rounded-md md:rounded-lg"
            />
          </div>
          <div className="md:w-2/3 lg:w-4/5 px-4 py-4">
            <h1 className="text-3xl font-bold">{person.name}</h1>
            <div className="mt-4">
              <p className="text-lg font-semibold">Gênero</p>
              <p>{person.gender === 1 ? "Feminino" : "Masculino"}</p>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">Nascimento</p>
              <p>
                {person.birthday} ({FormatBirthday(person.birthday)} de idade)
              </p>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">Biografia</p>
              <p>{person.biography}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.query;

  const request = await fetch(getPersonDetails(id)).then((response) =>
    response.json()
  );

  return {
    props: {
      person: request,
    },
  };
};
