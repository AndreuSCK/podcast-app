export default async function getTopPodcasts() {
  const response = await fetch("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 24 * 60 * 60, // revalidate after 24 hours
    },
  });
  const data = await response.json();
  return data.feed.entry;
}