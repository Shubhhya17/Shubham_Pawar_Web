export default function sitemap() {
  const SITE_URL = "https://shubhampawar.net";
  
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Add other routes here if they exist, e.g. /projects, /experience
  ];
}
