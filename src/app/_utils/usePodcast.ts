import { SetStateAction, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../podcastProvider";
import useTopPodcasts from "./useTopPodcasts";

const usePodcast = (id: string) => {
  const { getPodcastDescription } = useContext(ThemeContext);
  const [podcastList, setPodcastList] = useState<PodcastEpisodeType[]>();
  const [podcastInfo, setPodcastInfo] = useState<PodcastInfoType>();
  const [podcastCount, setPodcastCount] = useState(0);
  const [podcastDescription, setPodcastDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | SetStateAction<unknown>>(null);
  const ALLORIGINSURL = "https://api.allorigins.win/get?url=";

  useEffect(() => {
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
        // The first item in the results array is the podcast info, the rest are episodes
        setPodcastInfo(content.results.shift());
        setPodcastList(content.results);
        setPodcastCount(content.resultCount);
        setPodcastDescription(getPodcastDescription(id));

      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPodcastData();
  }, [id]);
  const getEpisode = (episodeId: string) => {
    return podcastList?.find((episode) => episode.trackId === Number(episodeId));
  }
  return {
    podcastList,
    podcastInfo,
    podcastCount,
    podcastDescription,
    loading: isLoading,
    error,
    getEpisode
  };
};

export default usePodcast;
