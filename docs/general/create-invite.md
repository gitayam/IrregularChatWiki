---
title: "Create-invite"
---

# Create-invite

## Creating an Invite Link
There are times when you want to create an invite link that will expire after a certain amount of time. This will allow a user or many people to create accounts setting their own usernames and passwords making it easier for admin who don’t need to [user](/general/create-user)

Return to [Admin Links](/general/admin)

### Command Line Version
Follow the steps from the github repo: https://github.com/irregularchat/authentik-account-creation

This uses your admin API with a python script which will create a user, set passwords, create invite links and configure it with a basic community message to send to a user.

### Create Invite Link
In the Admin interface of your authentik instance, select Directory &gt; Invitations in the left side menu. - Direct Link: https://sso.irregularchat.com/if/admin/#/flow/stages/invitations

Click Create (Blue Button near the Search option) Fill in : 1. Name: Lable for the Inivte code. Is this for an email you are sending out? for an in person event? For one Person. This will help determine how users where added. 1. Expires: The default is not much time. Set this code for enough time for a user to create an account. Typically about 2 hours has worked out well. 1. Flow: Select `Simple-Enrollment-Flow` 1. Custom Attributes: Leave as is 1. Single Use: If this is specifcally for only 1 user, leave this enabled.


### Copying the Invite URL
In the Admin interface of your authentik instance, select Directory &gt; Invitations in the left side menu. - Direct Link: https://sso.irregularchat.com/if/admin/#/flow/stages/invitations You’ll see existing invitations. Find your recently created invitation: 1. Select the `&gt;` next to the checkmark for that invitation 1. Copy the link from `Link to use the invitation.` 1. Provide that link to user.
