import React, { Component } from 'react'
import Web3 from "web3";
import PaymentButton from '../components/paymentButton'
import ButtonForm from '../components/paymentButtonForm'
import elysPrice from '../lib/elysPrice'
import abi from '../crypto/uniswapV2PairABI.js';
import contractAddress from '../crypto/contractAddress';

import detectEthereumProvider from '@metamask/detect-provider'


class Main extends Component {

    state = {
        loading: true,
        hasMetamask: false,
        elysToken: null,
        elysPrice: {usd:0,ftm:0,loaded: false},
        isConnected: false
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
      let { domElement } = this.props
      const title = domElement.getAttribute("product-title")
      const elysAmount = domElement.getAttribute("data-price")
      const target_address = domElement.getAttribute("merchant-wallet")
      console.log("Address: ", target_address)
       let amount = (elysAmount / this.state.elysPrice.usd) * 100000
       amount = Math.trunc(amount)
       let accounts = await window.web3.eth.getAccounts();
       console.log(Math.trunc(amount))
    	 this.state.elysToken.methods.transfer(target_address, amount).send({
    	 	from: accounts[0],
    	 	gas: 450000,
    	 	gasPrice: "123000000000"
    	 })
       .then(function(transactionHash){
         console.log("Transaction completed: ", transactionHash)
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
    render = () => {
        let body = null
        let { domElement } = this.props
        const title = domElement.getAttribute("product-title")
        const elysAmount = domElement.getAttribute("data-price")
        const buttonColor = domElement.getAttribute("button-color")
        console.log("is Connected: ", this.state.isConnected)
            if(this.state.hasMetamask && !this.state.isConnected){
                body = <PaymentButton buttonColor={buttonColor} pay={this.pay} connect={this.connect} isConnected={this.state.isConnected}/>
            } else if (!this.state.hasMetamask){
                body = <div>no metamask</div>
            } else {
                body=(
                  <PaymentButton buttonColor={buttonColor} pay={this.pay} connect={this.connect} isConnected={this.state.isConnected}/>
                )
            }


        return (
            <div>
                <h3 style={{color: '#ed6f1b'}}>Title of Product: {title}</h3>
                <p style={{color: '#ed6f1b'}}> ELYS (Price): {elysAmount}</p>
                {body}
                <ButtonForm />
            </div>
        )
    }
}

export default Main
