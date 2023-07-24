const ENDPOINT = 'https://raw.githubusercontent.com/kresnasatya/bfwiki-data/main/data/omniunits/raw.json';

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Content-Type': 'application/json',
};

export const handler = async (event, context) => {
    let response, body;

    try {
        response = await fetch(ENDPOINT);
        body = await response.text();
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers,
            body: JSON.stringify({
                error: err.message
            })
        }
    }

    const omniUnits = JSON.parse(body);
    console.log(event);
    // console.log(context);
    const pathParts = (event.path) ? event.path.split('/') : [];
    if (pathParts[3]) {
        let name = pathParts[3];
        let selectedUnit = {};
        for (let omniUnit of omniUnits) {
            if (omniUnit.name === name.split('_').join(' ').trim()) {
                selectedUnit = omniUnit;
            }
        }

        const statusCode = (selectedUnit.hasOwnProperty('name')) ? 200 : 404;
        const result = (selectedUnit.hasOwnProperty('name')) 
            ? selectedUnit 
            : { message : `Unit ${name} not found` };

        return {
            statusCode: statusCode,
            headers,
            body: JSON.stringify(result)
        };
    }

    let name = event.queryStringParameters.name;
    let element = event.queryStringParameters.element;
    let keywords = event.queryStringParameters.keywords;
    
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

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result)
    };
}

function lowerCase(string) {
    return string.toLowerCase();
}

function createKeywords(string) {
    return string.toLowerCase().replace(/\s*,\s*/g, ",").split(",");
}