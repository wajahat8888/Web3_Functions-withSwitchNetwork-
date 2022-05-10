import React, { useState } from "react";
import { dataAuction } from './data'


const OnionAuction = ({ web3Obj, userInfo }) => {
 const [cardId, setCardId]=useState();
 const [amountOfSales, setAmountOfSales] = useState();
 const [pricePerCards,setPricePerCards]=useState();
 const [incrementers, setIncrementers] = useState( );
 const [multipliers, setMultipliers] = useState();

 const [address, setAddress] = useState("");
 const [role,setRole] = useState("");
  

 const addressValue = (e) => {
  setAddress(e.target.value);
 };

 const roleValue = (e) => {
  setRole(e.target.value);
 };

  const cardIdValue = (e) => {
    setCardId(e.target.value);
  };
  const amountOfSalesValues=(e)=>
  {
    setAmountOfSales(e.target.value);
  }
  const pricePerCardsValues=(e)=>
  {
    setPricePerCards(e.target.value);
  }

  const incrementersValues=(e)=>
  {
    setIncrementers(e.target.value);
  }
  const multipliersValues=(e)=>
  {
    setMultipliers(e.target.value);
  }
 


  const onCreateOnionAuction = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.createOnionAuction([cardId],
      [amountOfSales],
      [pricePerCards],
      [incrementers],
      [multipliers]
      ).send({
      from: userInfo.account,
    })
    console.log(result)
    setCardId();
    setAmountOfSales();
    setPricePerCards()
    setIncrementers();
    setMultipliers();
  };
  const onBuyCard = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.buyCard(cardId).send({
      from: userInfo.account,
    })
    console.log(result)
    setCardId();
  };
  const onCancelOnionAuction = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.cancelOnionAuction([cardId]).send({
      from: userInfo.account,
    })
    console.log(result)
    setCardId();
  };
  const onOnionAuctionDetails = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.onionAuctionDetails(cardId).call();

    // const {a, b, c, d} = await methods.methods.onionAuctionDetails(cardId).call();

    // console.log(a);
    // console.log(b);
    // console.log(c);
    // console.log(d);
    // window.alert(a,b,c,d);

    console.log("Amount="+result[0]);
    console.log("price="+result[1]);
    console.log("Incrementer="+result[2]);
    console.log("Multipliers="+result[3]);
    window.alert(["Amount="+result[0],
    "price="+result[1],
    "Incrementer="+result[2],
    "Multipliers="+result[3]]);
  };


  const onGrantRole = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.grantRole(role,address).send({
      from: userInfo.account,
    })
    console.log(result)
    setCardId();
  };




  return (
    <>
     <h3>Onion Auction Contract</h3>
      <form className="marginTop" onSubmit={onCreateOnionAuction}>
        <div className="app-details">
          <h5>createOnionAuction Function</h5>
          <label htmlFor="cardId">Card Id</label>
          <input type="text" value={cardId} onChange={cardIdValue} />
          <br />
          <label htmlFor="amountOfSales">Amount Of Sales</label>
          <input type="text" value={amountOfSales} onChange={amountOfSalesValues} />
          <br />
          <label htmlFor="pricePerCards">Price Per Cards</label>
          <input type="text" value={pricePerCards} onChange={pricePerCardsValues} />
          <br />
          <label htmlFor="incrementers">Incrementers</label>
          <input type="text" value={incrementers} onChange={incrementersValues} />
          <br />
          <label htmlFor="multipliers">Multipliers</label>
          <input type="text" value={multipliers} onChange={multipliersValues} />
        </div>
        <button className="marginTop">Create Auction</button>
      </form>
      <form className="marginTop" onSubmit={onOnionAuctionDetails}>
        <div className="app-details">
          <h5>onionAuctionDetails Function</h5>
          <label htmlFor="cardId">Card Id</label>
          <input type="text" value={cardId} onChange={cardIdValue} />
        </div>
        <button className="marginTop">Auction Details</button>
      </form>
      <form className="marginTop" onSubmit={onBuyCard}>
        <div className="app-details">
          <h5>BuyCard Function</h5>
          <label htmlFor="cardId">Card Id</label>
          <input type="text" value={cardId} onChange={cardIdValue} />
        </div>
        <button className="marginTop">Buy Auction</button>
      </form>
      <form className="marginTop" onSubmit={onCancelOnionAuction}>
        <div className="app-details">
          <h5>CancelOnionAuction Function</h5>
          <label htmlFor="cardId">Card Id</label>
          <input type="text" value={cardId} onChange={cardIdValue} />
        </div>
        <button className="marginTop">cancel Auction</button>
      </form>
      <form className="marginTop" onSubmit={onGrantRole}>
        <div className="app-details">
          <h5>grantRole Function</h5>
          <label htmlFor="role">Role</label>
          <input type="text" value={role} onChange={roleValue} />
          <br />
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValue} />
        </div>
        <button className="marginTop">Grant Role</button>
      </form>

    
    </>
  )
}
export default OnionAuction;