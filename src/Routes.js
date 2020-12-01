import React from 'react'
import { Switch } from 'react-router-dom'
import RouteHandler from './comopnents/RouteHandler'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import AdPage from './pages/AdPage'
import AddAd from './pages/AddAd'
import Ads from './pages/Ads'

export default () => {
    return (
        <Switch>
            <RouteHandler exact path="/">
                <Home />
            </RouteHandler>
            <RouteHandler path="/About">
                <About />
            </RouteHandler>
            <RouteHandler exact path="/signin" >
                <SignIn />
            </RouteHandler>
            <RouteHandler exact path="/SignUp">
                <SignUp />
            </RouteHandler>
            <RouteHandler exact path="/ad/:id">
                <AdPage  />
            </RouteHandler>
            <RouteHandler private exact path="/post-an-ad">
                <AddAd  />
            </RouteHandler>
            <RouteHandler exact path="/ads">
                <Ads  />
            </RouteHandler>
            <RouteHandler>
                <NotFound />
            </RouteHandler>

        </Switch>
    )
}