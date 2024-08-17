# Sturdy Subnet Airnode Preprocessing and Postprocessing

This repository contains the Javascript code which is bundled to be used as preprocessing and postprocessing
functions for Sturdy Subnet's airnode.

# Usage

```bash
# install node modules
npm install
# bundle js (bundles into dist/)
npm run bundle
# bundle js + format into an escaped json-friendly string to drop into airnode config.json
npm run bundleformat
```

**NOTE:** You may have to manually modify the bundled and formatted js to include parameters
`input`, `output`, and other airnode-relevant parameters. For example you may have to modify the formatted and bundled js for `postprocess.js` from:

```js
...s=function(e){let t=e.request_uuid;t=t.length>32?t.slice(0,32):t.padEnd(32,\" \");const r=n.hexlify(n.toUtf8Bytes(t)),s=Object.keys(e.allocations)[0],i=e.allocations[s],o=s,a=Object.keys(i.allocations),c=Object.values(i.allocations).map((e=>BigInt(e)));return console.log(`request_uuid: \\${r}`),console.log(`minerUID: \\${o}`),console.log(`addresses: \\${a}`),console.log(`allocations: \\${c}`),(new n.AbiCoder).encode([\"bytes32\",\"uint256\",\"address[]\",\"uint256[]\"],[r,o,a,c])}(input);console.log(\"Encoded Data:\",s)...
```

to:

```js
...s=function(e){let t=e.request_uuid;t=t.length>32?t.slice(0,32):t.padEnd(32,\" \");const r=n.hexlify(n.toUtf8Bytes(t)),s=Object.keys(e.allocations)[0],i=e.allocations[s],o=s,a=Object.keys(i.allocations),c=Object.values(i.allocations).map((e=>BigInt(e)));return console.log(`request_uuid: \\${r}`),console.log(`minerUID: \\${o}`),console.log(`addresses: \\${a}`),console.log(`allocations: \\${c}`),(new n.AbiCoder).encode([\"bytes32\",\"uint256\",\"address[]\",\"uint256[]\"],[r,o,a,c])}(input);console.log(\"Encoded Data:\",s);output=s...
```

(added `;output=s`)
