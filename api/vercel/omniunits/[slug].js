import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
    const filePath = path.join(process.cwd(), 'data', 'omniunits', 'raw.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    let omniUnits = JSON.parse(fileContents);
    
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