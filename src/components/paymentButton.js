import elyseos from '../Elyseos-logo-32x32.png'
import React, { useState, useEffect } from "react"

function PaymentButton(props) {
  if (props.isConnected) {
    switch (props.buttonColor) {
      case "White":
        return (
            <button style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #ffffff',
                borderRadius: 20,
                padding: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 50,
                fontSize: 18,
                fontWeight: 500,
                color: '#231B17',
                width: 190
            }} onClick={props.pay}>Pay with ELYS <img src={elyseos} style={{ paddingLeft: '10px'}}/></button>
          )
      break;

      case "Orange":
        return (
            <button style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#EC7019',
                border: '1px solid #ffffff',
                borderRadius: 20,
                padding: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 50,
                fontSize: 18,
                fontWeight: 500,
                color: '#ffffff',
                width: 190
            }} onClick={props.pay}>Pay with ELYS <img src={elyseos} style={{ paddingLeft: '10px'}}/></button>
          )
      break;

      case "Brown":
        return (
            <button style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#231B17',
                border: '1px solid #ffffff',
                borderRadius: 20,
                padding: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 50,
                fontSize: 18,
                fontWeight: 500,
                color: '#ffffff',
                width: 190
            }} onClick={props.pay}>Pay with ELYS <img src={elyseos} style={{ paddingLeft: '10px'}}/></button>
          )
      break;

      default:
        return (
            <button style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#EC7019',
                border: '1px solid #ffffff',
                borderRadius: 20,
                padding: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 50,
                fontSize: 18,
                fontWeight: 500,
                color: '#ffffff',
                width: 190
            }} onClick={props.pay}>Pay with ELYS <img src={elyseos} style={{ paddingLeft: '10px'}}/></button>
          )
      break;
    }

  }
  else {
    switch (props.buttonColor) {
      case "White":
      console.log("In white")
      return (
          <button style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              border: '1px solid #ffffff',
              borderRadius: 20,
              padding: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 50,
              fontSize: 18,
              fontWeight: 500,
              color: '#231B17',
              width: 190
          }} onClick={props.connect}>Connect Wallet <img src={elyseos} style={{ paddingLeft: '10px'}}/></button>
      );
      break;

      case "Orange":
      console.log("In orange")
      return (
          <button style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#EC7019',
              border: '1px solid #ffffff',
              borderRadius: 20,
              padding: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 50,
              fontSize: 18,
              fontWeight: 500,
              color: '#ffffff',
              width: 190
          }} onClick={props.connect}>Connect Wallet <img src={elyseos} style={{ paddingLeft: '10px'}}/></button>
      );
      break;

      case "Brown":
      return (
          <button style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#231B17',
              border: '1px solid #ffffff',
              borderRadius: 20,
              padding: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 50,
              fontSize: 18,
              fontWeight: 500,
              color: '#ffffff',
              width: 190
          }} onClick={props.connect}>Connect Wallet <img src={elyseos} style={{ paddingLeft: '10px'}}/></button>
      );
      break;

      default:
      console.log("In default")
      return (
          <button style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#EC7019',
              border: '1px solid #ffffff',
              borderRadius: 20,
              padding: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 50,
              fontSize: 18,
              fontWeight: 500,
              color: '#ffffff',
              width: 190
          }} onClick={props.connect}>Connect Wallet <img src={elyseos} style={{ paddingLeft: '10px'}}/></button>
      );
      break;
    }

  }
}
  export default PaymentButton;
