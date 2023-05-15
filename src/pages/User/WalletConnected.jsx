import downloadImage from '../../assets/img/download.png';


const WalletConnected = () => {
  return (
    <div>
         <div>
      <div className="main-card">
        <div className="main-card-title">
          <h1>
            <span className="dark-blue-text">Wallet </span>
            <br />
            Connected
          </h1>
        </div>

        <div className="main-card-address">
            <p>ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad</p>
        </div>

        <div className="main-card-img">
          <img src={downloadImage} alt="arrow home" />
        </div>
        
        <div className="main-card-button1">
          <button className='btn'>
            Continue</button>
        </div>

      </div>
    </div>
    </div>
  )
}

export default WalletConnected