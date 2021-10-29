import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Alert } from 'react-bootstrap';

function PaymentButton(props) {
  if (props.isConnected) {
    switch (props.buttonColor) {
      case "White":
        return (
            <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #ffffff',
                borderRadius: 20,
                padding: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: 17,
                fontWeight: 500,
                color: '#231B17',
                width: 190
            }} onClick={props.pay}>{props.payLoading}<img src="//images.ctfassets.net/k5e22fb1pq4n/3LXCv1bu6N4khKXGC6kAcB/fe51ca1ec93befa56c4095454ff573d1/Elyseos-logo-32x32.png" style={{ paddingLeft: '10px'}}/></button>
          )
      break;

      case "Orange":
        return (
            <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EC7019',
                border: '1px solid #ffffff',
                borderRadius: 20,
                padding: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: 17,
                fontWeight: 500,
                color: '#ffffff',
                width: 190
            }} onClick={props.pay}>{props.payLoading}<img src="//images.ctfassets.net/k5e22fb1pq4n/5Y3bIZDykC6sNVjvVGa44p/e9b938b853cba3e6667c3515b43f30dd/elyseos-logo-white-trans_32px.png" style={{ paddingLeft: '10px'}}/></button>
          )
      break;

      case "Brown":
        return (
            <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#231B17',
                border: '1px solid #ffffff',
                borderRadius: 20,
                padding: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: 17,
                fontWeight: 500,
                color: '#ffffff',
                width: 190
            }} onClick={props.pay}>{props.payLoading}<img src="//images.ctfassets.net/k5e22fb1pq4n/3LXCv1bu6N4khKXGC6kAcB/fe51ca1ec93befa56c4095454ff573d1/Elyseos-logo-32x32.png" style={{ paddingLeft: '10px'}}/></button>
          )
      break;

      default:
        return (
            <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EC7019',
                border: '1px solid #ffffff',
                borderRadius: 20,
                padding: 10,
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: 17,
                fontWeight: 500,
                color: '#ffffff',
                width: 190
            }} onClick={props.pay}>{props.payLoading}<img src="//images.ctfassets.net/k5e22fb1pq4n/5Y3bIZDykC6sNVjvVGa44p/e9b938b853cba3e6667c3515b43f30dd/elyseos-logo-white-trans_32px.png" style={{ paddingLeft: '10px'}}/></button>
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
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              border: '1px solid #ffffff',
              borderRadius: 20,
              padding: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              fontSize: 17,
              fontWeight: 500,
              color: '#231B17',
              width: 190
          }} onClick={props.connect}>Connect Wallet <img src="//images.ctfassets.net/k5e22fb1pq4n/3LXCv1bu6N4khKXGC6kAcB/fe51ca1ec93befa56c4095454ff573d1/Elyseos-logo-32x32.png" style={{ paddingLeft: '10px'}}/></button>
      );
      break;

      case "Orange":
      console.log("In orange")
      return (
          <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EC7019',
              border: '1px solid #ffffff',
              borderRadius: 20,
              padding: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              fontSize: 17,
              fontWeight: 500,
              color: '#ffffff',
              width: 190
          }} onClick={props.connect}>Connect Wallet <img src="//images.ctfassets.net/k5e22fb1pq4n/5Y3bIZDykC6sNVjvVGa44p/e9b938b853cba3e6667c3515b43f30dd/elyseos-logo-white-trans_32px.png" style={{ paddingLeft: '10px'}}/></button>
        );
      break;

      case "Brown":
      return (
          <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#231B17',
              border: '1px solid #ffffff',
              borderRadius: 20,
              padding: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              fontSize: 17,
              fontWeight: 500,
              color: '#ffffff',
              width: 190
          }} onClick={props.connect}>Connect Wallet <img src="//images.ctfassets.net/k5e22fb1pq4n/3LXCv1bu6N4khKXGC6kAcB/fe51ca1ec93befa56c4095454ff573d1/Elyseos-logo-32x32.png" style={{ paddingLeft: '10px'}}/></button>
      );
      break;

      default:
      console.log("In default")
      return (
          <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EC7019',
              border: '1px solid #ffffff',
              borderRadius: 20,
              padding: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              fontSize: 17,
              fontWeight: 500,
              color: '#ffffff',
              width: 190
          }} onClick={props.connect}>Connect Wallet <img src="//images.ctfassets.net/k5e22fb1pq4n/5Y3bIZDykC6sNVjvVGa44p/e9b938b853cba3e6667c3515b43f30dd/elyseos-logo-white-trans_32px.png" style={{ paddingLeft: '10px'}}/></button>
      );
      break;
    }

  }
}
  export default PaymentButton;
