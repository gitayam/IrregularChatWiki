---
title: "Matrix Federation with Cloudflare Workers"
---

# Matrix Federation with Cloudflare Workers

## Setting Up Matrix on Cloudflare Workers
Cloudflare Workers are a serverless execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.

Source for this guide: [Matrix on Cloudflare](https://appelman.se/matrix-on-cloudflare/)

### Step-by-Step Guide
Follow these steps to configure Matrix using Cloudflare Workers:

1. **Log in to your Cloudflare account.**
Navigate to the account and domain where you want to create the worker.

1. **Navigate to the Workers tab.**
This is located on the top menu. Clicking it will bring you to the Workers’ dashboard.

1. **Click on the “Create a Worker” button.**
This will open a new page with a script template for your worker.

1. **Replace the default script with your script.**
In the editor, delete the existing script and paste the following script.
Replace:

- `"https://matrix.example.com"` with your actual homeserver URL.

- `"https://vector.im"` with your identity server URL.

- `"matrix-fed.example.com:8443"` with your federation server.

```
const HOMESERVER_URL = "https://matrix.example.com";
const IDENTITY_SERVER_URL = "https://vector.im";
const FEDERATION_SERVER = "matrix-fed.example.com:8443";

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    switch (path) {
      case "/.well-known/matrix/client":
        return new Response(
          JSON.stringify({
            "m.homeserver": { "base_url": HOMESERVER_URL },
            "m.identity_server": { "base_url": IDENTITY_SERVER_URL }
          }),
          { headers: { "Content-Type": "application/json" } }
        );
      case "/.well-known/matrix/server":
        return new Response(
          JSON.stringify({ "m.server": FEDERATION_SERVER }),
          { headers: { "Content-Type": "application/json" } }
        );
      default:
        return new Response("Invalid request", { status: 404 });
    }
  },
};
```

1. **Give your worker a name.**
The name identifies your worker and is used in the worker’s URL.

1. **Click “Save and Deploy”.**
Your worker is now deployed and live. You can test it directly in the Workers dashboard by requesting your worker’s URL.

### Setting Up Routes
Once your worker is deployed, set up routes to ensure requests to the following endpoints are handled by the worker:

- `/.well-known/matrix/client`

- `/.well-known/matrix/server`

You can configure these routes in your Cloudflare dashboard under the **Workers > Routes** section.

### Categories
[Management]
