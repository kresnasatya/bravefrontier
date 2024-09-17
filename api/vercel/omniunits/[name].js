const ENDPOINT = 'https://raw.githubusercontent.com/kresnasatya/bravefrontier-data/main/data/omniunits/raw.json';

export default async (req, res) => {
    let response = await fetch(ENDPOINT);
    let body = await response.text();
    const omniUnits = JSON.parse(body);
    
    let name = req.query.name;
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

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate');
    res.status(statusCode).send(result);
}