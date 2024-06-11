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

  const [error, setError] = useState<Error>();
  const ALLORIGINSURL = "https://api.allorigins.win/get?url=";

  useEffect(() => {
    if (podcastData && currentEpisode === id) return;
    fetchEpisodes();
  }, [podcastData]);

  const fetchEpisodes = async () => {
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
      console.log(content);
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
      setIsLoading(false);
      setError(error as Error);
    }
  };

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
    isLoading,
    error,
    getEpisode,
    getDescription,
    podcastData,
    fetchEpisodes,
    currentEpisode,
  };
};

export default usePodcast;
