const detail = document.getElementById("detail");
const status = document.getElementById("status");

const id = new URLSearchParams(window.location.search).get("id");

async function renderMod() {
    if (!id) {
        status.textContent = "No mod specified";
        return;
    }

    const mod = await fetch("https://api.modrinth.com/v2/project/" + id)
        .then(res => res.json());

    status.textContent = "";

    document.title = mod.title;

    detail.innerHTML = `
        <img src="${mod.icon_url || ''}" alt="${mod.title} icon">
        <h2>${mod.title}</h2>
        <p>${mod.description}</p>
        <ul>
            <li><b>Downloads:</b> ${mod.downloads.toLocaleString()}</li>
            <li><b>Followers:</b> ${mod.followers.toLocaleString()}</li>
            <li><b>Categories:</b> ${mod.categories.join(", ")}</li>
            <li><b>Loaders:</b> ${mod.loaders.join(", ")}</li>
            <li><b>Game versions:</b> ${mod.game_versions.slice(-5).join(", ")}</li>
            <li><b>License:</b> ${mod.license ? mod.license.name : "N/A"}</li>
        </ul>
        <a href="https://modrinth.com/mod/${mod.slug}" target="_blank">View on Modrinth</a>
    `;
}

renderMod();