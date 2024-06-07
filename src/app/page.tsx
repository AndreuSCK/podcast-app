import TopPodcasts from "./TopPodcasts";
import { PodcastType } from "./_types/types";
import getTopPodcasts from "./_utils/getTopPodcasts";
import styles from "./page.module.css";
import { Suspense } from "react";

export default async function Home() {
  const podcasts: PodcastType[] = await getTopPodcasts();

  return (
    <main className={styles.main}>
      <Suspense fallback={<p>Loading...</p>}>
        <TopPodcasts podcastsData={podcasts}/>
      </Suspense>
    </main>
  );
}
