import fetch from 'node-fetch';

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Content-Type': 'application/json',
};

export const handler = async (event, callback) => {
    const url = new URL(event.rawUrl);
    
    try {
        let response = await fetch(`${url.origin}/data/dbbs/raw.json`);
        let dbbs = await response.json();

        let unitname = event.queryStringParameters.unitname;
        let esname = event.queryStringParameters.esname;

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
    
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result)
        };
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers,
            body: JSON.stringify({
                error: err.message
            })
        }
    }

    
}

function lowerCase(string) {
    return string.toLowerCase();
}