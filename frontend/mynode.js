const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({ path: '.env' });;

const envFile = `export const environment = {
    weatherApiKey: "${process.env.WEATHER_API_KEY}",
    backendUrl: "${process.env.BACKEND_URL}",
    domain: "${process.env.DOMAIN}",
    clientId: "${process.env.CLIENT_ID}",

};`;

const targetPath = path.join(__dirname, 'src/environments/environment.development.ts');
const targetProdPath = path.join(__dirname, 'src/environments/environment.ts');

fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);
        console.log(envFile)
    }
});

fs.writeFile(targetProdPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environment.ts`);
        console.log(envFile)
    }
});