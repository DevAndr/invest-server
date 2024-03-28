import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = '../../config.yaml';

export default () => {
  const yamlConfig = readFileSync(
    join(__dirname, YAML_CONFIG_FILENAME),
    'utf8',
  );
  return yaml.load(yamlConfig) as Record<string, any>;
};
