# Node.js 22: A Detailed Overview of New Features

Node.js 22 is about to enter Long-Term Support (LTS) this October, bringing several exciting features that enhance both performance and developer experience. From easier handling of ECMAScript modules (ESM) to new Set methods and built-in WebSocket clients, this release packs many improvements that will help Node.js developers streamline their workflows and improve their applications.

Let’s dive into the details of what’s new in Node.js 22, along with examples and insights into how these changes can benefit your projects.

### **Notable Changes**

### **Synchronously require() ESM Modules**

One of the most highly anticipated features of Node.js 22 is the ability to load ECMAScript modules (ESM) using the require() function—synchronously! Up until now, developers working with Node.js were forced to deal with asynchronous imports for ESM, making the transition from CommonJS to ESM trickier for many existing projects. But with the introduction of the --experimental-require-module flag, you can now import ESM modules synchronously, just like you would with CommonJS modules.

### **Why is this important?**

The ability to require() ESM modules synchronously is a big deal because many developers still rely on the CommonJS module system, especially in legacy applications. Having to asynchronously import ESM modules created pain points when trying to migrate to ESM or work in mixed environments. This feature simplifies that transition, allowing developers to incrementally adopt ESM without having to completely rewrite their existing module imports.

**Example:**

Let’s say you have a module esm.mjs that fetches data from an external server. Your main entry point, index.cjs, is a CommonJS file, and you want to import the ESM module:

```jsx
// esm.mjs
export default async function getData() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
```

You can now require() the ESM module in your CommonJS entry point:

```jsx
// index.cjs
const getData = require('./esm.mjs');

(async () => {
  const data = await getData.default();
  console.log(data);
})();
```

To make this work, simply run your application with the flag:

```jsx
node --experimental-require-module index.cjs
```

With this new feature, you can gradually refactor parts of your application to ESM while continuing to use require() for synchronous imports.

### **V8 Engine Update: Version 12.4**

Node.js 22 includes an upgrade to the V8 JavaScript engine, bringing it up to version 12.4. This update comes with several new JavaScript features and performance improvements. Here’s a look at some key additions:

### **Array.fromAsync()**

The new Array.fromAsync() method allows you to create an array from an asynchronous iterable or promise. This is particularly useful when you need to process asynchronous data generation and transformation efficiently.

```jsx
async function* asyncFetchTodos() {
  for (let i = 1; i <= 10; i++) {
    yield i;
  }
}

async function fetchTodo(id) {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/' + id);
  const data = await res.json();
  return data;
}

Array.fromAsync(
  asyncFetchTodos(),
  (id) => fetchTodo(id).then(todo => console.log(todo)),
);
```

In this example, we generate asynchronous tasks (asyncFetchTodos()), and Array.fromAsync() allows us to iterate over the asynchronous generator and fetch data for each task, logging the results as they are processed.

This can improve how you handle asynchronous data in arrays, offering a more readable approach to working with promises and asynchronous iterators.

### **WebAssembly Garbage Collection**

The update to V8 12.4 also includes experimental support for garbage collection in WebAssembly. This improvement allows WebAssembly to manage memory more efficiently, which is critical for long-running, performance-intensive applications that use WebAssembly in Node.js.

Refer: https://developer.chrome.com/blog/wasmgc

### **New Set Methods for Easier Operations**

Node.js 22 introduces new methods for the Set object. Previously, developers had to manually write complex code to perform operations like union, intersection, and difference on sets. Now, several new methods are available, making set operations significantly easier to handle.

### **.union()**

The .union() method returns a new set containing elements from either or both of two sets.

```jsx
const lts = new Set([18, 20, 22]);
const nonLts = new Set([17, 19, 21]);

const all = lts.union(nonLts);
console.log(all);  // Set(6) { 18, 20, 22, 17, 19, 21 }
```

This method is particularly useful when you need to merge sets in scenarios like combining version lists, collections, or datasets.

### **.intersection()**

The .intersection() method returns a new set containing elements that are present in both sets.

```jsx
const commonVersions = lts.intersection(nonLts);
console.log(commonVersions);  // Set(0) {}
```

This method can be helpful when you need to find common elements between two sets of data, such as comparing user roles or permission sets.

### **.difference()**

This method returns a new set with elements present in one set but not in the other.

```jsx
const uniqueVersions = lts.difference(nonLts);
console.log(uniqueVersions);  // Set(3) { 18, 20, 22 }
```

### **.isDisjointFrom()**

The isDisjointFrom() method of Set instances takes a set and returns a boolean indicating if this set has no elements in common with the given set.

```jsx
const a = new Set([1]);
const b = new Set([1]);
const isDisjointFrom = a.isDisjointFrom(b);
console.log(isDisjointFrom);
// false
```

### **.isSubsetOf()**

The isSubsetOf() method of Set instances takes a set and returns a boolean indicating if this set has no elements in common with the given set.

```jsx
const element = new Set(['a', 'b', 'c']);
const parent = new Set(['a', 'b', 'd', 'c']);
const isSubsetOf = element.isSubsetOf(parent);
console.log(isSubsetOf);
// true
```

### **.isSupersetOf()**

The isSupersetOf() method of Set instances takes a set and returns a boolean indicating if all elements of the given set are in this set.

```jsx
const element = new Set(['a', 'b', 'c']);
const parent = new Set(['a', 'b', 'd', 'c']);
const isSupersetOf = parent.isSupersetOf(element);
console.log(isSupersetOf);
// true
```

### **.symmetricDifference()**

The symmetricDifference() method of Set instances takes a set and returns a new set containing elements which are in either this set or the given set, but not in both.

```jsx
const classA = new Set(['Steven', 'Mike', 'Will']);
const classB = new Set(['Michale', 'Steven', 'Obama']);
console.log(classA.symmetricDifference(classB));
// Set(4) { 'Mike', 'Will', 'Michale', 'Obama' }
```

These new methods simplify set operations, reducing the amount of boilerplate code needed to perform common tasks.

### **Built-in WebSocket Client**

With Node.js 22, the browser-compatible WebSocket client has been enabled by default, without the need for external libraries like ws. The WebSocket client, previously behind the --experimental-websocket flag, can now be used out of the box.

**Example:**

```jsx
const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('open', () => {
  console.log("WebSocket connection established");
});

ws.addEventListener('message', (event) => {
  console.log("Message received from server: ", event.data);
});
```

This built-in WebSocket client makes real-time communication easier in Node.js applications, especially for use cases like chat applications, live updates, and event-driven systems.

### **New --run Flag for package.json Scripts**

The new --run flag in Node.js 22 allows developers to execute scripts defined in package.json directly from Node.js, without relying on a package manager like npm or Yarn. This experimental feature simplifies the execution of common tasks and improves the developer experience by allowing direct execution of scripts.

**Example:**

```jsx
node --run test
```

The --run flag offers performance improvements by minimizing certain functionalities such as environment variable configuration or pre/post hooks. This is ideal for scenarios where you want faster script execution without the overhead of a package manager.

### **Stable Watch Mode**

Watch Mode is now stable in Node.js 22. This mode automatically restarts the Node.js process when changes are detected in watched files, making it ideal for development environments.

**Example:**

```jsx
"scripts": {
	"start": "node server.js",
	"dev": "node --watch server.js"
},
```

Developers no longer need third-party tools like nodemon for file watching during development, as Watch Mode is now baked into Node.js itself.

### **Stream Default High Water Mark Increase**

The default highWaterMark for streams has been increased from 16KiB to 64KiB in Node.js 22. This means that streams now have a larger internal buffer, improving performance at the cost of slightly increased memory usage.

**Example:**

```jsx
const stream = fs.createReadStream('video.mp4');
console.log(stream.readableHighWaterMark);  // Outputs: 65536 (64 KB)
```

This change boosts stream performance, particularly in file or network I/O operations, while ensuring the system can handle larger chunks of data more efficiently.

### **File Pattern Matching with glob and globSync**

Node.js 22 introduces built-in glob and globSync functions, making it easier to match file paths based on patterns without requiring external packages like glob.

**Example:**

```jsx
import { glob, globSync } from 'node:fs';

glob('*', (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(files);
});

const files = globSync('*.js');
console.log(files);
```

This functionality provides an easy way to search for files or directories matching specific patterns in your file system, helping automate tasks like cleaning up files, running specific tests, or processing batches of files.

### **Improved AbortSignal Creation Performance**

Node.js 22 improves the performance of creating AbortSignal instances. This leads to significant performance improvements when working with features that rely on AbortSignal, such as fetch() and the test runner.

**Example:**

```jsx
let controller;
const url = './video.mp4';

const downloadBtn = document.querySelector('.download');
const abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', () => {
  if (controller) {
    controller.abort();
    console.log('Download aborted');
  }
});

async function fetchVideo() {
  controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await fetch(url, { signal });
    console.log('Download complete');
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Download error:', err.message);
    }
  }
}
```

This enhancement reduces overhead when handling signal-based interruptions, such as aborting HTTP requests or long-running tasks.

### **Deprecations and Removals**

As with every Node.js release, some features are deprecated or removed to keep the platform lean and modern. There is more than 185 feature deprecated by following:

- DEP0001: http.OutgoingMessage.prototype.flush
- DEP0002: require('_linklist')
- DEP0003: _writableState.buffer
- DEP0004: CryptoStream.prototype.readyState
- DEP0005: Buffer() constructor
- DEP0006: child_process options.customFds
- DEP0007: Replace cluster worker.suicide with worker.exitedAfterDisconnect
- DEP0008: require('node:constants')
- DEP0009: crypto.pbkdf2 without digest
- DEP0010: crypto.createCredentials
- DEP0011: crypto.Credentials
- DEP0012: Domain.dispose
- DEP0013: fs asynchronous function without callback
- DEP0014: fs.read legacy String interface
- DEP0015: fs.readSync legacy String interface
- DEP0016: GLOBAL/root
- DEP0017: Intl.v8BreakIterator
- DEP0018: Unhandled promise rejections
- DEP0019: require('.') resolved outside directory
- DEP0020: Server.connections
- DEP0021: Server.listenFD
- DEP0022: os.tmpDir()
- DEP0023: os.getNetworkInterfaces()
- DEP0024: REPLServer.prototype.convertToContext()
- DEP0025: require('node:sys')
- DEP0026: util.print()
- DEP0027: util.puts()
- DEP0028: util.debug()
- DEP0029: util.error()
- DEP0030: SlowBuffer
- DEP0031: ecdh.setPublicKey()
- DEP0032: node:domain module
- DEP0033: EventEmitter.listenerCount()
- DEP0034: fs.exists(path, callback)
- DEP0035: fs.lchmod(path, mode, callback)
- DEP0036: fs.lchmodSync(path, mode)
- DEP0037: fs.lchown(path, uid, gid, callback)
- DEP0038: fs.lchownSync(path, uid, gid)
- DEP0039: require.extensions
- DEP0040: node:punycode module
- DEP0041: NODE_REPL_HISTORY_FILE environment variable
- DEP0042: tls.CryptoStream
- DEP0043: tls.SecurePair
- DEP0044: util.isArray()
- DEP0045: util.isBoolean()
- DEP0046: util.isBuffer()
- DEP0047: util.isDate()
- DEP0048: util.isError()
- DEP0049: util.isFunction()
- DEP0050: util.isNull()
- DEP0051: util.isNullOrUndefined()
- DEP0052: util.isNumber()
- DEP0053: util.isObject()
- DEP0054: util.isPrimitive()
- DEP0055: util.isRegExp()
- DEP0056: util.isString()
- DEP0057: util.isSymbol()
- DEP0058: util.isUndefined()
- DEP0059: util.log()
- DEP0060: util._extend()
- DEP0061: fs.SyncWriteStream
- DEP0062: node --debug
- DEP0063: ServerResponse.prototype.writeHeader()
- DEP0064: tls.createSecurePair()
- DEP0065: repl.REPL_MODE_MAGIC and NODE_REPL_MODE=magic
- DEP0066: OutgoingMessage.prototype._headers, OutgoingMessage.prototype._headerNames
- DEP0067: OutgoingMessage.prototype._renderHeaders
- DEP0068: node debug
- DEP0069: vm.runInDebugContext(string)
- DEP0070: async_hooks.currentId()
- DEP0071: async_hooks.triggerId()
- DEP0072: async_hooks.AsyncResource.triggerId()
- DEP0073: Several internal properties of net.Server
- DEP0074: REPLServer.bufferedCommand
- DEP0075: REPLServer.parseREPLKeyword()
- DEP0076: tls.parseCertString()
- DEP0077: Module._debug()
- DEP0078: REPLServer.turnOffEditorMode()
- DEP0079: Custom inspection function on objects via .inspect()
- DEP0080: path._makeLong()
- DEP0081: fs.truncate() using a file descriptor
- DEP0082: REPLServer.prototype.memory()
- DEP0083: Disabling ECDH by setting ecdhCurve to false
- DEP0084: requiring bundled internal dependencies
- DEP0085: AsyncHooks sensitive API
- DEP0086: Remove runInAsyncIdScope
- DEP0089: require('node:assert')
- DEP0090: Invalid GCM authentication tag lengths
- DEP0091: crypto.DEFAULT_ENCODING
- DEP0092: Top-level this bound to module.exports
- DEP0093: crypto.fips is deprecated and replaced
- DEP0094: Using assert.fail() with more than one argument
- DEP0095: timers.enroll()
- DEP0096: timers.unenroll()
- DEP0097: MakeCallback with domain property
- DEP0098: AsyncHooks embedder AsyncResource.emitBefore and AsyncResource.emitAfter APIs
- DEP0099: Async context-unaware node::MakeCallback C++ APIs
- DEP0100: process.assert()
- DEP0101: --with-lttng
- DEP0102: Using noAssert in Buffer#(read|write) operations
- DEP0103: process.binding('util').is[...] typechecks
- DEP0104: process.env string coercion
- DEP0105: decipher.finaltol
- DEP0106: crypto.createCipher and crypto.createDecipher
- DEP0107: tls.convertNPNProtocols()
- DEP0108: zlib.bytesRead
- DEP0109: http, https, and tls support for invalid URLs
- DEP0110: vm.Script cached data
- DEP0111: process.binding()
- DEP0112: dgram private APIs
- DEP0113: Cipher.setAuthTag(), Decipher.getAuthTag()
- DEP0114: crypto._toBuf()
- DEP0115: crypto.prng(), crypto.pseudoRandomBytes(), crypto.rng()
- DEP0116: Legacy URL API
- DEP0117: Native crypto handles
- DEP0118: dns.lookup() support for a falsy host name
- DEP0119: process.binding('uv').errname() private API
- DEP0120: Windows Performance Counter support
- DEP0121: net._setSimultaneousAccepts()
- DEP0122: tls Server.prototype.setOptions()
- DEP0123: setting the TLS ServerName to an IP address
- DEP0124: using REPLServer.rli
- DEP0125: require('node:_stream_wrap')
- DEP0126: timers.active()
- DEP0127: timers._unrefActive()
- DEP0128: modules with an invalid main entry and an index.js file
- DEP0129: ChildProcess._channel
- DEP0130: Module.createRequireFromPath()
- DEP0131: Legacy HTTP parser
- DEP0132: worker.terminate() with callback
- DEP0133: http connection
- DEP0134: process._tickCallback
- DEP0135: WriteStream.open() and ReadStream.open() are internal
- DEP0136: http finished
- DEP0137: Closing fs.FileHandle on garbage collection
- DEP0138: process.mainModule
- DEP0139: process.umask() with no arguments
- DEP0140: Use request.destroy() instead of request.abort()
- DEP0141: repl.inputStream and repl.outputStream
- DEP0142: repl._builtinLibs
- DEP0143: Transform._transformState
- DEP0144: module.parent
- DEP0145: socket.bufferSize
- DEP0146: new crypto.Certificate()
- DEP0147: fs.rmdir(path, { recursive: true })
- DEP0148: Folder mappings in "exports" (trailing "/")
- DEP0149: http.IncomingMessage#connection
- DEP0150: Changing the value of process.config
- DEP0151: Main index lookup and extension searching
- DEP0152: Extension PerformanceEntry properties
- DEP0153: dns.lookup and dnsPromises.lookup options type coercion
- DEP0154: RSA-PSS generate key pair options
- DEP0155: Trailing slashes in pattern specifier resolutions
- DEP0156: .aborted property and 'abort', 'aborted' event in http
- DEP0157: Thenable support in streams
- DEP0158: buffer.slice(start, end)
- DEP0159: ERR_INVALID_CALLBACK
- DEP0160: process.on('multipleResolves', handler)
- DEP0161: process._getActiveRequests() and process._getActiveHandles()
- DEP0162: fs.write(), fs.writeFileSync() coercion to string
- DEP0163: channel.subscribe(onMessage), channel.unsubscribe(onMessage)
- DEP0164: process.exit(code), process.exitCode coercion to integer
- DEP0165: --trace-atomics-wait
- DEP0166: Double slashes in imports and exports targets
- DEP0167: Weak DiffieHellmanGroup instances (modp1, modp2, modp5)
- DEP0168: Unhandled exception in Node-API callbacks
- DEP0169: Insecure url.parse()
- DEP0170: Invalid port when using url.parse()
- DEP0171: Setters for http.IncomingMessage headers and trailers
- DEP0172: The asyncResource property of AsyncResource bound functions
- DEP0173: the assert.CallTracker class
- DEP0174: calling promisify on a function that returns a Promise
- DEP0175: util.toUSVString
- DEP0176: fs.F_OK, fs.R_OK, fs.W_OK, fs.X_OK
- DEP0177: util.types.isWebAssemblyCompiledModule
- DEP0178: dirent.path
- DEP0179: Hash constructor
- DEP0180: fs.Stats constructor
- DEP0181: Hmac constructor
- DEP0182: Short GCM authentication tags without explicit authTagLength
- DEP0183: OpenSSL engine-based APIs
- DEP0184: Instantiating node:zlib classes without new
- DEP0185: Instantiating node:repl classes without new

You can refer to the [Node.js Deprecations](https://nodejs.org/api/deprecations.html) page for the full list.

****### **When to Upgrade from Node.js 20 to 22 for a Complex Medium-Level Application**

For a medium-complexity project, upgrading from Node.js 20 to 22 can offer significant advantages:

1. **ESM Integration**: If your project is moving towards ECMAScript Modules (ESM), Node.js 22’s ability to require() ESM modules synchronously can ease the transition from CommonJS, simplifying hybrid module handling.
2. **Performance Enhancements**: V8 engine improvements in version 12.4 boost performance for JavaScript operations. For apps handling large datasets or computational tasks, features like Array.fromAsync() help streamline async operations.
3. **Improved Streaming and Buffer Handling**: Projects that handle streams, video, or large file processing will benefit from the higher default highWaterMark for streams (increased from 16 KB to 64 KB). This can optimize performance when handling I/O-heavy tasks or large file transfers.
4. **WebSocket Applications**: For projects requiring real-time communication, the native WebSocket client is now enabled by default, eliminating the need for third-party WebSocket libraries.
5. **Set Operations and Data Management**: If your application involves complex data manipulation, new methods for Set objects like .union(), .intersection(), and .difference() can simplify operations without extra utilities, reducing overhead and improving readability.
6. **Watch Mode**: If you rely on tools like nodemon during development, Node.js 22’s stable Watch Mode can make development smoother by automatically restarting processes when code changes, eliminating external dependencies.

**When You Might Delay Upgrading:**

- **Dependencies**: If your project relies on packages that are not yet compatible with Node.js 22, upgrading could introduce issues.
- **Stability**: For production environments where stability is critical, ensure all aspects of Node.js 22 (including experimental features) meet your project’s stability requirements before upgrading.

**Upgrade Recommendations:**

- **Microservices or APIs**: Improved stream handling and performance boosts make it ideal for upgrading APIs handling large payloads.
- **Real-Time Applications**: WebSocket native support improves real-time communication features, such as chat or notification systems.

## Upgrade version Node.js 20 to Node.js 22

To upgrade your existing project from Node.js 20 to Node.js 22, follow these steps:

**Step 1: Check the Current Node.js Version**

First, verify the current version of Node.js running in your project by using the following command:

```bash
node -v
```

**Step 2: Upgrade Node.js to Version 22**

**Option 1: Using Node Version Manager (NVM)**

If you are using **NVM** (Node Version Manager), upgrading Node.js is simple:

```bash
// Install Node.js 22.
nvm install 22
// Switch to Node.js 22.
nvm use 22
// Set Node.js 22 as the default version.
nvm alias default 22
// Verify the installation.
node -v
```

**Option 2: Manual Installation Without NVM**

If you’re not using NVM, you need to manually uninstall Node.js 20 and install Node.js 22.

**For Linux:**

```bash
// Uninstall Node.js 20
sudo apt-get remove nodejs
// Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**For macOS:**

```bash
brew install node@22
```

**For Windows:**

1. Uninstall Node.js 20 from the **Control Panel** under “Add or Remove Programs.”
2. Download and install Node.js 22 from the [Node.js official website](https://nodejs.org/en/download/).

**Step 3: Update Project Dependencies**

After upgrading Node.js, you may need to update your project’s dependencies to ensure compatibility.

1. **Update npm** (if needed):

```bash
npm install -g npm
```

1. **Update your project’s dependencies**:

```bash
npm update
```

1. **Check for outdated dependencies**:

```bash
npm outdated
```

Consider upgrading any outdated packages to ensure compatibility with Node.js 22.

## Conclusion

In conclusion, if your project can leverage these new features, upgrading to Node.js 22 can offer tangible benefits in performance, simplicity, and modern JavaScript support. However, always ensure compatibility testing before upgrading production environments.

Node.js 22 introduces a wide range of features and performance enhancements, making it easier for developers to build fast, scalable, and modern applications. From improvements in ESM module loading to new Set methods and enhanced stream performance, this release ensures that Node.js remains one of the most powerful and developer-friendly platforms available.