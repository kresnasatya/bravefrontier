# Brave Frontier Wiki Unofficial

Brave Frontier Wiki Unofficial for Omniunits and Dual Brave Burst (DBB)s hosted in Netlify. 
Site URL: https://bravefrontier.netlify.app.

## Features

- [x] Get list of omni units
- [x] Filter omni units based on name, element and **keywords**.
- [x] Display detail of omni unit (Leader Skill, Extra Skill, Brave Burst, Super Brave Burst, Ultimate Brave Burst, Enhancements, SP Recommendation).
- [x] Share detail of omni unit with Web Share API.
- [x] Get list of Dual Brave Burst (DBB) of omni units.
- [x] Filter DBBs based on name, elemental synergy and **keywords**.

## API

### List of Omni Units

To get list of omni units please go to: https://bravefrontier.netlify.app/api/omniunits. You can also get specific list of omni units by param search like `name` and `element`.

Example:

1. By `name` https://bravefrontier.netlify.app/api/omniunits?name=war
2. By `element` https://bravefrontier.netlify.app/api/omniunits?element=fire
3. By `name` and `element` https://bravefrontier.netlify.app/api/omniunits?name=sun&element=fire

## Detail of Omni Unit

To get detail of omni unit, you should use `name` of omni unit as path and if space(s) exist in omni unit's name then you should replace them with underscrore (_).

Here's is example:

1. Ignis Halcyon Vargas = https://bravefrontier.netlify.app/api/omniunits/Ignis_Halcyon_Vargas
2. Fearless Tate & Tama = https://bravefrontier.netlify.app/api/omniunits/Fearless_Tate_&_Tama
3. Kranus, the Argen = https://bravefrontier.netlify.app/api/omniunits/Kranus,_the_Argent

## Technology

This project design with Vite powered by Netlify.

Data comes from [kresnasatya/bravefrontier-data](https://github.com/kresnasatya/bravefrontier-data).

### How to run?

> This project require [Netlify CLI](https://cli.netlify.com/netlify-dev/) so please make sure you install it!

**Note: this project requires Node JS version 18**
- Clone this project.
- Install dependencies with `pnpm install`.
- Run `netlify dev`.