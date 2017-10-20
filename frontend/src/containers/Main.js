import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Profile from '../components/Profile'
import Create from '../components/Create'
import CampaignPage from '../components/CampaignPage'
import Landing from '../components/Landing'
import Logout from '../components/Logout'
// import logo from './logo.svg'

const Profiles = () =>
 <Switch>
   <Route path={'/profile/:address'} component={Profile} />
 </Switch>

const Main = () =>
  <main>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/profile' component={Profiles} />
        <Route path='/create' component={Create} />
        <Route path='/campaign/:id' component={CampaignPage} />
        <Route path='/logout' component={Logout} />
      </Switch>
  </main>

export default Main
