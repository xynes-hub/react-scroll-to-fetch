import React, { Component } from 'react'
import './App.css';
import ScrollToFetch from 'react-scroll-to-fetch';
export default class App extends Component {
  state={
    tmp:[],
    tmp2:[],
    finished:false,
    finished2:false
  }

  fakeFetch=(n)=>{
    const prevTmp=this.state.tmp;
    let tmp=[];
    for(var i=n;i<n+50;i++){
      tmp.push(i);
    }
    this.setState({tmp:[...prevTmp,...tmp]});
    if(i >150){
      this.setState({finished:true})
    }
  }
  fakeFetch2=(n)=>{
    const prevTmp=this.state.tmp2;
    let tmp=[];
    for(var i=n;i<n+50;i++){
      tmp.push(i);
    }
    this.setState({tmp2:[...prevTmp,...tmp]});
    if(i >150){
      this.setState({finished2:true})
    }
  }
  fetch=page=>{
    console.log(page);
    return new Promise((resolve)=>{
      setTimeout(()=>{this.fakeFetch((page-1)*50);resolve()},1500)
    })
  }
  fetch2=page=>{
    console.log(page);
    return new Promise((resolve)=>{
      setTimeout(()=>{this.fakeFetch2((page-1)*50);resolve()},1500)
    })
  }
  render () {
    return (
      <div className="container" style={{margin:20}}>
      <div style={{float:'left',width:'49%',backgroundColor:'#eeeeee'}}>
      <h1 style={{textAlign:'center'}}>Normal Page Scroll</h1>
        <ScrollToFetch
        fetch={this.fetch} 
        finished={this.state.finished}
        initialLoad={true}
        loader={<div style={{textAlign:'center'}}>Loading...</div>}
        successMessage={<div style={{textAlign:'center'}}>No more data to load</div>}
        // scrollParent="scroll"
        >{this.state.tmp.map((v,i)=>{
          return <div key={i} className="item">This Is Element Number {v}</div>
        })}</ScrollToFetch>
      </div>
      <div style={{position:'fixed',right:0,top:100 ,height:300,width:'50%',backgroundColor:'#eeeeee',overflowY:'scroll'}} id="scroll">
      <h1 style={{textAlign:'center'}}>Scrollable Div</h1>
        <ScrollToFetch
        fetch={this.fetch2} 
        finished={this.state.finished2}
        initialLoad={true}
        // loader={<div style={{textAlign:'center'}}>Loading...</div>}
        successMessage={<div style={{textAlign:'center'}}>No more data to load</div>}
        scrollParent="scroll"
        >{this.state.tmp2.map((v,i)=>{
          return <div key={i} className="item">This Is Element Number {v}</div>
        })}</ScrollToFetch>
      </div>
      </div>
    )
  }
}
