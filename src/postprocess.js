const { ethers } = require("ethers");

function processAndEncode(input) {
    // Extract the request UUID
    let inputString = input.request_uuid;
    if (inputString.length > 32) {
        inputString = inputString.slice(0, 32);
    } else {
        inputString = inputString.padEnd(32, " "); // Padding with spaces or your preferred character
    }

    const request_uuid = ethers.hexlify(ethers.toUtf8Bytes(inputString));

    // Extract the top miner (first allocation in the object)
    const topMinerKey = Object.keys(input.allocations)[0];
    const topMiner = input.allocations[topMinerKey];

    // Extract the miner UID, addresses, and allocations
    const minerUID = topMinerKey;
    const addresses = Object.keys(topMiner.allocations);
    const allocations = Object.values(topMiner.allocations).map((allocation) =>
        BigInt(allocation),
    );

    console.log(`request_uuid: ${request_uuid}`);
    console.log(`minerUID: ${minerUID}`);
    console.log(`addresses: ${addresses}`);
    console.log(`allocations: ${allocations}`);

    // Encode all data together
    const abiCoder = new ethers.AbiCoder();
    const encodedData = abiCoder.encode(
        ["bytes32", "uint256", "address[]", "uint256[]"],
        [request_uuid, minerUID, addresses, allocations],
    );

    return encodedData;
}

// Example input:
// input = {
//     request_uuid: "3ed28066e4ad46abb292f7e64dccaa8a",
//     allocations: {
//         1: {
//             apy: 0,
//             allocations: {
//                 "0xe53FFd56FaDC7030156069aE1b34dE0Ab8b703F4": 4.07e21,
//                 "0xC8D4a8a7F593e73cD32cD6C5Fb11fE20F23f9695": 0,
//                 "0xD002Dc1c05fd7FF28C55eEA3dDcB9051B2B81bD2": 0,
//                 "0x0DD49C449C788285F50B529145D6e6E76f02Fd8f": 0,
//             },
//         },
//         2: {
//             apy: 0,
//             allocations: {
//                 "0xe53FFd56FaDC7030156069aE1b34dE0Ab8b703F4": 4.07e21,
//                 "0xC8D4a8a7F593e73cD32cD6C5Fb11fE20F23f9695": 0,
//                 "0xD002Dc1c05fd7FF28C55eEA3dDcB9051B2B81bD2": 0,
//                 "0x0DD49C449C788285F50B529145D6e6E76f02Fd8f": 0,
//             },
//         },
//         4: {
//             apy: 0,
//             allocations: {
//                 "0xe53FFd56FaDC7030156069aE1b34dE0Ab8b703F4": 4.07e21,
//                 "0xC8D4a8a7F593e73cD32cD6C5Fb11fE20F23f9695": 0,
//                 "0xD002Dc1c05fd7FF28C55eEA3dDcB9051B2B81bD2": 0,
//                 "0x0DD49C449C788285F50B529145D6e6E76f02Fd8f": 0,
//             },
//         },
//         9: {
//             apy: 0,
//             allocations: {
//                 "0xe53FFd56FaDC7030156069aE1b34dE0Ab8b703F4": 4.07e21,
//                 "0xC8D4a8a7F593e73cD32cD6C5Fb11fE20F23f9695": 0,
//                 "0xD002Dc1c05fd7FF28C55eEA3dDcB9051B2B81bD2": 0,
//                 "0x0DD49C449C788285F50B529145D6e6E76f02Fd8f": 0,
//             },
//         },
//     },
// };

const output = processAndEncode(input);
console.log("Encoded Data:", output);
