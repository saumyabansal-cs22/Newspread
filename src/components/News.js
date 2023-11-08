import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Loader from './Loader';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in'
  }
  static propTypes = {
    country: PropTypes.string
  }
    articles = []
    constructor(){ 
        super();
        console.log("hello i am a constructor")
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }
    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=us&apiKey=5313b26330ef44ed8be80eecc78d79e8";
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({articles:parsedData.articles});
    }

    handleNext=async ()=>{
      console.log("next");
      let url=`https://newsapi.org/v2/everything?country=${this.props.country}q=bitcoin&apiKey=5313b26330ef44ed8be80eecc78d79e8&page=${this.state.page+1}`;
      this.setState({loading:true})
      let data=await fetch(url);
      let parsedData=await data.json();
      this.setState({
        page:this.state.page + 1,
        articles:parsedData.articles,
        loading:false   
      })
    }
    handlePrev=async ()=>{
      console.log("prev"); 
      let url=`https://newsapi.org/v2/everything?q=bitcoin&apiKey=5313b26330ef44ed8be80eecc78d79e8&page=${this.state.page-1}`;
      this.setState({loading:true})
      let data=await fetch(url);
      let parsedData=await data.json(); 
      this.setState({
        page:this.state.page - 1,
        articles:parsedData.articles,
        loading:false
      })
    }
  render() {
    return (
        <div className='container my-3'>
        <h2 className='text-center'>Newsmonkey- top headlines</h2>
        {this.state.loading&&<Loader/>}
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
        <div className='row'>
        {this.state.articles.map((element)=>{
            return  <div className='col md' key={element.url}>
            <Newsitem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url} page={this.state.page}/>
          </div>
        })}
        
        </div>
        </div>
    )
  }
}

export default News
