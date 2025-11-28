---
title: "Matrix Bots and Add Ons"
---

# Matrix Bots and Add Ons

## GPT Bot

This guide provides instructions for setting up a GPT-based bot within a Matrix environment, specifically using the configurations provided in the [matrix-docker-ansible-deploy](https://github.com/spantaleev/matrix-docker-ansible-deploy) project.

### Resources

- GPT Models: [GPT-4 and GPT-4 Turbo Documentation](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo)
- GPT API: [Obtain API Keys](https://platform.openai.com/api-keys)
- GPT Pricing: [Pricing Information](https://openai.com/pricing)

### Setting up a Bot Account with SSO

Follow these steps to set up a bot account with Single Sign-On (SSO):

1. Create an account using the SSO system.
2. Open a private browser window and log in to Matrix using the SSO credentials.
3. Set up recovery keys for the account.
4. Obtain the access token for the bot account:
   - Navigate to **All Settings**.
   - Go to **Help & About**.
   - Select **Access Token** to retrieve it.
5. Ensure you DO NOT log out after retrieving the token.
6. Close the browser window to maintain the session.
7. Use the access token for configuring the bot account.

**Note**: When using SSO, disabling the local password option is necessary for SSO users to set up recovery keys.

### Setting up an Account with Access Token

For additional details on setting up an account using an access token, refer to the relevant GitHub discussion:
[Account Setup with Access Token](https://github.com/spantaleev/matrix-docker-ansible-deploy/issues/2556)

### Reference

For configuration details and further instructions, consult the documentation:
[Full Configuration Guide](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/64db27c7faf3032341c665f8abf7aa66c7aa7aca/docs/configuring-playbook-bot-chatgpt.md)
