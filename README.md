# Brave Frontier Wiki

Brave Frontier Wiki Unofficial for Omniunits and Dual Brave Burst (DBB)s hosted in trio Serverless: Cloudflare, Netlify, and Vercel. This project is an experiment how to deploy web app and API into trio popular serverless functions like Cloudflare, Netlify, and Vercel into a single repository.

## Features

- Get list of omni units
- Filter omni units based on name, element and **keywords**.
- Display detail of omni unit (Leader Skill, Extra Skill, Brave Burst, Super Brave Burst, Ultimate Brave Burst, Enhancements, SP Recommendation).
- Share detail of omni unit with Web Share API.
- Get list of Dual Brave Burst (DBB) of omni units.
- Filter DBBs based on name, elemental synergy and **keywords**.

## API

You can use one of three domains below to access the API.

- Cloudflare: https://bravefrontier.pages.dev
- Netlify: https://bravefrontier.netlify.app
- Vercel: https://bravefrontier.vercel.app

### Endpoint

List of available endpoints are omni units and DBB (Dual Brave Burst).

#### Omni Units

`/api/omniunits` => Get list of omni units.

You may also get specific list of omni units by param search like `name` and `element`.

- `/api/omniunits?name=war` => By name.
- `/api/omniunits?element=fire` => By element. Available elements are fire, earth, water, thunder, dark, light.
- `/api/omniunits?name=sun&element=fire` => By name and element.

`/api/omniunits/ignis-halcyon-vargas` => Get detail of omni unit by using slug of omniunit.

#### DBB

`/api/dbbs` => => Get list of dual brave burst.

You may also get specific list of dbbs by param search like `esname` and `unitname`.

- `/api/dbbs?esname=aurora` => By Elemental Strategy. Available elemental strategies are abyss, aurora, blast, blaze, cyclone, eruption, magma, miasma, mist, obsidian, nova, plasma, prism, pyre, quagmire, radiance, steam, tempest, tremor, tsunami, twilight.
- `/api/dbbs?unitname=tilith` => By omni unit name.
- `/api/dbbs?esname=aurora&unitname=tilith` => By elemental strategy and omni unit name.

### How to run?

> This project requires Node JS version 20.

This project require [Netlify CLI](https://cli.netlify.com/netlify-dev/) and [Vercel CLI](https://vercel.com/docs/cli).

- Clone this project.
- Install dependencies with `pnpm install`.
- Run `netlify dev` in first terminal.
- Run `vercel dev` in second terminal.
- Run `pnpm run pages:dev` in third terminal.