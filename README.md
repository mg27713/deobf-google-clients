# deobf-google-clients
Deobfuscating the oauth system for another upcoming thing, probably will be released in the N building.

## General architecture of the system
The `loader` package is what is directly embedded into people's sites. The only function it implements is gapi.load, which loads other packages such as `auth`.
`debug_error` is loaded when loading goes wrong. When these packages finish loading, a callback from the user is called. Internally, these callbacks are called `gapi.loaded_X` and is directly inserted by the server, but they have been replaced by `CALLBACK` in these deobfuscated versions.
