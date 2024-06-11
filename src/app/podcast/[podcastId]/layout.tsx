"use client";
import { FormatDescription } from "@/app/_utils/formatDescription";
import styles from "./page.module.css";

import usePodcast from "@/app/_utils/usePodcast";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { PodcastContext } from "@/app/podcastProvider";
import Link from "next/link";
import useTopPodcasts from "@/app/_utils/useTopPodcasts";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { podcastId } = useParams();
  const { loading, error } = usePodcast(podcastId as string);
  const { podcastData } = useContext(PodcastContext);
  const { topPodcasts } = useTopPodcasts();

  const description = topPodcasts?.find(
    (podcast) => podcast.id.attributes["im:id"] === podcastId
  )?.summary.label;

  if (loading || !podcastData) return <p className={styles.status}>Loading...</p>;
  if (error)
    return <p className={styles.error}>Error fetching or Podcast not found</p>;
  return (
    <main className={styles.main}>
      <section className={styles.podcastInfo}>
        <Link href={`/podcast/${podcastId}`}>
          <img
            className={styles.podcastImage}
            src={podcastData.info.artworkUrl600}
            alt={podcastData.info.collectionName}
          />
        </Link>
        <Link href={`/podcast/${podcastId}`}>
          <h2>{podcastData.info.collectionName}</h2>
        </Link>
        <p className={styles.artistName}>by {podcastData.info.artistName}</p>
        <h3>Description:</h3>
        <div className={styles.podcastDescription}>
          {description ? (
            <FormatDescription description={description} />
          ) : (
            <p>No description available</p>
          )}
        </div>
      </section>
      <section className={styles.mainContent}>{children}</section>
    </main>
  );
}
