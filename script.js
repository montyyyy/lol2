const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

// Replace with your Riot API key
const API_KEY = 'YOUR_RIOT_API_KEY';
const CHAMPION_API_URL = `https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion.json`;

async function fetchChampions() {
    const response = await fetch(CHAMPION_API_URL);
    const data = await response.json();
    return data.data;
}

async function displayChampions() {
    const champions = await fetchChampions();
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        resultsDiv.innerHTML = '';
        
        Object.values(champions).forEach(champion => {
            if (champion.name.toLowerCase().includes(query)) {
                resultsDiv.innerHTML += `
                    <div class="champion">
                        <img src="https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/${champion.image.full}" alt="${champion.name}">
                        <h3>${champion.name}</h3>
                        <p>${champion.title}</p>
                        <p><strong>Tags:</strong> ${champion.tags.join(', ')}</p>
                    </div>
                `;
            }
        });
    });
}

displayChampions();
