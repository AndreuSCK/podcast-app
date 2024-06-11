"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { TopPodcastType } from "./_types/topPodcastType";

type PodcastDataType = {
  info: PodcastInfoType;
  episodes: PodcastEpisodeType[];
  podcastCount: number;
};
type PodcastContextData = {
  podcastData: PodcastDataType | undefined;
  setPodcastData: (podcasts: PodcastDataType | undefined) => void;
  topPodcasts: TopPodcastType[];
  setTopPodcasts: (podcasts: TopPodcastType[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  currentEpisode: string;
  setCurrentEpisode: (episode: string) => void;
};
export const PodcastContext = createContext<PodcastContextData>({
  podcastData: {} as PodcastDataType,
  setPodcastData: (podcasts: PodcastDataType | undefined) => {},
  topPodcasts: {} as TopPodcastType[],
  setTopPodcasts: (podcasts: TopPodcastType[]) => {},
  isLoading: false,
  setIsLoading: (loading: boolean) => {},
  currentEpisode: '',
  setCurrentEpisode: (episode: string) => {}
});

export function PodcastProvider({ children }: { children: ReactNode }) {
  const [podcastData, setPodcastData] = useState<PodcastDataType>();
  const [topPodcasts, setTopPodcasts] = useState<TopPodcastType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentEpisode, setCurrentEpisode] = useState<string>('');

  
  return (
    <PodcastContext.Provider
      value={{
        podcastData,
        setPodcastData,
        topPodcasts,
        setTopPodcasts,
        isLoading,
        setIsLoading,
        currentEpisode,
        setCurrentEpisode
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}
