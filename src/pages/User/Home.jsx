import React, { useState, useEffect } from 'react';
import downloadImage from '../../assets/img/download.png';
import Web3 from "web3";
import { contractMethod } from '../../api/electionContract';

const Home = ({ isOwner, setIsOwner }) => {
  const [account, setAccount] = useState("");
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState("");
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User rejected request:", error);
      }
    } else {
      console.log("Ethereum object does not exist on window. Install Metamask!")
    }
  }
  const shortenAddress = (address, chars = 4) => {
    return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`.toLowerCase();
  };

  async function checkIsOwner() {
    try {

      await contractMethod.methods.getOwner().call((error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Account", account);
          console.log("result ", result);
          if (account.toLowerCase() === result.toLowerCase()) {
            console.log("Yes Owner")
            setIsOwner(true);
          }
        }
      });

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts().then(accounts => {
        if (accounts.length > 0) {
          localStorage.setItem("activeAddress", JSON.stringify(accounts[0]))
          setAccount(accounts[0]);
        } else {
          setIsOwner(false)
          localStorage.clear();
        }
      });
      // Listern for account changes
      window.ethereum.on("accountsChanged", accounts => {
        if (accounts.length > 0) {
          localStorage.setItem("activeAddress", JSON.stringify(accounts[0]))
          setAccount(accounts[0]);

        } else {
          setAccount("");
          setIsOwner(false);
          localStorage.clear();
        }
      })
    }

  }, []);


  useEffect(() => {
    if (account) {
      checkIsOwner();
    }
  }, [account, setIsOwner, isOwner]);

  return (
    <div>
      <div className="main-card">
        <div className="main-card-title">
          <h1>
            <span className="decentralized-text">
              Decentralized</span>
            <br />
            <span className="dark-blue-text">Voting </span>
            System
          </h1>
        </div>
        <div className="main-card-img">
          <img src={downloadImage} alt="arrow home" />
        </div>
        <div className="main-card-button1">
          <button className='btn' onClick={connectWallet}>
            {account ? shortenAddress(account) : "Connect Wallet"}</button>
        </div>
        <div className="main-card-button2">
          <button className='btn'>Get More Information</button>
        </div>
      </div>
    </div>
  )
}

export default Home;
