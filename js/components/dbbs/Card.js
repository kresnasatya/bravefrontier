export default function (dbb) {
    let htmlString = ``;
    for (const unit of dbb.units) {
        htmlString += `<a href="/omniunits/${unit.slug}">
                    <img class="mx-4" data-src="${unit.thumbnail}" width="50" height="50" alt="${unit.name}'s thumbnail" />
        </a>`;
    }
    return document.createRange().createContextualFragment(`
    <li class="dbb-card">
        <div class="dbb-card-container">
            <p class="dbb-elemental-synergy">${dbb.elementalSynergyName}</p>
            <div class="flex m-4">
                ${htmlString}
            </div>
            <p class="dbb-card-name">${dbb.dbbName}</p>
        </div>
        <div class="dbb-card-desc-wrapper">
            <p class="dbb-card-desc">${dbb.dbbDesc}</p>
        </div>
    </li>
    `);
}