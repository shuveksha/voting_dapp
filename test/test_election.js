const Election = artifacts.require("./Election.sol");

const { expect } = require("chai");
const { time } = require("@openzeppelin/test-helpers");
// const truffleAssert = require('truffle-assertions')

contract("Election", (accounts) => {
    const owner = accounts[0];
    const voter1 = accounts[1];
    const voter2 = accounts[2];
    const recipient = accounts[3];
    let electionInstance;

    beforeEach(async () => {
        electionInstance = await Election.new("Test Election", { from: owner });
    });

    describe("Election Constructor", async () => {
        it("should initialize the election with the correct name", async () => {
            const electionName = await electionInstance.getElectionName();
            expect(electionName).to.equal("Test Election");
        });

        it("should set the correct owner", async () => {
            const electionOwner = await electionInstance.owner();
            expect(electionOwner).to.equal(owner);
        });
    });

    describe("Candidate Registration", async () => {
        it("should allow the owner to add candidates", async () => {
            await electionInstance.addCandidates("Rumsan", 2, "https://example.com/rumsan", { from: owner });
            const candidate = await electionInstance.getCandidate(1);
            expect(candidate.candidateName).to.equal("Rumsan");
            expect(candidate.partyId.toString()).to.equal("2");
            expect(candidate.uri).to.equal("https://example.com/rumsan");
        });

        it("should not allow non-owners to add candidates", async () => {
            try {
                await electionInstance.addCandidates("Alice", 1, "https://example.com/alice", { from: voter1 });
            } catch (error) {
                expect(error.message).to.include("Only owner can access this");
            }
        });
    });

    describe("Voter Registration", () => {
        beforeEach(async () => {
            await electionInstance.startRegistration({ from: owner });
            // increasing time by one hour
            await time.increase(3600);
        });

        it("should allow the eligible voters to register", async () => {
            await electionInstance.registerAsVoter(123456, { from: voter1 });
            const registeredVoter = await electionInstance.getVoter(voter1);
            expect(registeredVoter.voterId).to.equal(voter1);
            expect(registeredVoter.citizenshipNumber.toString()).to.equal("123456");
            expect(registeredVoter.registered).to.equal(false);
            expect(registeredVoter.vote.toString()).to.equal("0");
            expect(registeredVoter.voted).to.equal(false);
        });
        it("should not allow voters to register twice", async () => {
            await electionInstance.registerAsVoter(123456, { from: voter1 });
            try {
                await electionInstance.registerAsVoter(123456, { from: voter1 })
            } catch (error) {
                expect(error.message).to.include("Voter already registered");
            }
        });
        it("should not allow voters to register before registration starts", async () => {
            try {
                await electionInstance.registerAsVoter(123456, { from: voter1 })
            } catch (error) {
                expect(error.message).to.include("Wait for start");
            }
        });

        it("should not allow voters to regsiter after registration ends", async () => {
            await electionInstance.endRegistration({ from: owner });
            // const endReg = await electionInstance.endReg.call();
            // await time.decrease(3600);
            try {
                await electionInstance.registerAsVoter(123456, { from: voter1 });
            } catch (error) {
                expect(error.message).to.include("Wait for start")
            }
        });
    });

    describe("Approving Voters", () => {
        beforeEach(async () => {
            await electionInstance.startRegistration({ from: owner });
            await time.increase(3600);
            await electionInstance.registerAsVoter(12345, { from: voter1 });

        })
        it("should approve a registered voter", async () => {
            await electionInstance.approveVoters(voter1, { from: owner });
            const voterDetails = await electionInstance.getVoter(voter1);
            assert.equal(voterDetails.registered, true, "Voter approval status should be true")
        })
        it("should not allow non-onwer to approve voters", async () => {
            try {
                await electionInstance.approveVoters(voter1, { from: voter2 });
                assert.fail("Non-owner should not be able to approve voters");
            } catch (error) {
                assert(error.message.includes("Only owner can access this"), "Expected 'Only owner can access this' error")
            }
        })
    });

    describe("Voting", () => {
        const partyId = 234;
        const citizenshipNumber = 123;
        beforeEach(async () => {
            await electionInstance.startRegistration({ from: owner });
            await time.increase(3600);
            await electionInstance.registerAsVoter(citizenshipNumber, { from: voter1 });
            await electionInstance.approveVoters(voter1, { from: owner });
            await electionInstance.endRegistration({ from: owner });
            await time.increase(3600);
            await electionInstance.addCandidates("Candidate 1", partyId, "URI", { from: owner });
            await electionInstance.startElection({ from: owner });
            await time.increase(3600)
        })
        it("should allow an approved voter to vote for a candidate", async () => {
            await electionInstance.vote(1, { from: voter1 });
            const voterDetails = await electionInstance.getVoter(voter1);
            assert.equal(voterDetails.voted, true, "Voter should have voted");
            const candidateDetails = await electionInstance.getCandidate(1);
            assert.equal(candidateDetails.candidateVoteCount, 1, "Candidate vote count should be increased");
        });
        it("should not allow a voter to vote twice", async () => {
            await electionInstance.vote(2, { from: voter1 });
            try {
                await electionInstance.vote(3, { from: voter1 });
                assert.fail("Voter should not be able t vote twice");
            } catch (error) {
                assert(error.message.includes("You have already voted"), "Expected 'You have already voted' error");
            }
        })
    });
    describe("Election Results", () => {
        const citizenshipNumber1 = 12345;
        const citizenshipNumber2 = 67890;
        const partyId1 = 101;
        const partyId2 = 102;
        beforeEach(async () => {
            await electionInstance.startRegistration({ from: owner });
            await time.increase(3600);
            await electionInstance.registerAsVoter(citizenshipNumber1, { from: voter1 });
            await electionInstance.registerAsVoter(citizenshipNumber2, { from: voter2 });
            await electionInstance.approveVoters(voter1, { from: owner });
            await electionInstance.approveVoters(voter2, { from: owner });
            await electionInstance.endRegistration({ from: owner });
            await time.increase(3600);

            // Add candidates
            await electionInstance.addCandidates("Candidate 1", partyId1, "URI 1", { from: owner });
            await electionInstance.addCandidates("Candidate 2", partyId2, "URI 2", { from: owner });

            // Start election
            await electionInstance.startElection({ from: owner });
            await time.increase(3600);

            // Voters cast their votes
            await electionInstance.vote(1, { from: voter1 });
            await electionInstance.vote(1, { from: voter2 });

            // End election
            await electionInstance.endElection({ from: owner });
            await time.increase(3600);
        })
        it("should return the winning candidate after the election has ended", async () => {
            const result = await electionInstance.checkResults();

            // Assert that the winning candidate is the expected candidate
            assert.equal(result.candidateId, 1, "The winning candidate should be candidate 1");
            assert.equal(result.candidateName, "Candidate 1", "The winning candidate should have the correct name");
            assert.equal(result.partyId, partyId1, "The winning candidate should have correct party ID");
            assert.equal(result.uri, "URI 1", "The winning candidate should have the correct uri")
        })
    });
    describe("Withdrawal", () => {
        it("should allow the owner to withdraw funds", async () => {
            // Send ether to the contract
            const amountToSend = web3.utils.toWei("1", "ether");
            await web3.eth.sendTransaction({ from: owner, to: electionInstance.address, value: amountToSend });

            // Check the contract balance before withdrawal
            const contractBalanceBefore = await web3.eth.getBalance(electionInstance.address);
            assert.equal(contractBalanceBefore, amountToSend, "Contract balance should be equal to the sent amount");

            // Get recipient initial balance
            const recipientInitialBalance = await web3.eth.getBalance(recipient);

            // Withdraw funds from the contract
            const amountToWithdraw = web3.utils.toWei("0.5", "ether");
            try {
                const tx = await electionInstance.withdraw(recipient, amountToWithdraw, { from: owner });

                // Calculate gas used
                const gasUsed = tx.receipt.gasUsed;
                const gasPrice = (await web3.eth.getTransaction(tx.tx)).gasPrice;
                const gasCost = BigInt(gasUsed) * BigInt(gasPrice);

                // Check the contract balance after withdrawal
                const contractBalanceAfter = await web3.eth.getBalance(electionInstance.address);
                assert.equal(contractBalanceAfter, web3.utils.toWei("0.5", "ether"), "Contract balance should be updated after withdrawal");

                // Check the recipient balance after withdrawal
                const recipientBalanceAfter = await web3.eth.getBalance(recipient);
                const recipientBalanceDiff = BigInt(recipientBalanceAfter) - BigInt(recipientInitialBalance);

                assert.isTrue(recipientBalanceDiff >= BigInt(amountToWithdraw) - gasCost, "Recipient balance should be increased after withdrawal");
            } catch (error) {
                console.error("Error during withdrawal:", error.message);
                assert.fail("Transaction should not revert");
            }
        });
    });
});
