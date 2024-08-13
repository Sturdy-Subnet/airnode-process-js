const { defaultAbiCoder } = require("@ethersproject/abi");
const { Buffer } = require("buffer");

function decodeData(encodedData) {
    // Define the data types that match the Solidity structure
    const dataTypes = [
        "uint256", // totalAssets
        "address", // userAddress
        "tuple(uint8 poolType, address contractAddress)[]", // Pool[]
    ];

    // Decode the data using ethers abi
    const decoded = defaultAbiCoder.decode(dataTypes, encodedData);

    const totalAssets = decoded[0].toString();
    const userAddress = decoded[1];
    var pools = {};
    decoded[2].map(
        (pool) =>
            (pools[pool.contractAddress] = {
                pool_model_disc: "CHAIN",
                pool_type: Number(pool.poolType.toString()),
                contract_address: pool.contractAddress,
            }),
    );

    return {
        request_type: 0,
        user_address: userAddress,
        assets_and_pools: {
            total_assets: Number(totalAssets.toString()),
            pools,
        },
    };
}

// Example usage

// pools = [["21", "0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204"],
// ["69", "0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204"],
// ["69", "0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204"],
// ["69", "0x33cCE530b09cc63f274a6f672Ec3644fF89B58f3"]];

// input = {
//     encoded_data:
//         "0x00000000000000000000000000000000000000000000021e19e0c9bab240000000000000000000000000000033cce530b09cc63f274a6f672ec3644ff89b58f300000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004500000000000000000000000033cce530b09cc63f274a6f672ec3644ff89b58f300000000000000000000000000000000000000000000000000000000000000150000000000000000000000002ab9f26e18b64848cd349582ca3b55c2d06f507d",
// };
// const encodedData = Buffer.from(toDecode.substr(2), "hex");
const encodedData = Buffer.from(input["encoded_data"].substr(2), "hex");
output = decodeData(encodedData);
// console.log(output);
