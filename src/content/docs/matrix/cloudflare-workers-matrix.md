---
title: "Cloudflare Workers - Matrix"
---

# Cloudflare Workers - Matrix

Return to [Return to matrix-server-guide](/server-guides/)

Source:https://appelman.se/matrix-on-cloudflare/ Cloudflare Workers are a serverless execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.

Here’s a step-by-step guide:


- **Log in to your Cloudflare account.**


Navigate to the account and domain where you want to create the worker.

- **Navigate to the Workers tab.**


This is located on the top menu. Clicking it will bring you to the Workers’ dashboard.

- **Click on the “Create a Worker” button.**


This will open a new page with a script template for your worker.

- **Replace the default script with your script.**


In the editor, delete the existing script and paste your script from my previous message.


Remember to replace `&quot;https://matrix.irregulars.io,&quot;`“https://vector.im,” and `&quot;matrix-fed.irregulars.io:8443&quot;` with your actual homeserver URL, identity server URL, and federation server, respectively.

- **Give your worker a name.**


The name is used to identify your worker, and it’s also used in the worker’s URL.

- **Click “Save and Deploy”.**


Your worker is now deployed and live. You can test it directly in the Workers dashboard by requesting your worker’s URL.


Now, your worker is ready. In the next step (which is the Step 2 from my previous message), you’ll need to set up routes to your worker so that the requests to `/.well-known/matrix/client` and `/.well-known/matrix/server` on your domain are handled by this worker.

```javascript
const HOMESERVER_URL = "https://matrix.example.com";
const IDENTITY_SERVER_URL = "https://vector.im";
const FEDERATION_SERVER = "matrix-fed.example.com:8443";

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    switch (path) {
      case "/.well-known/matrix/client":
        return new Response(
          `{"m.homeserver": {"base_url": "${HOMESERVER_URL}"},"m.identity_server": {"base_url": "${IDENTITY_SERVER_URL}"}}`
        );
      case "/.well-known/matrix/server":
        return new Response(`{"m.server": "${FEDERATION_SERVER}"}`);
      default:
        return new Response("Invalid request");
    }
  },
};
```
