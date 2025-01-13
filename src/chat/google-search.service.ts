import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyDO3ryaqKoujHmmANsYsXcOXdx3Itb-CT4';
const SEARCH_ENGINE_ID = '2749d1275d0e24272';

export async function searchGoogle(query: string) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`;
  const filterGoogleResults = (results: any[], query: string) => {
    const keywords = query.toLowerCase().split(' ');
    return results
      .filter((item) =>
        keywords.some((keyword) =>
          item.snippet.toLowerCase().includes(keyword),
        ),
      )
      .slice(0, 3);
  };

  try {
    const response = await axios.get(url);
    const results = response.data.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
    }));

    const filteredResults = filterGoogleResults(results, query);
    return filteredResults;
  } catch (error) {
    console.error('Google Search API error:', error);
    throw new Error('Eroare la căutarea pe Google.');
  }
}
