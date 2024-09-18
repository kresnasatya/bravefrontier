import * as fs from 'node:fs';

/**
 * @param {string} name
 */
function createSlug(name) {
    return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hypens
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
}

function reorderKeys(obj, keyToMove, keyToPlaceAfter) {
    const result = {};
    
    for (let key in obj) {
        if (key === keyToMove) continue; // Skip this key for now
        
        result[key] = obj[key];
        
        if (key === keyToPlaceAfter) {
            result[keyToMove] = obj[keyToMove]; // Place the moved key right after
        }
    }
    return result;
}

const fileName = 'raw.json';

fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Parse the JSON data
        let jsonData = JSON.parse(data);
        // Iterate through the array of objects
        jsonData = jsonData.map((/** @type {{ slug: void; name: string; }} */ obj) => {
            // Create a slug from the name and add it to the object
            obj.firstUnitSlug = createSlug(obj.firstUnitName);
            obj.secondUnitSlug = createSlug(obj.secondUnitName);
            // Replace value of thumbnail and artwork
            obj.firstUnitThumbnail = `https://res.cloudinary.com/satyakresna/image/upload/bravefrontier/omniunits/thumbnails/${obj.firstUnitId}`;
            obj.secondUnitThumbnail = `https://res.cloudinary.com/satyakresna/image/upload/bravefrontier/omniunits/thumbnails/${obj.secondUnitId}`;

            obj = reorderKeys(obj, "firstUnitSlug", "firstUnitName");
            obj = reorderKeys(obj, "secondUnitSlug", "secondUnitName");
            obj = reorderKeys(obj, "secondUnitSlug", "secondUnitName");
            return obj;
        });

        // Convert the updated data back to JSON
        const updatedData = JSON.stringify(jsonData, null, " ");

        // Write the updated data back to the title
        fs.writeFile(fileName, updatedData, 'utf-8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File updated successfully');
            }
        })
    } catch (error) {
        console.log('Error parsing JSON: ', error);
    }
});

// fs.readFile(fileName, 'utf-8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }

//     try {
//         // Parse the JSON data
//         let jsonData = JSON.parse(data);
//         // Iterate through the array of objects
//         jsonData = jsonData.map((/** @type {{ slug: void; name: string; }} */ obj) => {
//             obj = reorderKeys(obj, "slug", "name");

//             return obj;
//         });

//         // Convert the updated data back to JSON
//         const updatedData = JSON.stringify(jsonData, null, " ");

//         // Write the updated data back to the title
//         fs.writeFile(fileName, updatedData, 'utf-8', (err) => {
//             if (err) {
//                 console.error('Error writing file:', err);
//             } else {
//                 console.log('File updated successfully');
//             }
//         })
//     } catch (error) {
//         console.log('Error parsing JSON: ', error);
//     }
// });