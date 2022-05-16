import React, { useEffect, useState } from 'react'
import "./Token.css";

import { dataToken } from './data';

const Token = ({ web3Obj, userInfo }) => {

  const [address, setAddress] = useState("");
  const [adress, setAdress] = useState("");
  const [amount, setAmount] = useState();
  const [msgSender, setMsgSender] = useState({});

  const [info, setInfo] = useState({
    name: "",
    symbol: "",
    decimals: ""
  });

  const addressValue = (e) => {
    setAddress(e.target.value);
  };
  const adressValue = (e) => {
    setAdress(e.target.value);
  };

  const amountValue = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    tokenInfo();
  }, []);

  const tokenInfo = async () => {
    var methods = new web3Obj.eth.Contract(dataToken.ABI, dataToken.contractAddress)
    const name = await methods.methods.name().call();
    const symbol = await methods.methods.symbol().call();
    const decimals = await methods.methods.decimals().call();
    setInfo({ name: name, symbol: symbol, decimals: decimals })
  }

  const approveToken = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataToken.ABI, dataToken.contractAddress)
    web3Obj.eth.getAccounts().then(e => { let firstAcc = e[0]; setMsgSender(firstAcc) })
    const result = await methods.methods.approve(address, amount).send({
      from: msgSender
    });
    console.log(result)
    setAddress("");
    setAmount("");
  };
  const transferToken = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataToken.ABI, dataToken.contractAddress)
    web3Obj.eth.getAccounts().then(e => { let firstAcc = e[0]; setMsgSender(firstAcc) })
    // const result = await methods.methods.transfer(address, amount).send({from: msgSender.toString()});
    await methods.methods.transfer(address, amount).send({from: msgSender.toString()});
    // console.log(result);
    setAddress("");
    setAmount("");
  };

  const checkTokenAmount = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataToken.ABI, dataToken.contractAddress)
    var result = await methods.methods.balanceOf(address).call();
    result = web3Obj.utils.fromWei(result); //Convert balance to wei
    console.log(result)
    window.alert(result)
    setAmount("");
  };
  
  const checkAllowanceAmount = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataToken.ABI, dataToken.contractAddress)
    var result = await methods.methods.allowance(address,adress).call();
    result = web3Obj.utils.fromWei(result); //Convert balance to wei
    console.log(result)
    window.alert(result)
    setAmount("");
  };

  return (
    <>
      <h3>ERC20 Contract</h3>
      <form className="marginTop" onSubmit={transferToken}>
        <h6>Name: {info?.name}</h6>
        <h6>Symbol: {info?.symbol}</h6>
        <h6>Decimals: {info?.decimals}</h6>
        <div className="app-details">
          <h5>Transfer Token Function</h5>
          <label htmlFor="address">Address To</label>
          <input type="text" name="addressTo" value={address} onChange={addressValue} />
          <br />
          <label htmlFor="amount">Amount</label>
          <input type="number" name="amount" value={amount} onChange={amountValue} />
        </div>
        <button className="marginTop">Transfer</button>
      </form>
      <form className="marginTop" onSubmit={approveToken}>
        <div className="app-details">
          <h5>Approve Token Function</h5>
          <label htmlFor="spender">Spender</label>
          <input type="text" name="spender" value={address} onChange={addressValue} />
          <br />
          <label htmlFor="amount">Amount</label>
          <input type="number" value={amount} onChange={amountValue} />
        </div>
        <button className="marginTop">Approve</button>
      </form>
      <form className="marginTop" onSubmit={checkTokenAmount}>
        <div className="app-details">
          <h5>Check Token Balance Function</h5>
          <label htmlFor="address">Address</label>
          <input type="text" name="addressCheck" value={address} onChange={addressValue} />
        </div>
        <button className="marginTop">Check</button>
      </form>
      <form className="marginTop" onSubmit={checkAllowanceAmount}>
        <div className="app-details">
          <h5>Check Token Approve Function</h5>
          <label htmlFor="Owner">Owner Address</label>
          <input type="text" name="owner" value={address} onChange={addressValue} />
          <label htmlFor="Spender">Spender Address</label>
          <input type="text" name="spender" value={adress} onChange={adressValue} />
        </div>
        <button className="marginTop">Check</button>
      </form>
    </>
  )
}

export default Token;