"use client";

import { SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { TopPodcastType } from "../_types/topPodcastType";
import { PodcastContext } from "../podcastProvider";

const useTopPodcasts = () => {
  const { topPodcasts, setTopPodcasts, isLoading, setIsLoading } =
    useContext(PodcastContext);

  const [error, setError] = useState<Error>();
  const [filteredPodcasts, setFilteredPodcasts] =
    useState<TopPodcastType[]>(topPodcasts);
  const ALLORIGINSURL = "https://api.allorigins.win/get?url=";


  const getTopPodcasts = async () => {
    if (topPodcasts.length > 0) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `${ALLORIGINSURL}https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`,
        {
          method: "GET",
          next: {
            revalidate: 24 * 60 * 60, // revalidate after 24 hours
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network error");
      }
      const data = await response.json();
      const content = JSON.parse(data.contents);
      if (!content.feed.entry) {
        throw new Error("No podcasts found");
      }
      setTopPodcasts(content.feed.entry);
      setFilteredPodcasts(content.feed.entry);
    } catch (error) {
      console.log(error);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getTopPodcasts();
  }, [topPodcasts]);

  const filterPodcasts = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!topPodcasts) return;
    setFilteredPodcasts(topPodcasts);
    const search = event.target.value.toLowerCase();
    const filteredPodcasts = topPodcasts.filter((podcast) => {
      return (
        podcast["im:name"].label.toLowerCase().includes(search) ||
        podcast["im:artist"].label.toLowerCase().includes(search)
      );
    });
    setFilteredPodcasts(filteredPodcasts);
  };

  return {
    topPodcasts,
    filterPodcasts,
    isLoading,
    filteredPodcasts,
    error,
  };
};
export default useTopPodcasts;
