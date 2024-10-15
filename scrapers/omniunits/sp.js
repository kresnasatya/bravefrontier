import { DOMParser } from 'linkedom';

const getUnitSP = async (link) => {
    const response = await fetch(link);
    if (response.ok) {
        const text = await response.text();
        return text;
    }    
}

export default async (omniUnits) => {
    try {
        for (const unit of omniUnits) {
            console.log(`${unit.id}. ${unit.name}: start get specialty points`);
            let text = await getUnitSP(`${unit.link}/Builds`);
            if (text !== undefined) {
                const document = (new DOMParser).parseFromString(text, "text/html");
                const contents = Array.from(document.querySelectorAll('div[style="float:left; width: 640px; margin: 0 0.5em 0 0.5em;"]'));

                // Get first index of contents
                const enhancementsTable = contents[0];
                const enhancementsBody = enhancementsTable.querySelector('div > table:nth-of-type(2) tbody');
                const enhancementsRows = Array.from(enhancementsBody.querySelectorAll('tr'));

                // Remove first and second rows
                enhancementsRows.shift();
                enhancementsRows.shift();

                let enhancements = [];
                for (let i = 0; i < enhancementsRows.length; i++) {
                    const row = enhancementsRows[i];
                    const columns = row.querySelectorAll('td');
                    let cost, option, detail_option;
                    for (let j = 0; j < columns.length; j++) {
                        const column = columns[j];
                        if (row.querySelectorAll('td').length > 1) {
                            if (j === 2) {
                                cost = parseInt(column.textContent.trim());
                            }

                            if (j === 3) {
                                option = column.childNodes[0].textContent.trim();
                                if (column.querySelector('span')) {
                                    detail_option = column.childNodes[1].textContent.trim();
                                }
                            }
                        }
                    }
                    enhancements.push({ cost, option, detail_option });
                }
                unit.enhancements = enhancements;

                // Remove the first index of element
                contents.shift();
                if (Array.isArray(contents) && contents.length > 0) {
                    let spRecommendation = [];
                    for (let i = 0; i < contents.length; i++) {
                        const content = contents[i];

                        const body = content.querySelector('table[class="article-table tight"] tbody');
                        if (body !== null) {
                            let analysis;
                            const title = content.querySelector('h2 > span').textContent;
                            const rows = Array.from(body.querySelectorAll('tr'));
                            // Pattern: remove the first of three rows.
                            rows.shift();
                            rows.shift();
                            rows.shift();

                            let sp = [];
                            let newRows = [];
                            rows.filter(row => {
                                if (!row.hasAttribute('style')) {
                                    newRows.push(row);
                                }
                            });

                            for (let j = 0; j < newRows.length; j++) {
                                const row = newRows[j];
                                const columns = row.querySelectorAll('td');
                                let cost, option;
                                for (let k = 0; k < columns.length; k++) {
                                    const column = columns[k];
                                    if (row.querySelectorAll('td').length > 1) {
                                        if (k === 0) {
                                            cost = parseInt(column.textContent.trim());
                                        } else {
                                            option = column.textContent.trim();
                                        }
                                    } else {
                                        analysis = column.textContent.trim();
                                    }
                                }
                                sp.push({ cost, option });
                            }

                            let filteredSP = sp.filter(function ({ cost, option }) {
                                const key = `${cost}${option}`;
                                return !this.has(key) && this.add(key);
                            }, new Set);

                            let initialValue = 0;
                            let total = filteredSP.reduce((accumulator, currentValue) => {
                                return accumulator + currentValue.cost;
                            }, initialValue);

                            spRecommendation.push({ title, analysis, total, list: filteredSP });
                            unit.spRecommendation = spRecommendation;
                        }
                    }
                }
            }
            console.log(`${unit.id}. ${unit.name}: done get specialty points`);
        }
    } catch (error) {
        console.log(error);
    }
}