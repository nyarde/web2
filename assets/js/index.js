const grid = document.getElementById("grid");
const status = document.getElementById("status");

async function renderGrid() {
    try {
        const data = await fetch("https://api.modrinth.com/v2/search")
            .then(res => res.json());

        status.textContent = "";

        data.hits.forEach(mod => grid.appendChild(createCard(mod)));
    } catch(e) {
        status.textContent = "failed to load mods: " + e;
    }
}

function createCard(mod) {
    const card = document.createElement("a");
    card.className = "card";

    card.href = "mod.html?id=" + mod.project_id;
    card.innerHTML = `
        <img src="${mod.icon_url || ''}" alt="${mod.title}" class="icon">
        <h2>${mod.title}</h2>
        <p>${mod.description}</p>
        <small>${mod.downloads.toLocaleString()} downloads</small>
    `;
    return card;
}

renderGrid();