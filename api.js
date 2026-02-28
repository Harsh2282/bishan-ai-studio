export default async function handler(req, res) {
  const apiKey = "AIzaSyAMKPzgD7anH8V49B3J3l1j7P8blPFqNnQ";
  const { topic } = req.query;

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${topic}&type=video&maxResults=5&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const titles = data.items.map(item => item.snippet.title);

    // Generate viral style title
    const viralTitle = `🔥 ${topic} | Full Comedy Video 2026 | Must Watch 😂`;

    // Generate smart hashtags
    const hashtags = [
      `#${topic.replace(/\s+/g, "")}`,
      "#viral",
      "#shorts",
      "#trending",
      "#funny"
    ];

    res.status(200).json({ titles, viralTitle, hashtags });

  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}
