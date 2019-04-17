import React, { Component } from 'react'
import PropTypes from 'prop-types'
require("babel-core/register");
require("babel-polyfill");
export default class ScrollToFetch extends Component {
  static propTypes = {
    finished: PropTypes.bool.isRequired,
    loader:PropTypes.element,
    successMessage:PropTypes.element,
    fetch:PropTypes.func.isRequired,
    scrollParent:PropTypes.string,
    currentPage:PropTypes.number
  }
  state={
    fetching:false,
    page:1
  }
  async componentDidMount(){
    if(!this.props.scrollParent){
      document.addEventListener('scroll',this.trackBottom);
    }else{
      document.getElementById(this.props.scrollParent).addEventListener('scroll',this.trackBottom);
    }
    if(!this.props.currentPage){
      this.setState({fetching:true});
      await this.props.fetch(this.state.page);
      this.setState({fetching:false,page:this.state.page+1})
    }else{
      this.setState({fetching:true});
      await this.props.fetch(this.props.currentPage+1);
      this.setState({fetching:false})
    }
  }
  componentWillUnmount(){
    if(!this.props.scrollParent){
      document.removeEventListener('scroll',this.trackBottom);
    }else{
      document.getElementById(this.props.scrollParent).removeEventListener('scroll',this.trackBottom);
    }
  } 
  trackBottom= async ()=>{
    console.log("scroll event")
    if(!this.props.finished){
    var b=document.getElementById("scrollToFetch_bottom");
    b=b.getBoundingClientRect();
    const bottomY=b.top;
    let viewportHeight=0;
    if(!this.props.scrollParent){
      viewportHeight=document.documentElement.clientHeight;
    }else{
      viewportHeight=document.getElementById(this.props.scrollParent).clientHeight;
    }
    
    // console.log('top',b.top,'viewport',document.documentElement.clientHeight);
    if(bottomY-viewportHeight <=viewportHeight/10){
      //bottom inside viewport
      if(!this.state.fetching){if(!this.props.currentPage){
        this.setState({fetching:true});
        await this.props.fetch(this.state.page);
        this.setState({fetching:false,page:this.state.page+1})
      }else{
        this.setState({fetching:true});
        await this.props.fetch(this.props.currentPage+1);
        this.setState({fetching:false})
      }
      }
      
    }
  }
  }

  render() {
    let {finished,successMessage,loader,children}=this.props;
    if(!loader){
      loader=<div>loading...</div>
    }
    if(!successMessage){
      successMessage=<div style={{textAlign:'center'}}>No more data to load</div>
    }
    return (
      <div id="scrollToFetch_container" style={{margin:20}}>
        {children}
        <div id="scrollToFetch_bottom"></div>
        {finished ? successMessage:loader}
        {}
      </div>
    )
  }
}
