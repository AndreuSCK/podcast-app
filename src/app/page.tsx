"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import useTopPodcasts from "./_utils/useTopPodcasts";

export default function Home() {
  const router = useRouter();
  const {
    topPodcasts,
    filterPodcasts,
    loading,
    error,
  } = useTopPodcasts();

  if (loading) {
    return <p className={styles.status}>Loading...</p>;
  }
  if (error || !topPodcasts) {
    return <p className={styles.status}>Error fetching data</p>;
  }
  return (
    <main className={styles.main}>
      <section className={styles.podcastSection}>
        <input
          className={styles.podcastFilter}
          type="text"
          id="search"
          placeholder="Filter podcasts..."
          onChange={(e) => filterPodcasts(e)}
        />
        <ul className={styles.podcastsContainer}>
          {topPodcasts.map((podcast) => (
            <li
              key={podcast.id.attributes["im:id"]}
              className={styles.podcastCard}
              onClick={() =>
                router.push(`/podcast/${podcast.id.attributes["im:id"]}`)
              }
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
    </main>
  );
}
