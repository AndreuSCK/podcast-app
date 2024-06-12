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
  isTopPodcastLoading: boolean;
  setIsTopPodcastLoading: (loading: boolean) => void;
  isPodcastLoading: boolean;
  setIsPodcastLoading: (loading: boolean) => void;
  currentEpisode: string;
  setCurrentEpisode: (episode: string) => void;
};
export const PodcastContext = createContext<PodcastContextData>({
  podcastData: {} as PodcastDataType,
  setPodcastData: (podcasts: PodcastDataType | undefined) => {},
  topPodcasts: {} as TopPodcastType[],
  setTopPodcasts: (podcasts: TopPodcastType[]) => {},
  currentEpisode: "",
  setCurrentEpisode: (episode: string) => {},
  isTopPodcastLoading: false,
  setIsTopPodcastLoading: (loading: boolean) => {},
  isPodcastLoading: false,
  setIsPodcastLoading: (loading: boolean) => {},
});

export function PodcastProvider({ children }: { children: ReactNode }) {
  const [podcastData, setPodcastData] = useState<PodcastDataType>();
  const [topPodcasts, setTopPodcasts] = useState<TopPodcastType[]>([]);
  const [isTopPodcastLoading, setIsTopPodcastLoading] = useState<boolean>(false);
  const [isPodcastLoading, setIsPodcastLoading] = useState<boolean>(false);
  const [currentEpisode, setCurrentEpisode] = useState<string>("");
  return (
    <PodcastContext.Provider
      value={{
        podcastData,
        setPodcastData,
        topPodcasts,
        setTopPodcasts,
        isTopPodcastLoading,
        setIsTopPodcastLoading,
        isPodcastLoading,
        setIsPodcastLoading,
        currentEpisode,
        setCurrentEpisode,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}
