"use client";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { FormatDescription } from "@/app/_utils/formatDescription";
import { useCallback, useContext } from "react";
import { PodcastContext } from "@/app/podcastProvider";
import usePodcast from "@/app/_utils/usePodcast";

export default function Page() {
  const { podcastId, episodeId } = useParams();
  const { podcastData, isLoading } = usePodcast(podcastId as string);
  const episode = podcastData?.episodes.find(
    (episode) => episode.trackId === Number(episodeId)
  );
  
  if (isLoading) return <p className={styles.status}>Loading...</p>;
  if (!episode) return <p>Episode not found</p>;
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
