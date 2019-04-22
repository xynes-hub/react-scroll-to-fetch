import React, { Component } from 'react'
import PropTypes from 'prop-types'
// require("babel-core/register");
// require("babel-polyfill");
export default class ScrollToFetch extends Component {
  constructor(){
    super();
    this.uniqueId();
  }
  uniqueId=()=>{
    var rand=Math.floor(Math.random()*1000).toString()+Date.now();
    var id=rand+"_scrollToFetch_bottom"
    if(document.getElementById(id)===null){
      this.bottom_id=id;
    }else{
      this.uniqueId()
    }
  }
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
    // console.log("scroll event")
    if(!this.props.finished){
    var b=document.getElementById(this.bottom_id);
    b=b.getBoundingClientRect();
    let bottomY=b.top;
    let viewportHeight=0;
    if(!this.props.scrollParent){
      viewportHeight=document.documentElement.clientHeight;
    }else{
      var scPrnt=document.getElementById(this.props.scrollParent)
      viewportHeight=scPrnt.clientHeight;
      var scPrntTop=scPrnt.getBoundingClientRect().top;
      console.log("viewport",viewportHeight,"bottom",bottomY,"scrollparent",scPrntTop);
      bottomY=bottomY-scPrntTop;
    }
    
    // console.log('top',b.top,'viewport',document.documentElement.clientHeight);
    // console.log(viewportHeight)
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
    console.log(this.bottom_id);
    let {finished,successMessage,loader,children}=this.props;
    if(!loader){
      loader=<div style={{textAlign:'center'}}>Loading...</div>
    }
    if(!successMessage){
      successMessage=<div style={{textAlign:'center'}}>No more data to load</div>
    }
    return (
      <div style={{margin:20}}>
        {children}
        {finished ? successMessage:loader}
        <div id={this.bottom_id}></div>
      </div>
    )
  }
}
