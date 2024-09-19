import { DOMParser } from 'linkedom';

const getUnitBio = async (unitLink) => {
    const response = await fetch(unitLink);
    if (response.ok) {
        const text = await response.text();
        return text;
    }
}

export default async (units) => {
    try {
        for (const unit of units) {
            console.log(`${unit.id}. ${unit.name}: start get profile`);
            let text = await getUnitBio(unit.link);
            const document = (new DOMParser).parseFromString(text, "text/html");
            const unitArtwork = document.querySelector('div[style="text-align:center; padding-top:21px; height:170px; vertical-align:middle; display:table-cell; width:210px;"] > center > a > img').getAttribute('src');
            unit.artwork = unitArtwork;
            console.log(`${unit.id}. ${unit.name}: done get profile`);
        }
    } catch (error) {
        console.error(error);
    }
}