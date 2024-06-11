"use client";
import { FormatDescription } from "@/app/_utils/formatDescription";
import styles from "./page.module.css";

import usePodcast from "@/app/_utils/usePodcast";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { PodcastContext } from "@/app/podcastProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { podcastId } = useParams();
  const { loading, error, getDescription } = usePodcast(podcastId as string);
  const { podcastData } = useContext(PodcastContext);
  const description = getDescription(podcastId as string);

  if (loading) return <p className={styles.status}>Loading...</p>;
  if (error || !podcastData)
    return <p className={styles.error}>Error fetching or Podcast not found</p>;
  return (
    <main className={styles.main}>
      <section className={styles.podcastInfo}>
        <img
          className={styles.podcastImage}
          src={podcastData.info.artworkUrl600}
          alt={podcastData.info.collectionName}
        />
        <h2>{podcastData.info.collectionName}</h2>
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
