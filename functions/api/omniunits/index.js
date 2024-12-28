export async function onRequest(context) {
    let responseText = await fetch('https://raw.githubusercontent.com/kresnasatya/bravefrontier/refs/heads/main/data/omniunits/raw.json');
    let rawData = await responseText.text();
    let omniUnits = JSON.parse(rawData);

    const url = new URL(context.request.url);

    let name = url.searchParams.get('name') || '';
    let element = url.searchParams.get('element') || '';
    let keywords = url.searchParams.get('keywords') || '';

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
    } else if (name) {
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