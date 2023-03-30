import ReactPlayer from "react-player";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

interface Props {
  movie: any;
  open: boolean;
  toggleModal: () => void;
}

export default function VideoPlayer({ movie, open, toggleModal }: Props) {
  const index = movie.videos.results.findIndex(
    (element: IElement) => element.type === "Trailer"
  );

  return (
    <Modal
      open={open}
      onClose={toggleModal}
      center
      styles={{
        modal: {
          width: "100%",
          padding: "unset",
        },
        closeButton: {
          background: "yellow",
        },
      }}
    >
      {index === -1 && <div>Nenhum Trailer foram encontrados!</div>}
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${movie.videos?.results[index]?.key}`}
        width="100%"
        height="calc(100vh - 100px)"
        controls
        /* config={{
          youtube: { playerVars: { origin: "https://www.youtube.com" } },
        }} */
      />
    </Modal>
  );
}
