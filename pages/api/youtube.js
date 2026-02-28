export default async function handler(req, res) {
  const apiKey = "AIzaSyAMKPzgD7anH8V49B3J3l1j7P8blPFqNnQ";
  const { topic } = req.query;

  if (!topic) {
    return res.status(400).json({ error: "No topic provided" });
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${topic}&type=video&maxResults=5&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) {
      return res.status(500).json({ error: "API error", details: data });
    }

    const titles = data.items.map(item => item.snippet.title);

    const viralTitle = `🔥 ${topic} | Full Comedy Video 2026 | Must Watch 😂`;

    const hashtags = [
      `#${topic.replace(/\s+/g, "")}`,
      "#viral",
      "#shorts",
      "#trending",
      "#funny"
    ];

    res.status(200).json({ titles, viralTitle, hashtags });

  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}
