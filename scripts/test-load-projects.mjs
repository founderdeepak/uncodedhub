import fs from 'fs';

const content = fs.readFileSync('src/data/projects.ts', 'utf8');
const startIndex = content.indexOf('export const PROJECTS: Project[] = [');
const arrayPart = content.slice(startIndex).replace('export const PROJECTS: Project[] =', 'export const PROJECTS =');

fs.writeFileSync('scripts/temp-projects.mjs', arrayPart, 'utf8');

const { PROJECTS } = await import('./temp-projects.mjs');
console.log('Successfully loaded projects:', PROJECTS.length);
console.log('Project 0:', PROJECTS[0].client, '| id:', PROJECTS[0].id);
console.log('Project 2:', PROJECTS[2].client, '| id:', PROJECTS[2].id);
fs.unlinkSync('scripts/temp-projects.mjs');
