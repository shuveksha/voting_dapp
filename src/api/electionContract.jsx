import Web3 from "web3";
import ElectionArtifact from "../abi/Election.json";
import contractAddress from "../abi/contract-address.json";

// Set the provider you want from Web3.providers
const web3 = new Web3(window.ethereum);

// for get functions
const election = new web3.eth.Contract(
    ElectionArtifact.abi,
    contractAddress.Election
);

// for external functions
const contractMethod = election;

// Request account access if needed

export { election, contractMethod };
