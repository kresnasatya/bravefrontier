import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
    let name = req.query.name;
    let element = req.query.element;
    let keywords = req.query.keywords;
    
    const filePath = path.join(process.cwd(), 'data', 'omniunits', 'raw.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    let omniUnits = JSON.parse(fileContents);

    let result;
    if (name && element && keywords) {
        result = omniUnits.filter(unit => {
            let unitName = unit.name.toLowerCase();
            let unitElement = unit.element.toLowerCase();
            for (const key of createKeywords(keywords)) {
                for (let keyword of unit.keywords) {
                    keyword = keyword.toLowerCase();
                    if (keyword.includes(key)) {
                        return (unitName.includes(lowerCase(name)) && unitElement.includes(lowerCase(element)));
                    }
                }
            }
        });
    } else if (name)  {
        result = omniUnits.filter(unit => {
            let unitName = unit.name.toLowerCase();
            return unitName.includes(lowerCase(name));
        });
    } else if (element) {
        result = omniUnits.filter(unit => {
            let unitElement = unit.element.toLowerCase();
            return unitElement.includes(lowerCase(element));
        });
    } else if (keywords) {
        result = omniUnits.filter(unit => {
            for (const key of createKeywords(keywords)) {
                if (unit.keywords.length >= 1) {
                    for (let keyword of unit.keywords) {
                        keyword = keyword.toLowerCase();
                        if (keyword.includes(key)) {
                            return unit;
                        }
                    }   
                }
            }
        })
    } else {
        result = omniUnits;
    }

    for (const omniUnit of result) {
        delete omniUnit.artwork;
        delete omniUnit.spRecommendation;
        delete omniUnit.skills;
        delete omniUnit.enhancements;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400');
    res.status(200).send(result);
}

function lowerCase(string) {
    return string.toLowerCase();
}

function createKeywords(string) {
    return string.toLowerCase().replace(/\s*,\s*/g, ",").split(",");
}