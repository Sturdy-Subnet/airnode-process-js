const { ethers } = require("ethers");

function decodeData(encodedData) {
  const totalAssets = BigInt("0x" + encodedData.slice(0, 32).toString("hex"));
  let offset = 32;

  const numPools = Math.floor((encodedData.length - 32) / 65) + 1;

  const pools = [];

  for (let i = 0; i < numPools; i++) {
    const poolType = parseInt(
      encodedData.slice(offset, offset + 1).toString("hex"),
      16,
    );
    offset += 1;

    const poolId =
      "0x" + encodedData.slice(offset, offset + 32).toString("hex");
    offset += 32;

    const contractAddress =
      "0x" + encodedData.slice(offset, offset + 20).toString("hex");
    offset += 20;

    pools.push({ poolType, poolId, contractAddress });
  }

  return { totalAssets, pools };
}

// Example usage

// pools = [["21", "0x3432300000000000000000000000000000000000000000000000000000000000", "0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204"],
// ["69", "0x3432300000000000000000000000000000000000000000000000000000000000", "0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204"],
// ["69", "0x3432300000000000000000000000000000000000000000000000000000000000", "0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204"],
// ["69", "0x6969000000000000000000000000000000000000000000000000000000000000", "0x33cCE530b09cc63f274a6f672Ec3644fF89B58f3"]];

toDecode = "0x0000000000000000000000000000000000000000000000000000000000002710153432300000000000000000000000000000000000000000000000000000000000be53a109b494e5c9f97b9cd39fe969be68bf6204453432300000000000000000000000000000000000000000000000000000000000be53a109b494e5c9f97b9cd39fe969be68bf6204453432300000000000000000000000000000000000000000000000000000000000be53a109b494e5c9f97b9cd39fe969be68bf620445696900000000000000000000000000000000000000000000000000000000000033cce530b09cc63f274a6f672ec3644ff89b58f3";

// abiCoder = new ethers.AbiCoder();

// result = abiCoder.decode([ "uint a", "tuple(uint8 poolType, bytes32 poolId, address contractAddress)[]"], toDecode);
const encodedData = Buffer.from(toDecode.substr(2), "hex");
const decodedData = decodeData(encodedData);
console.log(decodedData);
