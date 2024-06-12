"use client";

import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TopPodcastType } from "../_types/topPodcastType";
import { PodcastContext } from "../podcastProvider";

const useTopPodcasts = () => {
  const {
    topPodcasts,
    setTopPodcasts,
    isTopPodcastLoading,
    setIsTopPodcastLoading,
  } = useContext(PodcastContext);

  const [error, setError] = useState<Error>();
  const [filteredPodcasts, setFilteredPodcasts] =
    useState<TopPodcastType[]>(topPodcasts);
  const ALLORIGINSURL = "https://api.allorigins.win/get?url=";

  const getTopPodcasts = async () => {
    if (topPodcasts.length > 0) {
      setIsTopPodcastLoading(false);
      return;
    }
    if (isTopPodcastLoading) return;
    setIsTopPodcastLoading(true);
    try {
      const response = await fetch(
        `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`,
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

      if (!data.feed.entry) {
        throw new Error("No podcasts found");
      }
      setTopPodcasts(data.feed.entry);
      setFilteredPodcasts(data.feed.entry);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsTopPodcastLoading(false);
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
    isTopPodcastLoading,
    filteredPodcasts,
    error,
  };
};
export default useTopPodcasts;
