import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
import './App.scss'
import Courierlogin from './components/Courierlogin'
import Home from './components/Home'
import InputNewPwd from './components/InputNewPwd'
import Items from './components/Items'
import NavigatioHeader from './components/NavigatioHeader'
import UserLogin from './components/UserLogin'

export class App extends Component {
  render() {
    return (
      <div className = "app-main">
          {/* <NavigatioHeader /> */}
          <Switch>
            <Route exact path = '/' component = {Courierlogin} />
            <Route exact path = '/userlogin' component = {UserLogin} />
            <Route exact path = '/inputNewPassword' component = {InputNewPwd} />
            <Route exact path = '/home' component = {Home} />
            <Route exact path = '/items' component = {Items} />
          </Switch>
  
          <div className = "footer">
               <h2>Copyright @ StreetEfficient 2021</h2>
           </div>  
      </div>
    )
  }
}

export default App


