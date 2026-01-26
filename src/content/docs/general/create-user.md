---
title: "Create-user"
---

# Create-user

## Create SSO User
Select Admin have access to administer the IrregularChat Login. This gives a lot of control which could be misused or could accidentally mess up users’ experience. Keep that in mind as you perform any admin action on https://sso.irregularchat.com

Return to [Admin Links](/general/admin)

### Command Line Version
Follow the steps from the github repo: https://github.com/irregularchat/authentik-account-creation

This uses your admin API with a python script which will create a user, set passwords, create invite links and configure it with a basic community message to send to a user.

### Steps to Create a User
See the official authentik guide: https://docs.goauthentik.io/docs/user-group-role/user/user_basic_operations#create-a-user

In the Admin interface of your authentik instance, select Directory &gt; Users in the left side menu. Select the folder where you want to create a user. `Root &gt; Users` - Direct link: https://sso.irregularchat.com/if/admin/#/identity/users Click Create (Blue Button near the Search option) Fill in : 1. Username: This value must be unique and should be a persons first name and last initial (First-L) or signal username. 1. Name: Displayed whatever the user has introduced themselves by first name 1. User Type: LEAVE THIS as INTERNAL 1. add in a known email if available OR users’ username and @irregularchat.com 1. Active: LEAVE THIS as Active 1. Path: LEAVE THIS as users 1. Attributes: LEAVE THIS as {} Click Create

Next Step is REQUIRED:

### Set OR Reset User Password
This step is also how you reset the password for a user.

The BEST option is to `Create Recovery Link`

In the Admin interface of your authentik instance, select Directory &gt; Users in the left side menu. Select the folder where you want to create a user. `Root &gt; Users`

## Search for user

## Select user

## Scroll down and select `Set Password` on the left navigation column

1. (BEST OPTION) Create Recovery Link

1. (Alt Option) Set Password
#* This can be done with a passphrase generator such as https://bitwarden.com/password-generator/
#* Select `Update Password`
