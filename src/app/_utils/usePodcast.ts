import { SetStateAction, useContext, useEffect, useState } from "react";
import { PodcastContext } from "../podcastProvider";
import useTopPodcasts from "./useTopPodcasts";

const usePodcast = (id: string) => {
  const {
    podcastData,
    setPodcastData,
    isPodcastLoading,
    setIsPodcastLoading,
    currentEpisode,
    setCurrentEpisode,
  } = useContext(PodcastContext);
  const ALLORIGINSURL = "https://api.allorigins.win/get?url=";
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (isPodcastLoading) return;
    if (podcastData && currentEpisode === id) return;

    const fetchEpisodes = async () => {
      setIsPodcastLoading(true);
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
          podcastCount: content.resultCount - 1,
        };
        setPodcastData(podcastData);
      } catch (error) {
        console.log(error);
        setError(error as Error);
      } finally {
        setIsPodcastLoading(false);
      }
    };
    fetchEpisodes();
  }, [id]);

  const getEpisode = (episodeId: string) => {
    return podcastData?.episodes?.find(
      (episode) => episode.trackId === Number(episodeId)
    );
  };

  return {
    isPodcastLoading,
    error,
    getEpisode,
    podcastData,
    currentEpisode,
  };
};

export default usePodcast;
