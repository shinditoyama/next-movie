import Image from "next/image";
import Link from "next/link";
import { IMAGE_URL } from "../utils/constants";

interface Props {
  result: IPerson;
}

export default function PersonCard({ result }: Props) {
  return (
    <Link href={`/person/${result.id}`}>
      <div className="w-60 h-84 shadow-lg bg-white dark:bg-gray-800 cursor-pointer">
        <Image
          src={`${IMAGE_URL}${result.profile_path}`}
          alt={result.name}
          width={240}
          height={240}
          className="object-cover"
        />
        <div className="p-3">
          <p className="text-lg truncate font-semibold">{result.name}</p>
          <p className="text-sm truncate text-gray-600 dark:text-gray-400">
            {result?.known_for
              ?.map((item) => item?.name || item?.title)
              .join(", ")}
          </p>
        </div>
      </div>
    </Link>
  );
}
