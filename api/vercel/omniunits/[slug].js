export default async (req, res) => {
    const protocol = req.headers['x-forwarded-proto'] || 'http'; // Vercel passes the protocol through this header
    const host = req.headers.host; // The host header contains the domain and port
    const origin = `${protocol}://${host}`;

    let response = await fetch(`${origin}/data/omniunits/raw.json`);
    let omniUnits = await response.json();
    
    let slug = req.query.slug;
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

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate');
    res.status(statusCode).send(result);
}