## What’s New in Node.js v20

### Custom ESM loader hooks nearing stable

In Node.js v20, `import.meta.resolve()` has been introduced, which makes it easier to write scripts that are not location sensitive. This function returns synchronously, similar to browser behavior, allowing for more efficient execution.

### Stable Test Runner

In Node.js v20 includes a stable version of the test_runner module that enables developers to build and run JavaScript test suites quickly and easily without installing additional dependencies.

### New version of the V8 engine

- String.prototype.isWellFormed and toWellFormed
- Methods that change Array and TypedArray by copy
- Resizable ArrayBuffer and growable SharedArrayBuffer
- RegExp v flag with set notation + properties of strings
- WebAssembly Tail Call

### Performance

In Node.js 20 includes many improvements to the fundamental parts of the runtime including `URL`, `fetch()`, and `EventTarget`.

### [Experimental] Permission Model

The Node.js Permission Model is an experimental mechanism for restricting access to specific resources during execution.

### [Experimental] Single Executable Applications

- Experimental Single Executable Applications (SEA) is a new feature introduced in Node.js v20 that allows bundling your application with the Node.js binary, enabling end users to distribute and run it as a single executable file.
- Preparing single executable apps now requires injecting a Blob: The project has been working on support for Single Executable Applications (SEA) over the last year with initial support landing recently

### [Official] support for ARM64 Windows

### Web Crypto API

use WebIDL converters in WebCryptoAPI [#46067](https://github.com/nodejs/node/pull/46067)

### Progress on Web Assembly System Interface (WASI)

Adding a version option when new WASI() is called. The version is required and has no default value

### See also

- [1] https://nodejs.org/en/blog/announcements/v20-release-announce

## Deprecated APIs

```
DEP0001: http.OutgoingMessage.prototype.flush
DEP0002: require('_linklist')
DEP0003: _writableState.buffer
DEP0004: CryptoStream.prototype.readyState
DEP0005: Buffer() constructor
DEP0006: child_process options.customFds
DEP0007: Replace cluster worker.suicide with worker.exitedAfterDisconnect
DEP0008: require('node:constants')
DEP0009: crypto.pbkdf2 without digest
DEP0010: crypto.createCredentials
DEP0011: crypto.Credentials
DEP0012: Domain.dispose
DEP0013: fs asynchronous function without callback
DEP0014: fs.read legacy String interface
DEP0015: fs.readSync legacy String interface
DEP0016: GLOBAL/root
DEP0017: Intl.v8BreakIterator
DEP0018: Unhandled promise rejections
DEP0019: require('.') resolved outside directory
DEP0020: Server.connections
DEP0021: Server.listenFD
DEP0022: os.tmpDir()
DEP0023: os.getNetworkInterfaces()
DEP0024: REPLServer.prototype.convertToContext()
DEP0025: require('node:sys')
DEP0026: util.print()
DEP0027: util.puts()
DEP0028: util.debug()
DEP0029: util.error()
DEP0030: SlowBuffer
DEP0031: ecdh.setPublicKey()
DEP0032: node:domain module
DEP0033: EventEmitter.listenerCount()
DEP0034: fs.exists(path, callback)
DEP0035: fs.lchmod(path, mode, callback)
DEP0036: fs.lchmodSync(path, mode)
DEP0037: fs.lchown(path, uid, gid, callback)
DEP0038: fs.lchownSync(path, uid, gid)
DEP0039: require.extensions
DEP0040: node:punycode module
DEP0041: NODE_REPL_HISTORY_FILE environment variable
DEP0042: tls.CryptoStream
DEP0043: tls.SecurePair
DEP0044: util.isArray()
DEP0045: util.isBoolean()
DEP0046: util.isBuffer()
DEP0047: util.isDate()
DEP0048: util.isError()
DEP0049: util.isFunction()
DEP0050: util.isNull()
DEP0051: util.isNullOrUndefined()
DEP0052: util.isNumber()
DEP0053: util.isObject()
DEP0054: util.isPrimitive()
DEP0055: util.isRegExp()
DEP0056: util.isString()
DEP0057: util.isSymbol()
DEP0058: util.isUndefined()
DEP0059: util.log()
DEP0060: util._extend()
DEP0061: fs.SyncWriteStream
DEP0062: node --debug
DEP0063: ServerResponse.prototype.writeHeader()
DEP0064: tls.createSecurePair()
DEP0065: repl.REPL_MODE_MAGIC and NODE_REPL_MODE=magic
DEP0066: OutgoingMessage.prototype._headers, OutgoingMessage.prototype._headerNames
DEP0067: OutgoingMessage.prototype._renderHeaders
DEP0068: node debug
DEP0069: vm.runInDebugContext(string)
DEP0070: async_hooks.currentId()
DEP0071: async_hooks.triggerId()
DEP0072: async_hooks.AsyncResource.triggerId()
DEP0073: Several internal properties of net.Server
DEP0074: REPLServer.bufferedCommand
DEP0075: REPLServer.parseREPLKeyword()
DEP0076: tls.parseCertString()
DEP0077: Module._debug()
DEP0078: REPLServer.turnOffEditorMode()
DEP0079: Custom inspection function on objects via .inspect()
DEP0080: path._makeLong()
DEP0081: fs.truncate() using a file descriptor
DEP0082: REPLServer.prototype.memory()
DEP0083: Disabling ECDH by setting ecdhCurve to false
DEP0084: requiring bundled internal dependencies
DEP0085: AsyncHooks sensitive API
DEP0086: Remove runInAsyncIdScope
DEP0089: require('node:assert')
DEP0090: Invalid GCM authentication tag lengths
DEP0091: crypto.DEFAULT_ENCODING
DEP0092: Top-level this bound to module.exports
DEP0093: crypto.fips is deprecated and replaced
DEP0094: Using assert.fail() with more than one argument
DEP0095: timers.enroll()
DEP0096: timers.unenroll()
DEP0097: MakeCallback with domain property
DEP0098: AsyncHooks embedder AsyncResource.emitBefore and AsyncResource.emitAfter APIs
DEP0099: Async context-unaware node::MakeCallback C++ APIs
DEP0100: process.assert()
DEP0101: --with-lttng
DEP0102: Using noAssert in Buffer#(read|write) operations
DEP0103: process.binding('util').is[...] typechecks
DEP0104: process.env string coercion
DEP0105: decipher.finaltol
DEP0106: crypto.createCipher and crypto.createDecipher
DEP0107: tls.convertNPNProtocols()
DEP0108: zlib.bytesRead
DEP0109: http, https, and tls support for invalid URLs
DEP0110: vm.Script cached data
DEP0111: process.binding()
DEP0112: dgram private APIs
DEP0113: Cipher.setAuthTag(), Decipher.getAuthTag()
DEP0114: crypto._toBuf()
DEP0115: crypto.prng(), crypto.pseudoRandomBytes(), crypto.rng()
DEP0116: Legacy URL API
DEP0117: Native crypto handles
DEP0118: dns.lookup() support for a falsy host name
DEP0119: process.binding('uv').errname() private API
DEP0120: Windows Performance Counter support
DEP0121: net._setSimultaneousAccepts()
DEP0122: tls Server.prototype.setOptions()
DEP0123: setting the TLS ServerName to an IP address
DEP0124: using REPLServer.rli
DEP0125: require('node:_stream_wrap')
DEP0126: timers.active()
DEP0127: timers._unrefActive()
DEP0128: modules with an invalid main entry and an index.js file
DEP0129: ChildProcess._channel
DEP0130: Module.createRequireFromPath()
DEP0131: Legacy HTTP parser
DEP0132: worker.terminate() with callback
DEP0133: http connection
DEP0134: process._tickCallback
DEP0135: WriteStream.open() and ReadStream.open() are internal
DEP0136: http finished
DEP0137: Closing fs.FileHandle on garbage collection
DEP0138: process.mainModule
DEP0139: process.umask() with no arguments
DEP0140: Use request.destroy() instead of request.abort()
DEP0141: repl.inputStream and repl.outputStream
DEP0142: repl._builtinLibs
DEP0143: Transform._transformState
DEP0144: module.parent
DEP0145: socket.bufferSize
DEP0146: new crypto.Certificate()
DEP0147: fs.rmdir(path, { recursive: true })
DEP0148: Folder mappings in "exports" (trailing "/")
DEP0149: http.IncomingMessage#connection
DEP0150: Changing the value of process.config
DEP0151: Main index lookup and extension searching
DEP0152: Extension PerformanceEntry properties
DEP0153: dns.lookup and dnsPromises.lookup options type coercion
DEP0154: RSA-PSS generate key pair options
DEP0155: Trailing slashes in pattern specifier resolutions
DEP0156: .aborted property and 'abort', 'aborted' event in http
DEP0157: Thenable support in streams
DEP0158: buffer.slice(start, end)
DEP0159: ERR_INVALID_CALLBACK
DEP0160: process.on('multipleResolves', handler)
DEP0161: process._getActiveRequests() and process._getActiveHandles()
DEP0162: fs.write(), fs.writeFileSync() coercion to string
DEP0163: channel.subscribe(onMessage), channel.unsubscribe(onMessage)
DEP0164: process.exit(code), process.exitCode coercion to integer
DEP0165: --trace-atomics-wait
DEP0166: Double slashes in imports and exports targets
DEP0167: Weak DiffieHellmanGroup instances (modp1, modp2, modp5)
DEP0168: Unhandled exception in Node-API callbacks
DEP0169: Insecure url.parse()
DEP0170: Invalid port when using url.parse()
DEP0171: Setters for http.IncomingMessage headers and trailers
DEP0172: The asyncResource property of AsyncResource bound functions
DEP0173: the assert.CallTracker class
DEP0174: calling promisify on a function that returns a Promise
DEP0175: util.toUSVString
DEP0176: fs.F_OK, fs.R_OK, fs.W_OK, fs.X_OK
```

### See also

- [1] https://nodejs.org/docs/latest-v20.x/api/deprecations.html
