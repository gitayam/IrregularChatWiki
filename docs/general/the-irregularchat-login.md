---
title: "The IrregularChat Login"
---

# The IrregularChat Login

## About The IrregularChat Login
> Using a self-hosted, open-source identity provider means prioritizing security and taking control of your most sensitive data. With Authentik, you no longer need to continually place your trust in a third-party service.

The IrregularChat Login is powered by Authentik after we tested different options including local login, GitHub, KeyCloak, and Google. Regardless of which solution we chose, the decision to use an identity provider like Authentik was guided by the need for secure, flexible, and scalable solutions for our community. More insights can be found here: [Authentik Blog Post on Identity Solutions](https://goauthentik.io/blog/2024-07-11-identity-self-hosted-or-in-the-cloud).

Issues with previous identity solutions:

- **Local Login**: One login per account is inconvenient and less secure, especially when users don’t always have access to a password manager. Local logins also present more vulnerabilities and require constant patching. As our community grows, this solution is not sustainable.

- **GitHub**: Surprisingly, only a small portion of our members had GitHub accounts. While we attempted to use it as a forcing function, it became a barrier for simpler services like a wiki. GitHub also lacks automation and control for logins unless you opt for an expensive enterprise account.

- **KeyCloak**: Another self-hosted solution, but not as intuitive for managing the variety of services within our community.

- **Google**: While secure, Google raises privacy concerns, and depending on a large corporation for identity management wasn’t ideal for our self-hosted philosophy.

### Common Issues and Questions

### Email Verification on First Login
If you see a message like this on first login:
```

Check your Inbox for a verification email.

```

Likely this link has already been used to create an account so you need to requrest an account recovery link.

It is possible that you set your password and didn't realize that the password was acceptable so attempt to log in.

### Forgot My Password
[Reset IrregularChat Password](https://sso.irregularchat.com/if/flow/default-recovery-flow/?next=%2F)

If you don’t have access to your email, message one of the Admins from the chat to retrieve your account. Please provide details such as when you joined and who added you.

### What's My Username?
You can log in using your email. However, if your account was set up by an admin and doesn’t have an email, message one of the Admins from the chat. Provide details like when you joined and who added you to help locate your account.

### How Do I Make an Account?
Do you have a .mil email? Use the [Automated Account Registration](https://sso.irregularchat.com/if/flow/default-enrollment-flow/?next=%2F).

If not, message one of the Admins from the chat. You will need to provide bonafides and your email. Once verified, you will receive login credentials and information on services available with your account.

### How to Invite Others to the IrregularChat
See the [Forum Post](https://forum.irregularchat.com/t/community-links-to-chats-and-services/229#p-598-inviting-others-to-the-irregularchat-community-3) while logged in
