# Svelte Adapter Express

Svelte Kit adapter that provides an example express server.

## Quickstart

To get a simple express server with compression, static files, and SvelteKit rendering:

```
npm i -D svelte-adapter-express
```

Add adapter to `svelte.config.cjs`:

```
const expressAdapter = require("svelte-adapter-express");

module.exports = {
  kit: {
    adapter: expressAdapter(),
  },
};
```

Then:

```
npm run build
```

Which will generate `./build/index.js` which can be run:

```
PORT=3000 node ./build/index.js
```

## Custom server

To run a customized server, start by copying the default server from the module:

```
mkdir -p adapter/express
cp node_modules/mankins/adapter-express/files/server.js adapter/express
```

Edit the `server.js` to meet your needs.

Then at build time refer to this custom server:

When configuring the adapter in `svelte.config.cjs`, add a `serverFile` parameter:

```
const path = require('path');
const expressAdapter = require("svelte-adapter-express");

module.exports = {
  kit: {
      		adapter: expressAdapter(
			{serverFile: path.join(__dirname, './adapter/express/server.js')}
		),
  },
};
```

Build / Run as normal

```
npm run build
PORT=3000 node ./build/index.js
````

