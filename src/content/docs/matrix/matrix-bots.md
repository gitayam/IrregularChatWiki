---
title: "Matrix Bots"
---

# Matrix Bots

Return to [Server Guides](/server-guides/mantrix-with-ansible)

## GPT Bot

For setting up a GPT-powered bot, follow the instructions provided in the official documentation:

- [Matrix-Docker-Ansible-Deploy GPT Bot Guide](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/64db27c7faf3032341c665f8abf7aa66c7aa7aca/docs/configuring-playbook-bot-chatgpt.md?plain=1#L45)

### Required Setup

Before proceeding, ensure you have the following:

- **OpenAI GPT Models**: Detailed information can be found [here](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo).
- **GPT API Key**: Generate your API key [here](https://platform.openai.com/api-keys).
- **Pricing Information**: Understand GPT pricing [here](https://openai.com/pricing).

### Setting Up a Bot Account with SSO

Follow these steps to create a bot account using SSO:

1. **Create an account**: Register a bot account using your SSO provider.
2. Open a **private browser window** and log in to Matrix using the SSO.
3. Set up **recovery keys** for the account.
4. Obtain the **access token** for the bot account:
   - Navigate to **All Settings** in the Matrix client.
   - Go to **Help & About**.
   - Select **Access Token** and copy it.
5. **DO NOT LOG OUT**: Keep the session active.
6. Close the browser to maintain the session state.
7. Use the obtained access token to configure the bot.

**Important Note:**
For SSO accounts, removing the local password option is required to allow recovery keys to be set up. Ensure this is configured correctly before proceeding.

### Setting Up an Account with an Access Token

Refer to the discussion and solutions provided in the [GitHub Issue #2556](https://github.com/spantaleev/matrix-docker-ansible-deploy/issues/2556) for detailed guidance on using an access token for account setup.
