# react-scroll-to-fetch

> Fetch Data from server as you scroll down with a simple lightweight React Component. Saves you all the troubles from designing a pagination system. This lightweight library works both with `window` scroll event and scrollable div elements.

[![NPM](https://img.shields.io/npm/v/react-scroll-to-fetch.svg)](https://www.npmjs.com/package/react-scroll-to-fetch) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
## [Demo](https://xynes-git.github.io/react-scroll-to-fetch/)
## Install

```bash
npm install --save react-scroll-to-fetch
```

## Usage
### For Window Scroll
```jsx
import React, { Component } from 'react'
import ScrollToFetch from 'react-scroll-to-fetch'

class Example extends Component {
  render () {
    return (
      <ScrollToFetch
        fetch={this._fetch} 
        finished={this.state.finished}
        loader={<div style={{textAlign:'center'}}>Loading...</div>}
        successMessage={<div style={{textAlign:'center'}}>No more data to load</div>}
        >{//You dynamic Component that is updated by the fetch function}
        </ScrollToFetch>
    )
  }
}
```
> The `_fetch` function recieves one parameter , i.e. `page` and should return a `Promise`.Or if you declare the `_fetch` function as `async` it will work.
### An example of the `_fetch` function
```javaScript
_fetch=(page)=>{
    return new Promise((resolve,reject)=>{
        axios.get("https://domain.tdl/api/getlist?page="+page)
        .then(resp=>{
            if(resp.data.success){
                //handle data
                resolve(resp.data);
            }else{
                //handle error
                reject(resp.data.msg);
            }
        })
        .cathc(err=>{
            //handle error
            reject(err.message);
        }
    });
}
```
### An example of the `_fetch` function using `async/await`

```js
_fetch=async (page)=>{
    try{
        const resp=await axios.get("https://domain.tdl/api/getlist?page="+page);
        if(resp.data.status){
            //handle data
        }else{
            //handle error
        }
    }catch(e){
        //handle error
    }
}
```
### Here is a list of all props :
| Name        | Required     | Type          | Default    | Description|
|:----        |:----     |:----          |:----       |:----|
|fetch |`true`| `func` | |A callback to retrive data from the server.  |
|finished |`true`| `bool` | false | No more data will be fetched from the server when set to `true`.|
|loader|`false` | `element` | `<div> Loading... </div>` | A message to show on the bottom of the list. You can replace it with you beautiful loading animation.
|successMessage|`false`| `element`| `<div> No more data to load` | A message to show when fetching is complete, i.e. `finished` prop is set to `true`.|
|scrollParent|`false`| `string` | | `id` of the **scrollable** `div`. If you want `ScrollToFetch` to listen to `window` scroll events rather than any parent `div` then do not use this prop.|
| currentPage | `false` | `number` | | To manually controll the page no. Click [here](#manually-controll-the-page-number) for more information.|
### Manually Controll the Page Number :
Generally if the `ScrollToFetch` Component gets unmounted, the page no will be reset to zero. Now if you use a global state for the *fetched list* then there will be problem. To overcome this you can controll the page number with `currentPage` props. Here is an example.
```jsx
loadData=async (page)=>{
    this.props.setCurrentPage(page);
    //fetch data
}
render(){
    return (
    <ScrollToFetch
    fethc={this.loadData}
    currentPage={this.props.current_page}
    >
    {//iterate through the loaded list}
    </ScrollToFetch>
    )
}

```
## License

MIT © [xynes](https://xynes.com)
