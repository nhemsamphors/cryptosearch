import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {useState} from 'react';
import axios from 'axios';

function App() {

  let coinApi = "https://api.coingecko.com/api/v3/coins/"

  const [crypto, setCrypto] = useState('')
  const [img, setImage] = useState('')
  const [name, setName] = useState('')
  const [symbol,setSymbol]= useState('')
  const [link, setLink] = useState('')
  const [ind, setInd] = useState('')
  const [usd, setUsd] = useState('')
  const [desc, setDesc] = useState('')
  const handleSubmit = () =>{
      const url = coinApi + crypto
        axios.get(url)
        .then(res =>{
          const resdata = res.data
          setImage(resdata.image.large)
          setName(resdata.name)
          setSymbol(resdata.symbol)
          setLink(resdata.links.homepage[0])
          setInd("Indian Prioce:₹ " + resdata.market_data.current_price.inr)
          setUsd("United Price: $ " + resdata.market_data.current_price.usd)
          setDesc(JSON.stringify(resdata.description.en))
        })
    

  }
  const creactMarkup =() =>{
    return{__html: desc}
  }
  return (
    <div className="App" style={{ backgroundColor: "crimson", minHeight: "100vh"}}>
    <h1 className="bg-info p-4">Crypto Search</h1>
    <div className="d-flex justify-content-center">
    <div className="col-md-4 mt-5">
    <input className="form-control" type="text" value={crypto} onChange={(e)=> setCrypto(e.target.value)} placeholder="Enter Crypto Currency" required></input>
    </div>
    </div> 
    
    <button onClick={handleSubmit} className="btn btn-secondary px-5 mt-4">Submit</button>
    <div className="mt-5 container-fluid d-flex justify-content-center">
    <div className="col-md-4 bg-success p-2 rounded">
    <img src={img} alt="" width="150"></img>
    <br></br>
    <h1 className="text-white">{name}</h1>
    <h2>{symbol}</h2>
    <h2><a className="text-white" href={link}>{link}</a></h2>
    <br></br>
    <h2>{ind}</h2>
    <h2>{usd}</h2>
    </div>
    <div className="text-white col-md-8 my-auto">
    <div dangerouslySetInnerHTML={creactMarkup()}></div>
    </div>
    </div>
    </div>
  );
}

export default App;
