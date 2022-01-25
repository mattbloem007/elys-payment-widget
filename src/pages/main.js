import React, { Component } from 'react'
import Web3 from "web3";
import PaymentButton from '../components/paymentButton'
import DonateButton from '../components/donateButton'
import ButtonForm from '../components/paymentButtonForm'
import elysPrice from '../lib/elysPrice'
import abi from '../crypto/uniswapV2PairABI.js';
import contractAddress from '../crypto/contractAddress';
import styled from "styled-components"
import { Alert } from 'react-bootstrap';
import detectEthereumProvider from '@metamask/detect-provider'
import { FaRegCopy } from "react-icons/fa";


class Main extends Component {

    state = {
        loading: true,
        hasMetamask: false,
        success: false,
        payLoading: "Pay with ELYS",
        elysToken: null,
        elysAmount: 0,
        dollarAmount: 0,
        elysPrice: {usd:0,ftm:0,loaded: false},
        isConnected: false,
        txHash: "",
        usdCurr: false,
    }

    checkMetamask = async () => {
        let provider = await detectEthereumProvider()
        if (provider) {
            return window.ethereum.isMetaMask
        }
        return false
    }

    componentDidMount = async () => {
        let hasMetamask = await this.checkMetamask()
        let elysToken = null
        if(hasMetamask){
            window.web3 = new Web3(window.ethereum);
            elysToken = new window.web3.eth.Contract(abi, contractAddress['elys'])

            if(!window.ethereum.isConnected){
              console.log(hasMetamask)
                this.setState({loading: false, hasMetamask: true, isConnected: false})
                return
            }
            // let accounts = await window.web3.eth.getAccounts();
            // let connected = accounts.length>0;
             this.setState({loading: false,hasMetamask: true, isConnected: false})
        }
        else{
            this.setState({loading: false})
        }
        let price = await this.getPrice()
        const elysAmount = this.props.domElement.getAttribute("data-price")
        const currency = this.props.domElement.getAttribute("currency")
        let amount = elysAmount
        if (currency == "USD") {
          amount = (elysAmount / price.usd)
          amount = Math.round(amount * 10) / 10
          this.setState({elysAmount: amount, dollarAmount: elysAmount, usdCurr: true})
        }
        else {
          this.setState({elysAmount: amount})
        }
        console.log("PRICE ", price)
        console.log("ELYS TOKEN ", elysToken)
        this.setState({elysPrice:price, elysToken: elysToken})

    }
    connect = async () => {
        //window.ethereum.enable();
        console.log("inside connect")
        try{
            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            let connected = accounts.length>0 && window.ethereum.isConnected
            console.log("inside try connect", connected, accounts)
            if(connected){
                this.setState({isConnected: true})
            }
        }
        catch(e){
            console.log(e)
        }
    }

    getPrice = async () => {
        let price = await elysPrice.get()
        if(price.usd===0 || price.ftm===0){
            let tryAgain = () => {
                return new Promise(resolve=>{
                    let i = setInterval(async () => {
                        let price = await elysPrice.get()
                        if(price.usd!==0 && price.ftm!==0){
                            clearInterval(i)
                            resolve(price)
                        }
                    },1000)
                })
            }
            price = await tryAgain()
        }
        return price
    }

    pay = async () => {
      this.setState({payLoading: "In Transaction..."})
      let { domElement } = this.props
      const title = domElement.getAttribute("product-title")
      const elysAmount = domElement.getAttribute("data-price")
      const target_address = domElement.getAttribute("merchant-wallet")
      console.log("Address: ", target_address)
       let accounts = await window.web3.eth.getAccounts();
       let gasPrice = await window.web3.eth.getGasPrice();
       console.log("GAS: ", gasPrice)
    	 this.state.elysToken.methods.transfer(target_address, this.state.elysAmount*1e5).send({
    	 	from: accounts[0],
    	 	gas: 450000,
    	 	gasPrice: gasPrice
    	 })
       .then((transactionHash) => {
         console.log("Transaction completed: ", transactionHash)
         this.setState({txHash: transactionHash.transactionHash, success: true, payLoading: "Pay with ELYS"})
     	})
      // elysToken.methods.transfer(target_address, amount).send({
    	// 	from: res[0],
    	// 	gas: 450000,
    	// 	gasPrice: "123000000000"
    	// })
    	// .then(function(transactionHash){
      //   console.log("Transaction completed: ", transactionHash)
    	// })
    }

    copyToClipboard = () => {
      console.log("In copy")
      navigator.clipboard.writeText(this.state.txHash);
    }
    render = () => {
        let body = null
        let { domElement } = this.props
        const title = domElement.getAttribute("product-title")
        const elysAmount = domElement.getAttribute("data-price")
        const buttonColor = domElement.getAttribute("button-color")
        const instructions = domElement.getAttribute("instructions")
        const ftmLink = "https://ftmscan.com/tx/" + this.state.txHash
        let pluginButton = (
          <PaymentButton payLoading={this.state.payLoading} elysAmount={this.state.elysAmount} buttonColor={buttonColor} pay={this.pay} connect={this.connect} isConnected={this.state.isConnected}/>

        )
        if (buttonColor == "dWhite" || buttonColor == "dOrange" || buttonColor == "dBrown") {

          pluginButton = (
            <DonateButton payLoading="Donate ELYS" elysAmount={this.state.elysAmount} buttonColor={buttonColor} pay={this.pay} connect={this.connect} isConnected={this.state.isConnected}/>
          )
          console.log("Here", pluginButton)
        }
        console.log("is Connected: ", this.state.payLoading)
            if(this.state.hasMetamask && !this.state.isConnected){
                body = (<IntroContainer>

                          {
                            this.state.usdCurr ? <FeatureText>${this.state.dollarAmount} ({this.state.elysAmount} ELYS)</FeatureText>
                            :
                            <FeatureText> {this.state.elysAmount} ELYS</FeatureText>
                          }
                            {pluginButton}
                            <br/>
                            {
                              this.state.success ? <Alert variant="success" style={{margin:"auto"}}>
                              Your transaction was successful. Click here to see on fantom scan: <LinkContainer><CopyText href={ftmLink}>{ftmLink}</CopyText>&nbsp;&nbsp;<FaRegCopy style={{cursor: 'pointer'}} onClick={this.copyToClipboard} /></LinkContainer>
                              <br/>
                              Seller instructions: {instructions}
                              </Alert>
                              :
                              null
                            }

                        </IntroContainer>)
            } else if (!this.state.hasMetamask){
                body = <div>no metamask</div>
            } else {
                body=(
                  <IntroContainer>
                        {
                          this.state.usdCurr ? <FeatureText>${this.state.dollarAmount} ({this.state.elysAmount} ELYS)</FeatureText>
                          :
                          <FeatureText> {this.state.elysAmount} ELYS</FeatureText>
                        }
                              {pluginButton}                              
                              <br/>
                              {
                                this.state.success ? <Alert variant="success" style={{margin:"auto"}}>
                                  Your transaction was successful. Click here to see on fantom scan:  <LinkContainer><CopyText href={ftmLink}>{ftmLink}</CopyText>&nbsp;&nbsp;<FaRegCopy style={{cursor: 'pointer'}} onClick={this.copyToClipboard} /></LinkContainer>
                                  <br/>
                                  Seller instructions: {instructions}
                                </Alert>
                                :
                                null
                              }
                  </IntroContainer>                )
            }


        return (
            <div>
                {body}
            </div>
        )
    }
}

export default Main

  const FeatureText = styled.p`
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 0px;

  `

  const CopyText = styled.a`
    color: #EC7019;
    :hover {
        background-color: #facbac;
        cursor: pointer;
      }
  `

  const IntroContainer = styled.div`
    display: flex;
    flex-direction: column;
  `

  const LinkContainer = styled.div`
    display: inline;
  `
