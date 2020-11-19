# deobf-google-clients
Deobfuscating the oauth system for another upcoming thing, probably will be released in the N building.

## General architecture of the system
The `loader` package is what is directly embedded into people's sites. The only function it implements is gapi.load, which loads other packages such as `auth`.
`debug_error` is loaded when loading goes wrong.
