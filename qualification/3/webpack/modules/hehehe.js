import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Are you DUCK?
 */
export const hehehe = {
  test: /\.hehehe$/,
  use: path.resolve(__dirname, '../loaders/hehehe-loader.js'),
};
