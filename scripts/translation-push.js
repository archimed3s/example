require('dotenv').config({ path: './.env.local' });
const translationsJSON = require('../lang/raw/en.json')

const { LokaliseApi } = require('@lokalise/node-api');

const API_TOKEN = process.env.LOKALISE_API_TOKEN;
const PROJECT_ID = process.env.LOKALISE_PROJECT_ID;

const run = async () => {
  const lokaliseApi = new LokaliseApi({ apiKey: API_TOKEN });

  const translations = Buffer.from(JSON.stringify(translationsJSON)).toString('base64');

  await lokaliseApi.files().upload(PROJECT_ID, { data: translations, filename: 'en.json', lang_iso: 'en' });
};

run();
