/**
 * Simple generator script template.
 * Usage: node scripts/generateResolver.js MyNewResolver
 * This will print sample resolver code — integrate with your codegen tooling.
 */
const fs = require('fs')
const name = process.argv[2] || 'New'
console.log(`// Resolver template for ${name}`)
console.log(`const ${name} = { /* implement */ }`)
