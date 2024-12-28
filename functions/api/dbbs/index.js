export async function onRequest(context) {
    let responseText = await fetch('https://raw.githubusercontent.com/kresnasatya/bravefrontier/refs/heads/main/data/dbbs/raw.json');
    let rawData = await responseText.text();
    let dbbs = JSON.parse(rawData);

    const url = new URL(context.request.url);
    let unitname = url.searchParams.get('unitname') || '';
    let esname = url.searchParams.get('esname') || '';

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

    let response = new Response(JSON.stringify(result), {
        status: 200
    });

    response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=86400');
    response.headers.set('Content-Type', 'application/json');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET');

    return response;
}

function lowerCase(string) {
    return string.toLowerCase();
}