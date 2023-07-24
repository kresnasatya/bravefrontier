import fetch from 'node-fetch';

const ENDPOINT = 'https://raw.githubusercontent.com/kresnasatya/bfwiki-data/main/data/dbbs/raw.json';

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Content-Type': 'application/json',
};

export const handler = async (event, callback) => {
    let response, body;
    
    try {
        response = await fetch(ENDPOINT);
        body = await response.text();

        dbbs = JSON.parse(body);

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