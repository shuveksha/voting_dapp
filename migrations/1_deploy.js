const Election = artifacts.require("Election");
const fs = require('fs-extra');
const { networks } = require('../truffle-config');

module.exports = async function (deployer, network, accounts) {
    // Deploy Election contract
    console.log("----Deploy Started----")
    await deployer.deploy(Election, "Nepal Votes");
    const election = await Election.deployed();

    console.log("Election Contract address:", election.address);

    // Save the contract artifacts in the frontend directory
    await saveFrontendFiles(election);
};

async function saveFrontendFiles(election) {
    const contractsDir = __dirname + "/../src/abi";

    // Ensure directory exists, if not, create it
    fs.ensureDirSync(contractsDir);

    fs.outputJSONSync(
        contractsDir + "/contract-address.json",
        { Election: election.address }
    );

    const ElectionArtifact = artifacts.require("Election");
    fs.outputJSONSync(
        contractsDir + "/Election.json",
        ElectionArtifact.toJSON()
    );
}
