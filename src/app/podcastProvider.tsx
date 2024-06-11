"use client";
import React, { createContext, ReactNode, useState } from "react";
import { TopPodcastType } from "./_types/topPodcastType";

type PodcastDataType = {
  info: PodcastInfoType;
  episodes: PodcastEpisodeType[];
  podcastCount: number;
};
type PodcastContextData = {
  podcastData: PodcastDataType | undefined;
  setPodcastData: (podcasts: PodcastDataType) => void;
  topPodcasts: TopPodcastType[];
  setTopPodcasts: (podcasts: TopPodcastType[]) => void;
};
export const PodcastContext = createContext<PodcastContextData>({
  podcastData: {} as PodcastDataType,
  setPodcastData: (podcasts: PodcastDataType) => {},
  topPodcasts: {} as TopPodcastType[],
  setTopPodcasts: (podcasts: TopPodcastType[]) => {},
});

export function PodcastProvider({ children }: { children: ReactNode }) {
  const [podcastData, setPodcastData] = useState<PodcastDataType>();
  const [topPodcasts, setTopPodcasts] = useState<TopPodcastType[]>([]);

  return (
    <PodcastContext.Provider
      value={{
        podcastData,
        setPodcastData,
        topPodcasts,
        setTopPodcasts,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}
