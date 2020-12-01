import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import './App.css'

import {Templates} from './comopnents/MainComponents'
import  Header  from './comopnents/partials/Header/index'
import Footer from './comopnents/partials/Footer/index'



const Page = (props) => {
  return (
    <div>
      <BrowserRouter>
      <Templates>  
        <Header />

          <Routes />

        <Footer />
        </Templates>
      </BrowserRouter>
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user:state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
     
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);