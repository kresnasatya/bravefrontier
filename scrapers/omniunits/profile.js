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
            console.log(`${unit.id}. ${unit.name}: start get ls, es, bb, sbb, ubb`);
            let text = await getUnitBio(unit.link);
            const document = (new DOMParser).parseFromString(text, "text/html");
            const $skills = document.querySelector('div[style="line-height:1.25;"]');
            const lsName = $skills.querySelector('div[style="padding:3px 12px;white-space:nowrap;"]').textContent.replace('Leader Skill:', '').trim();
            const lsDesc = $skills.querySelectorAll('div[style="padding:3px 12px 6px 12px;"]')[0].childNodes[0].textContent.trim();
            const ls = { lsName, lsDesc };

            const esName = $skills.querySelectorAll('div[style="border-top:1px solid #ccc; padding:3px 12px;white-space:nowrap;"]')[0].querySelector('b').textContent.replace('Extra Skill:', '').trim();
            const esDesc = $skills.querySelectorAll('div[style="padding:3px 12px 6px 12px;"]')[1].childNodes[0].textContent.trim();
            const es = { esName, esDesc };

            const bbName = $skills.querySelectorAll('div[style="border-top:1px solid #ccc; padding:3px 12px;white-space:nowrap;"]')[1].querySelector('i').textContent.trim();
            const bbDesc = $skills.querySelectorAll('div[style="padding:3px 12px 6px 12px;"]')[2].childNodes[0].textContent.trim();
            const bb = { bbName, bbDesc };

            const sbbName = $skills.querySelectorAll('div[style="border-top:1px solid #ccc; padding:3px 12px;white-space:nowrap;"]')[2].querySelector('i').textContent.trim();
            const sbbDesc = $skills.querySelectorAll('div[style="padding:3px 12px 6px 12px;"]')[3].childNodes[0].textContent.trim();
            const sbb = { sbbName, sbbDesc };

            const ubbName = $skills.querySelectorAll('div[style="border-top:1px solid #ccc; padding:3px 12px;white-space:nowrap;"]')[3].querySelector('i').textContent.trim();
            const ubbDesc = $skills.querySelectorAll('div[style="padding:3px 12px 6px 12px;"]')[4].childNodes[0].textContent.trim();
            const ubb = { ubbName, ubbDesc };

            const skills = [];
            skills.push(ls, es, bb, sbb, ubb);
            unit.skills = skills;
            console.log(`${unit.id}. ${unit.name}: done get ls, es, bb, sbb, ubb`);
        }
    } catch (error) {
        console.error(error);
    }
}