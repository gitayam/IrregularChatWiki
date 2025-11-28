---
title: "Matrix Additional configuration"
---

# Matrix Additional configuration

### Sliding Sync
https://github.com/spantaleev/matrix-docker-ansible-deploy/issues/3056


### Client File
```
{
  &quot;m.homeserver&quot;: {
    &quot;base_url&quot;: &quot;https://matrix.irregularchat.com&quot;
  },
  &quot;m.identity_server&quot;: {
    &quot;base_url&quot;: &quot;https://vector.im&quot;
  },
  &quot;im.vector.riot.jitsi&quot;: {
    &quot;preferredDomain&quot;: &quot;jitsi.irregularchat.com&quot;
  },
  &quot;io.element.jitsi&quot;: {
    &quot;preferredDomain&quot;: &quot;jitsi.irregularchat.com&quot;
  },
  &quot;m.integrations&quot;: {
    &quot;managers&quot;: [
      {
        &quot;api_url&quot;: &quot;https://dimension.irregularchat.com/api/v1/scalar&quot;,
        &quot;ui_url&quot;: &quot;https://dimension.irregularchat.com/element&quot;
      }
    ]
  },
  &quot;org.matrix.msc3575.proxy&quot;: {
    &quot;url&quot;: &quot;https://sync-matrix.irregularchat.com&quot;
  }
}
```

### Vars Config
```
# Sliding Sync Configuration
## Enables the Sliding Sync proxy
matrix_sliding_sync_enabled: true
1. # Maps a port on the host, passed into the Sliding Sync container's internal listening port. MUST be set as by default the container has no host bindings and thus can never be reached from outside the internal docker network. Not even locally. I have chosen host port 8018 so that it's well out of the way
matrix_sliding_sync_container_extra_arguments:
  - &quot;-p 8018:8008&quot;
## Sets the server URL the server tells clients to try to connect to it with. This should be your https://matrix.yourdomain.com URL, including the &quot;https://&quot;. MUST be set as for some reason the default tells clients to use an internal docker hostname, namely matrix-nginx-proxy container which obviously won't work externally and caused 404's in the sliding sync logs.
matrix_sliding_sync_environment_variable_syncv3_server: &quot;https://matrix.irregularchat.com&quot;
```
