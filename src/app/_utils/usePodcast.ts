import { SetStateAction, cache, useContext, useEffect, useState } from "react";
import { PodcastContext } from "../podcastProvider";

const usePodcast = (id: string) => {
  const { podcastData, setPodcastData, topPodcasts } =
    useContext(PodcastContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | SetStateAction<unknown>>(null);
  const ALLORIGINSURL = "https://api.allorigins.win/get?url=";

  useEffect(() => {
    if (!id) return;
    const getPodcastData = async () => {
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
        const content = JSON.parse(data.contents);
        if (content && content.resultCount === 0) {
          throw new Error();
        }
        setPodcastData({
          info: content.results.shift(),
          episodes: content.results,
          podcastCount: content.resultCount,
        });
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
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
    return podcast.summary.label;
  };

  return {
    loading: isLoading,
    error,
    getEpisode,
    getDescription,
  };
};

export default usePodcast;
