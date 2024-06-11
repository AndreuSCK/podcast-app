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
  isLoading: boolean;
  setIsloading: (loading: boolean) => void;
};
export const PodcastContext = createContext<PodcastContextData>({
  podcastData: {} as PodcastDataType,
  setPodcastData: (podcasts: PodcastDataType) => {},
  topPodcasts: {} as TopPodcastType[],
  setTopPodcasts: (podcasts: TopPodcastType[]) => {},
  isLoading: false,
  setIsloading: (loading: boolean) => {},
});

export function PodcastProvider({ children }: { children: ReactNode }) {
  const [podcastData, setPodcastData] = useState<PodcastDataType>();
  const [topPodcasts, setTopPodcasts] = useState<TopPodcastType[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);

  
  return (
    <PodcastContext.Provider
      value={{
        podcastData,
        setPodcastData,
        topPodcasts,
        setTopPodcasts,
        isLoading,
        setIsloading,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}
