import { copyFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @param {{
 *   out?: string;
 * }} options
 */
export default function({
  out = 'build',
  assets = 'assets',
  serverFile = `${__dirname}/files/server.js`
} = {}) {
  /** @type {import('@sveltejs/kit').Adapter} */
  const adapter = {
    name: '@mankins/svelte-adapter-express',

    async adapt(builder) {
      builder.log.minor(`Copying assets to ${assets}`);
      const static_directory = join(out, assets);
      builder.writeClient(static_directory);

      builder.log.minor('Copying server');
      builder.writeServer(out);

      copyFileSync(serverFile, `${out}/index.js`);

      builder.log.minor('Prerendering static pages');
      await builder.writePrerendered(`${out}/prerendered`);
    }
  };

  return adapter;
};
