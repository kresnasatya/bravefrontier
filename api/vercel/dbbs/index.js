export default async (req, res) => {
    const protocol = req.headers['x-forwarded-proto'] || 'http'; // Vercel passes the protocol through this header
    const host = req.headers.host; // The host header contains the domain and port
    const origin = `${protocol}://${host}`;

    let esname = req.query.esname;
    let unitname = req.query.unitname;
    
    let response = await fetch(`${origin}/data/dbbs/raw.json`);
    let dbbs = await response.json();
    
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