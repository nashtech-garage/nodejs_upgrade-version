# Practice on Node.js v20 features

## Permission Model
The Node.js Permission Model is an experimental mechanism for restricting access to specific resources during execution.

In this first release containing the Permission Model, the features come with the following abilities:

- Restrict access to the file system (read and write)
    - Use `--allow-fs-read` and `--allow-fs-write`
- Restrict access to child_process
    - Use `--allow-child-process`
- Restrict access to worker_threads
    - Use `--allow-worker`
- Restrict access to native addons (same as `--no-addons` flag)

(Update your current path in `package.json` before testing)

### Run code:
```
npm run permission_model
```

## Stable Test Runner
The recent update to Node.js, version 20, includes an important change to the test_runner module. The module has been marked as stable after a recent update. The stable test runner includes the building blocks for authoring and running tests, including:

- `describe`, `it`/`test` and hooks to structure test files
- mocking
- watch mode
- `node --test` for running multiple test files in parallel

The test runner also includes some parts that are not yet stable, including reporters and code coverage.

### Run code:
```
npm run test_runner
```

## Preparing single executable apps now requires injecting a Blob
The project has been working on support for Single Executable Applications (SEA) over the last year with initial support landing recently. The team continues to refine the approach as the feature is still Experimental. In Node.js 20, building a single executable app now requires injecting a blob prepared by Node.js from a JSON config instead of injecting the raw JS file.

- sea-config.json
```
{
  "main": "hello.js",
  "output": "sea-prep.blob",
  "disableExperimentalSEAWarning": true, // Default: false
  "useSnapshot": false,  // Default: false
  "useCodeCache": true // Default: false
}
```


- This writes the blob to the `sea-prep.blob` file.
```
node --experimental-sea-config sea-config.json
```

- Create a copy of the `node` executable and name it according to your needs:
```
cp $(command -v node) hello 
```

- Inject the blob into the copied binary by running `postject` with the following options:
    - `hello` / `hello.exe` - The name of the copy of the node executable created.
    - NODE_SEA_BLOB - The name of the resource / note / section in the binary where the contents of the blob will be stored.
    - `sea-prep.blob` - The name of the blob created in step 1.
    - `--sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2` - The fuse used by the Node.js project to detect if a file has been injected.
    - `--macho-segment-name NODE_SEA` (only needed on macOS) - The name of the segment in the binary where the contents of the blob will be stored.

```
npx postject hello NODE_SEA_BLOB sea-prep.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
```

- Run the binary
```
./hello
```

## Run code
- Generate `hello`CLI with warning
```
npm run generate-sea
```

- Generate `hello`CLI without warning
```
npm run generate-sea-disable-warning
```