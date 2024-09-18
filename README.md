# Brave Frontier Wiki

Brave Frontier Wiki Unofficial for Omniunits and Dual Brave Burst (DBB)s hosted in Netlify and Vercel. This project is an experiment how to deploy web app and API into duo popular serverless functions (Netlify and Vercel) in single repository.

Netlify: https://bravefrontier.netlify.app

Vercel: https://bravefrontier.vercel.app

## Features

- Get list of omni units
- Filter omni units based on name, element and **keywords**.
- Display detail of omni unit (Leader Skill, Extra Skill, Brave Burst, Super Brave Burst, Ultimate Brave Burst, Enhancements, SP Recommendation).
- Share detail of omni unit with Web Share API.
- Get list of Dual Brave Burst (DBB) of omni units.
- Filter DBBs based on name, elemental synergy and **keywords**.

## API

### Omni Units

To get list of omniunits use `/api/omniunits`.

Netlify: https://bravefrontier.netlify.app/api/omniunits

Vercel: https://bravefrontier.vercel.app/api/omniunits


You can also get specific list of omni units by param search like `name` and `element`.

Example:

1. By `name` 

Netlify: https://bravefrontier.netlify.app/api/omniunits?name=war

Vercel: https://bravefrontier.vercel.app/api/omniunits?name=war

2. By `element` https://bravefrontier.netlify.app/api/omniunits?element=fire

Netlify: https://bravefrontier.netlify.app/api/omniunits?element=fire

Vercel: https://bravefrontier.vercel.app/api/omniunits?element=fire

3. By `name` and `element`

Netlify: https://bravefrontier.netlify.app/api/omniunits?name=sun&element=fire

Vercel: https://bravefrontier.vercel.app/api/omniunits?name=sun&element=fire

### Detail of Omni Unit

To get detail of omni unit, use slug of omni unit. To see the omni unit slug, please see in get omni units API.

Example:

Netlify: https://bravefrontier.netlify.app/omniunits/ignis-halcyon-vargas

Vercel: https://bravefrontier.vercel.app/omniunits/ignis-halcyon-vargas

### How to run?

> This project requires Node JS version 18

This project require [Netlify CLI](https://cli.netlify.com/netlify-dev/) and [Vercel CLI](https://vercel.com/docs/cli).

- Clone this project.
- Install dependencies with `pnpm install`.
- Run `netlify dev` in first terminal.
- Run `vercel dev` in second terminal.