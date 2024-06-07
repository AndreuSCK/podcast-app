"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { PodcastType } from "./_types/types";

export default function TopPodcasts({
  podcastsData,
}: Readonly<{ podcastsData: PodcastType[] }>) {
  const router = useRouter()
  const [podcasts, setPodcasts] = useState<PodcastType[]>(podcastsData);
  const filterPodcasts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toLowerCase();
    const filteredPodcasts = podcastsData.filter((podcast) => {
      return (
        podcast["im:name"].label.toLowerCase().includes(search) ||
        podcast["im:artist"].label.toLowerCase().includes(search)
      );
    });
    setPodcasts(filteredPodcasts);
  };

  return (
    <section className={styles.podcastSection}>
      <input
        className={styles.podcastFilter}
        type="text"
        id="search"
        placeholder="Filter podcasts..."
        onChange={(e) => filterPodcasts(e)}
      />
      <ul className={styles.podcastsContainer}>
        {podcasts.map((podcast) => (
          <li
            key={podcast.id.attributes["im:id"]}
            className={styles.podcastCard}
            onClick={() => router.push(`/podcast/${podcast.id.attributes["im:id"]}`)}
          >
            <h2 className={styles.podcastTitle}>
              {podcast["im:name"].label.toUpperCase()}
            </h2>
            <img
              src={podcast["im:image"][2].label}
              alt={podcast["im:name"].label}
              className={styles.podcastImage}
            />
            <p className={styles.podcastAuthor}>
              Author: {podcast["im:artist"].label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
