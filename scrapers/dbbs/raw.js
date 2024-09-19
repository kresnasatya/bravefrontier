import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { performance } from 'perf_hooks';
import { DOMParser } from 'linkedom';
import { fileURLToPath } from 'url';
import { milisConverter } from '../helper.js';
import keywords from './keywords.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputFile = path.join(__dirname, '..', '..', 'data', 'dbbs', 'raw.json');
const omniUnitsFile = path.join(__dirname, '..', '..', 'data', 'omniunits', 'raw.json');

const sourceUrl = 'https://bravefrontierglobal.fandom.com/wiki/List_of_Units_with_Dual_Brave_Burst';

(async () => {
    try {
        console.log(`\n Scraping dbbs start! \n`);
        const t0 = performance.now();
        const response = await fetch(sourceUrl);
        const text = await response.text();
        const document = (new DOMParser).parseFromString(text, "text/html");
        var table = document.querySelector('table.article-table.article-table-selected');

        const rows = Array.from(table.querySelectorAll('tr'));
        // shift first row
        rows.shift();
        let dbbs = [];
        let number = 1;
        for (let i = 0; i < rows.length; i++) {
            const columns = rows[i].querySelectorAll('td');
            let dbbId = number;
            let units = [];
            let releaseDate, elementalSynergyName, elementalSynergyDesc, dbbName, dbbDesc;
            for (let j = 0; j < columns.length; j++) {
                const column = columns[j];
                switch (j) {
                    case 0:
                        let first_unit, second_unit = {};
                        first_unit = { name: column.querySelectorAll('a')[1].textContent.trim() };
                        second_unit = { name: column.querySelectorAll('a')[3].textContent.trim() };
                        units.push(first_unit, second_unit);
                        releaseDate = column.querySelector('center > small').textContent.replace('Released: ', '').trim();
                        break;
                    case 1:
                        elementalSynergyName = column.childNodes[0].textContent.trim().replace(':', '');
                        elementalSynergyDesc = column.childNodes[1].textContent.trim();
                        break;
                    case 2:
                        dbbName = column.childNodes[0].textContent.replace(':', '').trim();
                        dbbDesc = column.childNodes[1].textContent.trim();
                        break;
                }
            }

            dbbs.push({ units, releaseDate, elementalSynergyName, elementalSynergyDesc, dbbId, dbbName, dbbDesc });
            number++;
        }

        const omniUnitsText = await fsPromises.readFile(omniUnitsFile, 'utf8');
        const omniUnits = JSON.parse(omniUnitsText);

        // Create keywords, get firstUnitId and secondUnitId
        dbbs.map(dbb => {
            for (const dbb_unit of dbb.units) {
                for (const unit of omniUnits) {
                    if (dbb_unit.name === unit.name) {
                        dbb_unit.id = unit.id;
                        dbb_unit.thumbnail = unit.thumbnail;
                        dbb_unit.slug = unit.slug;
                    }
                }
            }
            
            let selectedKeywords = [];
            const dbbDesc = dbb.dbbDesc.toLowerCase();
            for (const keyword of keywords) {
                if (dbbDesc.includes(keyword.toLowerCase())) {
                    selectedKeywords.push(keyword);
                }
            }
            dbb.keywords = [...new Set(selectedKeywords)];
            return dbb;
        });

        // Sort by id
        dbbs.sort((a, b) => parseInt(b.dbbId) - parseInt(a.dbbId));

        dbbs.filter(dbb => {
            delete dbb.id;
            return dbb;
        });
        
        fs.writeFile(outputFile, JSON.stringify(dbbs, null, " "), err => {
            if (err) {
                console.log(err);
            }
            console.log(`\n Scraping dbbs finish! Success export ${dbbs.length} dbbs to ${outputFile}. \n`);
    
            const t1 = performance.now();
            console.log(`\n Process took: ${milisConverter(t1 - t0)}. \n`);
        });
    } catch (error) {
        console.log(error);
    }

})();