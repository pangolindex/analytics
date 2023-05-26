const Mustache = require('mustache');
const path = require('node:path');
const fs = require('node:fs');

const deploymentName = process.env.DEPLOYMENT_NAME;
const CONFIG_PATH = path.resolve(__dirname);
const CONSTANTS_PATH = path.resolve(__dirname, '..', 'src', 'constants');

const deploymentOptions = fs.readdirSync(CONFIG_PATH)
  .map(path.parse)
  .filter((path) => path.ext === '.json')
  .map((path) => path.name);
if (!deploymentOptions.includes(deploymentName)) {
  throw new Error(`Deployment '${deploymentName}' has not been configured. Available options are: [${deploymentOptions.join(',')}]`);
}

const configPath = path.resolve(CONFIG_PATH, `${deploymentName}.json`);
const configRaw = fs.readFileSync(configPath, 'utf-8');
console.log(`Loaded mustache deployment config from ${configPath}`);

const templatePath = path.resolve(CONSTANTS_PATH, 'index.mustache');
const templateRaw = fs.readFileSync(templatePath, 'utf-8');
console.log(`Loaded mustache template from ${templatePath}`);

const templateRender = Mustache.render(templateRaw, JSON.parse(configRaw));
const templateOutputPath = path.resolve(CONSTANTS_PATH, 'index.js');
fs.writeFileSync(templateOutputPath, templateRender, 'utf-8');
console.log(`Rendered mustache template to ${templateOutputPath}`);
