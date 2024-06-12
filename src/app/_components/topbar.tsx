"use client";
import Link from "next/link";
import styles from "./topbar.module.css";
import { useContext } from "react";
import { PodcastContext } from "../podcastProvider";
export default function Topbar() {
  const { isPodcastLoading, isTopPodcastLoading } = useContext(PodcastContext);

  return (
    <nav className={styles.topbar}>
      <div className={styles.topbarContainer}>
        <Link href="/" prefetch={false}>
          <h1>Podcaster</h1>
        </Link>
        {(isPodcastLoading || isTopPodcastLoading) && (
          <div className={styles.loadingCircle} />
        )}
      </div>
    </nav>
  );
}
