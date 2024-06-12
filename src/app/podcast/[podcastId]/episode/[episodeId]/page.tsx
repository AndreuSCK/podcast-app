"use client";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { FormatDescription } from "@/app/_utils/formatDescription";
import usePodcast from "@/app/_utils/usePodcast";

export default function Page() {
  const { podcastId, episodeId } = useParams();
  const { isPodcastLoading, getEpisode, error } = usePodcast(
    podcastId as string
  );
  
  if (isPodcastLoading) return <p className={styles.status}>Loading...</p>;
  const episode = getEpisode(episodeId as string);
  if (error || !episode) return <p>Episode not found</p>;
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
