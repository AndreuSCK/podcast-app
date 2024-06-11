"use client";

import { SetStateAction, useContext, useEffect, useState } from "react";
import { TopPodcastType } from "../_types/topPodcastType";
import { ThemeContext } from "../podcastProvider";

const useTopPodcasts = () => {
  const [topPodcastsOriginal, setTopPodcastsOriginal] =
    useState<TopPodcastType[]>();
  const [topPodcasts, setTopPodcasts] = useState<TopPodcastType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | SetStateAction<unknown>>(null);
  const ALLORIGINSURL = "https://api.allorigins.win/get?url=";

  const { setPodcastDescription } = useContext(ThemeContext);

  useEffect(() => {
    const getTopPodcasts = async () => {
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
        setTopPodcastsOriginal(content.feed.entry);
        setPodcastDescription(
          content.feed.entry.map((podcast: TopPodcastType) => {
            return {
              id: podcast.id.attributes["im:id"],
              description: podcast["summary"].label,
            };
          })
        );
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
    if (!topPodcasts || !topPodcastsOriginal) return;
    const search = event.target.value.toLowerCase();
    const filteredPodcasts = topPodcastsOriginal.filter((podcast) => {
      return (
        podcast["im:name"].label.toLowerCase().includes(search) ||
        podcast["im:artist"].label.toLowerCase().includes(search)
      );
    });
    setTopPodcasts(filteredPodcasts);
  };

  return { topPodcasts, filterPodcasts, loading: isLoading, error };
};
export default useTopPodcasts;
