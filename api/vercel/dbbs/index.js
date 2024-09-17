const ENDPOINT = 'https://raw.githubusercontent.com/kresnasatya/bravefrontier-data/main/data/dbbs/raw.json';

export default async (req, res) => {
    let esname = req.query.esname;
    let unitname = req.query.unitname;
    
    let response = await fetch(ENDPOINT);
    let body = await response.text();
    const dbbs = JSON.parse(body);
    
    let result;

    if (esname && unitname) {
        result = dbbs.filter(dbb => {
            let esName = dbb.elementalSynergyName.toLowerCase();
            let firstUnitName = dbb.firstUnitName.toLowerCase();
            let secondUnitName = dbb.secondUnitName.toLowerCase();
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
            let firstUnitName = dbb.firstUnitName.toLowerCase();
            let secondUnitName = dbb.secondUnitName.toLowerCase();
            if (firstUnitName.includes(lowerCase(unitname)) || secondUnitName.includes(lowerCase(unitname))) {
                return dbb;
            }
        });
    } else {
        result = dbbs;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate');
    res.status(200).send(result);
}

function lowerCase(string) {
    return string.toLowerCase();
}