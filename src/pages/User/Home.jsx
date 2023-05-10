import downloadImage from '../../assets/img/download.png';

const Home = () => {
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
          <button className='btn'>
            Connect Wallet</button>
        </div>
        <div className="main-card-button2">
          <button className='btn'>Get More Information</button>
        </div>
      </div>
    </div>
  )
}

export default Home