import React, { Component } from 'react'

import ScrollToFetch from 'react-scroll-to-fetch'

export default class App extends Component {
  state={
    tmp:[],
    finished:false
  }

  fakeFetch=(n)=>{
    let tmp=[];
    for(var i=n;i<n+50;i++){
      tmp[i]=i;
    }
    this.setState({tmp:[...this.state.tmp,...tmp]});
    if(i >150){
      this.setState({finished:true})
    }
  }
  fetch=page=>{
    console.log(page);
    return new Promise((resolve)=>{
      setTimeout(()=>{this.fakeFetch((page-1)*50);resolve()},1000)
    })
  }
  render () {
    return (
      <div style={{height:300,backgroundColor:'red',overflowY:'scroll'}} id="scroll">
        
        <ScrollToFetch
        fetch={this.fetch} 
        finished={this.state.finished}
        loader={<div style={{textAlign:'center'}}>Loading...</div>}
        successMessage={<div style={{textAlign:'center'}}>No more data to load</div>}
        scrollParent="scroll"
        >{this.state.tmp.map((v,i)=>{
          return <div key={i}>this element no {v}</div>
        })}</ScrollToFetch>
      </div>
    )
  }
}
