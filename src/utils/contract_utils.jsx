import { contractMethod } from "../api/electionContract";

export function getCurrentState(value) {
    console.log(value);
    console.log(typeof (value));

    switch (value) {
        case 0:
            return "Not Started";
        case 1:
            return "Registration Started!";
        case 2:
            return "Registration Ended!";
        case 3:
            return "Election Started!";
        case 4:
            return "Election Ended!";
        default:
            return "";
    }
}


var jsonArray = [];

export async function fetchCandidates() {
    try {
        const tx = await contractMethod.methods.getCandidates().call();
        const data = JSON.stringify(tx);

        jsonArray = tx.reduce((uniqueArray, item) => {
            var existingItem = uniqueArray.find((obj) => {
                return (
                    obj.candidate_id === item[0] &&
                    obj.candidate_name === item[1] &&
                    obj.partyId === item[2] &&
                    obj.status === item[3] &&
                    obj.uri === item[4]
                );
            });

            if (!existingItem) {
                var obj = {
                    candidate_id: item[0],
                    candidate_name: item[1],
                    partyId: item[2],
                    status: item[3],
                    uri: item[4],
                };
                uniqueArray.push(obj);
            }

            return uniqueArray;
        }, []);

        // Remove duplicates using filter and Set
        jsonArray = jsonArray.filter((item, index, self) => {
            const itemString = JSON.stringify(item);
            return index === self.findIndex((obj) => JSON.stringify(obj) === itemString);
        });

        console.log("utils jsonArray", jsonArray);
        return jsonArray;
    } catch (error) {
        console.log(error);
        return [];
    }
}


export function getUserActiveAddress() {
    const address = localStorage.getItem("activeAddress");
    const validAddress = JSON.parse(address);
    return validAddress;
}

export async function fetchVotersList() {
    try {
        const tx = await contractMethod.methods.getVotersList().call();
        const data = JSON.stringify(tx);
    }
    catch (error) {
            console.log(error);
        }
}