"use client";

import { SetStateAction, useContext, useEffect, useState } from "react";
import { TopPodcastType } from "../_types/topPodcastType";
import { PodcastContext } from "../podcastProvider";

const useTopPodcasts = () => {
  const {
    topPodcasts,
    setTopPodcasts,
    isLoading,
    setIsLoading,
  } = useContext(PodcastContext);

  const [error, setError] = useState<null | SetStateAction<unknown>>(null);
  const [filteredPodcasts, setFilteredPodcasts] =
    useState<TopPodcastType[]>(topPodcasts);
  const ALLORIGINSURL = "https://api.allorigins.win/get?url=";

  useEffect(() => {
    const getTopPodcasts = async () => {
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
        const data = await response.json();
        const content = JSON.parse(data.contents);
        if (!content.feed.entry) {
          throw new Error("No podcasts found");
        }
        setTopPodcasts(content.feed.entry);
        setFilteredPodcasts(content.feed.entry);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTopPodcasts();
  }, []);

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
    loading: isLoading,
    error,
    filteredPodcasts,
  };
};
export default useTopPodcasts;
