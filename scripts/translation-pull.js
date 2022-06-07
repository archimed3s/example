require('dotenv').config({ path: './.env.local' });
const request = require('request');
const unzipper = require('unzipper');
const fs = require('fs');

const { LokaliseApi } = require('@lokalise/node-api');

// Try with PL token for now
const API_TOKEN = "179f08e516c2737128241da82eddba087f39bf06";
const PROJECT_ID = process.env.LOKALISE_PROJECT_ID;

const SUPPORTED_LOCALES = ['en_AU', 'en_CA', 'fr_CA'];
const PATH_TO_LANG = './lang/raw';

const getLastElementAfterMatch = (string, searchValue) => {
  const arr = string.split(searchValue);
  return arr[arr.length - 1];
};

const run = async () => {
  const lokaliseApi = new LokaliseApi({ apiKey: API_TOKEN });
  const projects = await lokaliseApi.projects().list();
  console.log('Projects in Lokalise: ', projects);

  const { bundle_url } = await lokaliseApi
    .files()
    .download(PROJECT_ID, { format: 'json', original_filenames: true })
    .catch((err) => {
      console.log('Failed to download lokalise files', err);
    });

  const directory = await unzipper.Open.url(request, bundle_url);
  const files = directory.files.filter((d) => {
    const fileName = getLastElementAfterMatch(d.path, '/');

    if (!fileName) {
      return false;
    }

    const localName = fileName.split('.')[0];

    return SUPPORTED_LOCALES.includes(localName);
  });

  const filesWithJson = await Promise.all(
    files.map(async (file) => ({ fileName: getLastElementAfterMatch(file.path, '/'), content: await file.buffer() })),
  ).catch((err) => {
    console.log('Failed to write files', err);
  });

  filesWithJson.forEach((file) => {
    fs.writeFile(`${PATH_TO_LANG}/${file.fileName}`, file.content, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
};

run();
