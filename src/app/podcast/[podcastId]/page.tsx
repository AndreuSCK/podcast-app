"use client";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { formatDate, formatDuration } from "@/app/_utils/formatHelpers";
import Link from "next/link";
import { useContext } from "react";
import { PodcastContext } from "@/app/podcastProvider";

export default function Page() {
  const { podcastId } = useParams();
  const { podcastData, isLoading } = useContext(PodcastContext);

  if (!podcastData) return;
  const { episodes, podcastCount } = podcastData;
  if (isLoading) return <p className={styles.status}>Loading...</p>;

  if (!episodes || !podcastCount) {
    return <p className={styles.status}>Error fetching or Podcast not found</p>;
  }
  return (
    <>
      <div className={styles.episodeBlock}>Episodes: {podcastCount}</div>
      <table className={styles.episodeTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((episode) => (
            <tr key={episode.trackId}>
              <td>
                <Link href={`/podcast/${podcastId}/episode/${episode.trackId}`}>
                  {episode.trackName}
                </Link>
              </td>
              <td>{formatDate(episode.releaseDate)}</td>
              {episode.trackTimeMillis ? (
                <td>{formatDuration(episode.trackTimeMillis)}</td>
              ) : (
                <td>Not available</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
