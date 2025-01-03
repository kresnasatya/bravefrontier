import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
    let esname = req.query.esname;
    let unitname = req.query.unitname;
    
    const filePath = path.join(process.cwd(), 'data', 'dbbs', 'raw.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    let dbbs = JSON.parse(fileContents);
    
    let result;

    if (esname && unitname) {
        result = dbbs.filter(dbb => {
            let esName = dbb.elementalSynergyName.toLowerCase();
            let firstUnitName = dbb.units[0].name.toLowerCase();
            let secondUnitName = dbb.units[1].name.toLowerCase();
            if (lowerCase(esname) === esName) {
                if (firstUnitName.includes(lowerCase(unitname)) || secondUnitName.includes(lowerCase(unitname))) {
                    return dbb;
                }
            }
        });
    } else if (esname)  {
        result = dbbs.filter(dbb => {
            let esName = dbb.elementalSynergyName.toLowerCase();
            if (lowerCase(esname) === esName) {
                return dbb;
            }
        });
    } else if (unitname) {
        result = dbbs.filter(dbb => {
            let firstUnitName = dbb.units[0].name.toLowerCase();
            let secondUnitName = dbb.units[1].name.toLowerCase();
            if (firstUnitName.includes(lowerCase(unitname)) || secondUnitName.includes(lowerCase(unitname))) {
                return dbb;
            }
        });
    } else {
        result = dbbs;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400');
    res.status(200).send(result);
}

function lowerCase(string) {
    return string.toLowerCase();
}