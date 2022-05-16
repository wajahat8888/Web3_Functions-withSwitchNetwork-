import React, { useState } from "react";
import { dataAuction } from './data'


const OnionAuction = ({ web3Obj, userInfo }) => {
 const [cardId, setCardId]=useState();
 const [amountOfSales, setAmountOfSales] = useState();
 const [pricePerCards,setPricePerCards]=useState();
 const [incrementers, setIncrementers] = useState( );
 const [currency, setCurrency] = useState("");
 const [athleteLoyalty,setAthleteLoyalty]=useState("");
 const [fee,setFee]=useState();

 const [address, setAddress] = useState("");
 const [role,setRole] = useState("");
  


 const feeValues=(e)=>
 {
   setFee(e.target.value);
 }

const athleteLoyaltyValue=(e)=>
{
  setAthleteLoyalty(e.target.value);
}


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
  const currencyValues=(e)=>
  {
    setCurrency(e.target.value);
  }
 


  const onCreateOnionAuction = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.createOnionAuction([cardId],
      [athleteLoyalty],
      address,
      currency,
      [amountOfSales],
      [pricePerCards],
      [incrementers]
      ).send({
      from: userInfo.account,
    })
    console.log(result)
    setCardId("");
    setAddress("");
    setCurrency("");
    setAthleteLoyalty("");
    setAmountOfSales("");
    setPricePerCards("")
    setIncrementers("");
   
  };
  const onBuyCard = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.buyCard(cardId,address).send({
      from: userInfo.account,
    })
    console.log(result)
    setCardId("");
    setAddress("");
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

    console.log("athleteLoyalty="+result[0]);
    console.log("ownerAddress="+result[1]);
    console.log("currency="+result[2]);
    console.log("Amount="+result[3]);
    console.log("Price="+result[4]);
    console.log("Incrementer="+result[5]);
    window.alert([
    "AthleteLoyalty="+result[0],
    "ownerAddress="+result[1],
    "currency="+result[2],
    "Amount="+result[3],
    "price="+result[4]/1000000000000000000,
    "Incrementer="+result[5]/1000000000000000000
    ]);
  };


  const onGrantRole = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.grantRole(role,address).send({
      from: userInfo.account,
    })
    console.log(result)
    setRole("");
    setAddress("");
  };

  const onRevokeRole = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.revokeRole(role,address).send({
      from: userInfo.account,
    })
    console.log(result)
    setRole("");
    setAddress("");
  };

  const onHasRole = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.hasRole(role,address).call();
    console.log(result);
    window.alert(result);
  };


  const onAddCurrency = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.addCurrency(currency,address).send({
      from: userInfo.account,
    })
    console.log(result)
    setCurrency("");
    setAddress("");
  };

  const onRemoveCurrency= async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.removeCurrency(currency).send({
      from: userInfo.account,
    })
    console.log(result)
    setCurrency("");
  };

  const onUpdateFeeLoayalty= async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.updateFeeLoayalty(fee).send({
      from: userInfo.account,
    })
    console.log(result)
    setFee();
  };
  
  
  const onfeeLoyalty= async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataAuction.ABI, dataAuction.contractAddress)
    const result = await methods.methods.feeLoyalty().call();
    console.log(result);
    window.alert(result);
  };

  const onAuctionerRole=async(e)=>
  {
    e.preventDefault();
    var methods=new web3Obj.eth.Contract(dataAuction.ABI,dataAuction.contractAddress)
    const result=await methods.methods.AUCTIONER_ROLE().call();
    console.log(result);
    window.alert(result);
  }



  return (
    <>
     <h3>Onion Auction Contract</h3>

     <form className="marginTop" onSubmit={onAddCurrency}>
        <div className="app-details">
          <h5>Add Currency function</h5>
          <label htmlFor="currency">currency</label>
          <input type="text" value={currency} onChange={currencyValues} />
          <br />
          <label htmlFor="address">Currency Address</label>
          <input type="text" value={address} onChange={addressValue} />
        </div>
        <button className="marginTop">Add Currency</button>
      </form>

      <form className="marginTop" onSubmit={onCreateOnionAuction}>
        <div className="app-details">
          <h5>createOnionAuction Function</h5>
          <label htmlFor="cardId">Card Id</label>
          <input type="text" value={cardId} onChange={cardIdValue} />
          <br />
          <label htmlFor="athleteLoyalty">Athlete Loyalty</label>
          <input type="text" value={athleteLoyalty} onChange={athleteLoyaltyValue} />
          <br />
          <label htmlFor="address">Owner Address</label>
          <input type="text" value={address} onChange={addressValue} />
          <br />
          <label htmlFor="currency">currency</label>
          <input type="text" value={currency} onChange={currencyValues} />
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
          <br />
          <label htmlFor="address">Address To</label>
          <input type="text" value={address} onChange={addressValue} />
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

      <form className="marginTop" onSubmit={onRevokeRole}>
        <div className="app-details">
          <h5>Revoke Role Function</h5>
          <label htmlFor="role">Role</label>
          <input type="text" value={role} onChange={roleValue} />
          <br />
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValue} />
        </div>
        <button className="marginTop">Revoke Role</button>
      </form>
      

      <form className="marginTop" onSubmit={onHasRole}>
        <div className="app-details">
          <h5>Has Role Function</h5>
          <label htmlFor="role">Role</label>
          <input type="text" value={role} onChange={roleValue} />
          <br />
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValue} />
        </div>
        <button className="marginTop">Check Role</button>
      </form>

      <form className="marginTop" onSubmit={onRemoveCurrency}>
        <div className="app-details">
          <h5>Remove Currency function</h5>
          <label htmlFor="currency">currency</label>
          <input type="text" value={currency} onChange={currencyValues} />
        </div>
        <button className="marginTop">Remove Currency</button>
      </form>

      <form className="marginTop" onSubmit={onUpdateFeeLoayalty}>
        <div className="app-details">
          <h5>Update Fee Loayalty</h5>
          <label htmlFor="currency">Fee</label>
          <input type="text" value={fee} onChange={feeValues} />
        </div>
        <button className="marginTop">Update Fee Loayalty</button>
      </form>

      
      <form className="marginTop" onSubmit={onfeeLoyalty}>
        <div className="app-details">
          <h5>Loyalty Fee details</h5>
        </div>
        <button className="marginTop">Loyalty Fee</button>
      </form>
      
      <form className="marginTop" onSubmit={onAuctionerRole}>
        <div className="app-details">
          <h5>Auctioner Role</h5>
        </div>
        <button className="marginTop">Auctioner Role details</button>
      </form>

    
    </>
  )
}
export default OnionAuction;