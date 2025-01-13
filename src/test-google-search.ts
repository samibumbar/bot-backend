import { searchGoogle } from './chat/google-search.service';

async function testSearch() {
  const query = 'Ce este middleware in backend?';
  try {
    const results = await searchGoogle(query);
    console.log('Rezultate Google:', results);
  } catch (error) {
    console.error('Eroare la căutarea pe Google:', error);
  }
}

testSearch();
