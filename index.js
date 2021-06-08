import { copyFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @param {{
 *   out?: string;
 * }} options
 */
export default function ({ out = 'build', assets = 'assets', serverFile = `${__dirname}/files/server.js` } = {}) {
	/** @type {import('@sveltejs/kit').Adapter} */
	const adapter = {
		name: '@mankins/svelte-adapter-express',

		async adapt({utils, config}) {
			utils.log.minor(`Copying assets to ${assets}`);
			const static_directory = join(out, assets);
			utils.copy_client_files(static_directory);
			utils.copy_static_files(static_directory);

			utils.log.minor('Copying server');
			utils.copy_server_files(out);

			copyFileSync(serverFile, `${out}/index.js`);

			utils.log.minor('Prerendering static pages');
			await utils.prerender({
				dest: `${out}/prerendered`
			});
		}
	};

	return adapter;
};
