"use client";
import { FormatDescription } from "@/app/_utils/formatDescription";
import styles from "./page.module.css";

import { useParams } from "next/navigation";
import Link from "next/link";
import useTopPodcasts from "@/app/_utils/useTopPodcasts";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { podcastId } = useParams();
  const { topPodcasts, isLoading, error } = useTopPodcasts();
  const currentPodcast = topPodcasts?.find(
    (podcast) => podcast.id.attributes["im:id"] === podcastId
  );

  if (isLoading) return <p className={styles.status}>Loading...</p>;
  if (error) return <p className={styles.status}>Error: {error.message}</p>;
  if (!currentPodcast) return <p className={styles.status}>No podcast found</p>;
  return (
    <main className={styles.main}>
      <section className={styles.podcastInfo}>
        <Link href={`/podcast/${podcastId}`}>
          <img
            className={styles.podcastImage}
            src={currentPodcast?.["im:image"][2].label}
            alt={currentPodcast?.["im:name"].label}
            loading="lazy"
          />
        </Link>
        <Link href={`/podcast/${podcastId}`}>
          <h2>{currentPodcast["im:artist"].label}</h2>
        </Link>
        <p className={styles.artistName}>
          by {currentPodcast["im:artist"].label}
        </p>
        <h3>Description:</h3>
        <div className={styles.podcastDescription}>
          {currentPodcast.summary.label ? (
            <FormatDescription description={currentPodcast.summary.label} />
          ) : (
            <p>No description available</p>
          )}
        </div>
      </section>
      <section className={styles.mainContent}>{children}</section>
    </main>
  );
}
