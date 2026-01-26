---
title: "Matrix-room-management"
---

# Matrix-room-management

### Graphical Management
For managing spaces, it is important to enable previews. If not, it will not properly display to users whenever an invite is sent.

### Auto Join Configuration
https://matrix-org.github.io/synapse/latest/usage/configuration/config_documentation.html

Since this is from the main matrix documentation you need to use a passthrough (see documentation [here](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/8051fd7012c7ce5b97b53e345dda0b61f866a689/roles/custom/matrix-synapse/defaults/main.yml#L1040) `matrix_synapse_configuration_extension_yaml: |` auto_join_rooms

Users who register on this homeserver will automatically be joined to the rooms listed under this option.

By default, any room aliases included in this list will be created as a publicly joinable room when the first user registers for the homeserver. If the room already exists, make certain it is a publicly joinable room, i.e. the join rule of the room must be set to ‘public’. You can find more options relating to auto-joining rooms below.

Space aliases may also be used as Spaces are just rooms under the hood.

Example configuration:

```
matrix_synapse_configuration_extension_yaml: |
    auto_join_rooms:
      - &quot;#exampleroom:example.com&quot;
      - &quot;#anotherexampleroom:example.com&quot;
```
When using the ansible playbook version you can use:

### Retention Policy for rooms

1. In the room, get to dev tools: `/devtools`

2. Select "Send custom timeline event"


#### Room configuration
https://matrix-org.github.io/synapse/latest/message_retention_policies.html

To configure a room’s message retention policy, a room’s admin or the moderator needs to send a state event in that room with the type

`m.room.retention` and the following content:

```
{
    &quot;max_lifetime&quot;: ...
}
```
