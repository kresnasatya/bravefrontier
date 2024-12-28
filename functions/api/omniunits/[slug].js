export async function onRequest(context) {
    let responseText = await fetch('https://raw.githubusercontent.com/kresnasatya/bravefrontier/refs/heads/main/data/omniunits/raw.json');
    let rawData = await responseText.text();
    let omniUnits = JSON.parse(rawData);
    
    let slug = context.params.slug;
    let selectedUnit = {};
    for (let omniUnit of omniUnits) {
        if (omniUnit.slug === slug) {
            selectedUnit = omniUnit;
        }
    }

    const statusCode = (selectedUnit.hasOwnProperty('name')) ? 200 : 404;
    const result = (selectedUnit.hasOwnProperty('name')) 
        ? selectedUnit 
        : { message : `Unit ${slug} not found` };

    let response = new Response(JSON.stringify(result), {
        status: statusCode
    });
    
    response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=86400');
    response.headers.set('Content-Type', 'application/json');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET');

    return response;
}