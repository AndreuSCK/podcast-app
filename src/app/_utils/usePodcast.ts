import { SetStateAction, useContext, useEffect, useState } from "react";
import { PodcastContext } from "../podcastProvider";
import useTopPodcasts from "./useTopPodcasts";

const usePodcast = (id: string) => {
  const {
    podcastData,
    setPodcastData,
    topPodcasts,
    isLoading,
    setIsLoading,
    currentEpisode,
    setCurrentEpisode,
  } = useContext(PodcastContext);

  const [error, setError] = useState<null | SetStateAction<unknown>>(null);
  const ALLORIGINSURL = "https://api.allorigins.win/get?url=";

  useEffect(() => {
    if (!id) return;
    console.log(currentEpisode, id);
    if (currentEpisode === id) {
      setIsLoading(false);
      return;
    }
    setPodcastData(undefined);
    const getPodcastData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${ALLORIGINSURL}${encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
          )}`,
          {
            method: "GET",
            next: {
              revalidate: 24 * 60 * 60, // revalidate after 24 hours
            },
          }
        );
        const data = await response.json();
        const content = await JSON.parse(data.contents);
        if (content && content.resultCount === 0) {
          throw new Error();
        }
        setCurrentEpisode(id);
        const podcastData = {
          info: content.results.shift(),
          episodes: content.results,
          podcastCount: content.resultCount,
        };
        setPodcastData(podcastData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    getPodcastData();
  }, [id]);

  const getEpisode = (episodeId: string) => {
    return podcastData?.episodes?.find(
      (episode) => episode.trackId === Number(episodeId)
    );
  };
  const getDescription = (id: string) => {
    const podcast = topPodcasts?.find(
      (podcast) => podcast.id.attributes["im:id"] === id
    );
    if (!podcast) return;
    useTopPodcasts();
  };

  return {
    loading: isLoading,
    error,
    getEpisode,
    getDescription,
  };
};

export default usePodcast;
