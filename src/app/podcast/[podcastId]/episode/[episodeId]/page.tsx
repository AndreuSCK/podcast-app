"use client";
import usePodcast from "@/app/_utils/usePodcast";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { FormatDescription } from "@/app/_utils/formatDescription";

export default function Page() {
  const {  episodeId } = useParams();
  const { getEpisode } = usePodcast(episodeId as string);

  const episode = getEpisode(episodeId as string);
  
  if (!episode) return <p>Episode not found</p>;
  console.log(episode);

  return (
    <section className={styles.episodeInfo}>
      <h1 className={styles.title}>{episode.trackName}</h1>
      <div className={styles.description}>
        <FormatDescription description={episode.description} />
      </div>
      <audio controls className={styles.audio}>
        <source
          src={episode.episodeUrl}
          type={`${episode.episodeContentType}/${episode.episodeFileExtension}`}
        />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
}
