"use client";
import React, {
  createContext,
  ReactNode,
  useState,
} from "react";

type PodcastDescriptions = {
  id: string;
  description: string;
};
type ThemeContextData = {
  theme: string;
  toggleTheme: () => void;
  setPodcastDescription: (podcasts: PodcastDescriptions[]) => void;
  getPodcastDescription: (id: string) => string;
};

export const ThemeContext = createContext<ThemeContextData>({
  theme: "light",
  toggleTheme: () => {},
  getPodcastDescription: (id: string) => "",
  setPodcastDescription: (podcasts: PodcastDescriptions[]) => {},
});

export function PodcastProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");
  const [podcastDescriptionsState, setPodcastDescriptionsState] = useState<
    PodcastDescriptions[]
  >([]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const setPodcastDescription = (podcasts: PodcastDescriptions[]) => {
    localStorage.setItem("podcastDescriptions", JSON.stringify(podcasts));
    setPodcastDescriptionsState(podcasts);
  };
  const getPodcastDescription = (id: string) => {
    const description =
      podcastDescriptionsState.find((podcast) => podcast.id === id)
        ?.description;
    if (description) return description;

    const podcastDescriptionsStorage = localStorage.getItem(
      "podcastDescriptions"
    );
    if (podcastDescriptionsStorage) {
      const podcastDescriptions = JSON.parse(podcastDescriptionsStorage);
      return (
        (podcastDescriptions.find(
          (podcast: PodcastDescriptions) => podcast.id === id
        )?.description as string) || ""
      );
    }
    return "Description not found";
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setPodcastDescription,
        getPodcastDescription,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
