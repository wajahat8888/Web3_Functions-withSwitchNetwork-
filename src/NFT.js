import React, { useState } from "react";
import "./Mint.css";

import { dataNft } from './data'

const NFT = ({ web3Obj, userInfo }) => {
  const [address, setAddress] = useState("");
  const [id, setId] = useState();
  const [amount, setAmount] = useState();
  const [hash, setHash] = useState("");
  const [role,setRole] = useState("");
  // const [msgSender, setMsgSender] = useState({});

  const roleValue = (e) => {
    setRole(e.target.value);
   };
  
  const addressValue = (e) => {
    setAddress(e.target.value);
  };

  const idValue = (e) => {
    setId(e.target.value);
  };
 

  const amountValue = (e) => {
    setAmount(e.target.value);
  };

  const hashValue = (e) => {
    setHash(e.target.value);
  };

  const onMint = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataNft.ABI, dataNft.contractAddress)
    // console.log(address);
    // console.log(methods);
    // console.log(hash);
    const result = await methods.methods.mint(address, id, amount, hash).send({
      from: userInfo.account,
    })
    console.log(result)
    setAddress("")
    setId("")
    setAmount("")
    setHash("")
  };

  const returnTokens = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataNft.ABI, dataNft.contractAddress)
    const result = await methods.methods.allTokenIdInAddress(address).call();
    console.log(result)
    window.alert(result)
    setAddress("");
  };

  const balanceOfTokens = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataNft.ABI, dataNft.contractAddress)
    const result = await methods.methods.balanceOf(address, id).call();
    console.log(result)
    window.alert(result)
    setAddress("")
    setId("")
  }
  const approvalForAll = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataNft.ABI, dataNft.contractAddress)
    const result = await methods.methods.setApprovalForAll(address,'true').send({from: userInfo.account,})
    // await methods.methods.setApprovalForAll(address,'true').call();
    console.log(result)
    window.alert(result)
    setAddress("")
  }

  const onGrantRole = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataNft.ABI, dataNft.contractAddress)
    const result = await methods.methods.grantRole(role,address).send({
      from: userInfo.account,
    })
    console.log(result)
    setRole("");
    setAddress("");
  };

  
  const onRevokeRole = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataNft.ABI, dataNft.contractAddress)
    const result = await methods.methods.revokeRole(role,address).send({
      from: userInfo.account,
    })
    console.log(result)
    setRole("");
    setAddress("");
  };

  const onHasRole = async (e) => {
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(dataNft.ABI, dataNft.contractAddress)
    const result = await methods.methods.hasRole(role,address).call();
    console.log(result);
    window.alert(result);
  };

  const onMinterRole=async(e)=>
  {
    e.preventDefault();
    var methods=new web3Obj.eth.Contract(dataNft.ABI,dataNft.contractAddress)
    const result=await methods.methods.MINTER_ROLE().call();
    console.log(result);
    window.alert(result);
  }



  return (
    <>
      <h3>ERC1155 Contract</h3>
      <form className="marginTop" onSubmit={onMint}>
        <div className="app-details">
          <h5>Mint Function</h5>
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValue} />
          <br />
          <label htmlFor="id">Token Id</label>
          <input type="number" value={id} onChange={idValue} />
          <br />
          <label htmlFor="amount">Amount</label>
          <input type="number" value={amount} onChange={amountValue} />
          <br />
          <label htmlFor="hash">Data Hash</label>
          <input type="text" value={hash} onChange={hashValue} />
        </div>
        <button className="marginTop">Mint</button>
      </form>
      <form className="marginTop" onSubmit={returnTokens}>
        <div className="app-details">
          <h5>All Token In Address Function</h5>
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValue} />
          <br />
        </div>
        <button className="marginTop">Check</button>

      </form>
      <form className="marginTop" onSubmit={balanceOfTokens}>
        <div className="app-details">
          <h5>Balance of tokens</h5>
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValue} />
          <br />
          <label htmlFor="id">id</label>
          <input type="number" value={id} onChange={idValue} />
          <br />
        </div>
        <button className="marginTop">Check</button>
      </form>
      <form className="marginTop" onSubmit={approvalForAll}>
        <div className="app-details">
          <h5>Set Approval For All</h5>
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValue} />
        </div>
        <button className="marginTop">Check</button>
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
      
      <form className="marginTop" onSubmit={onMinterRole}>
        <div className="app-details">
          <h5>Minter Role</h5>
        </div>
        <button className="marginTop">Minter Role details</button>
      </form>

    </>
  );
};

export default NFT;
