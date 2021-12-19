import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

import { Signin } from '~/views/access'
import { Main, List } from '~/views/main'
import { Tab } from '~/views/tab'

export function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/">
          <Main>
            <Switch>
              <Route exact path="/tab/:id" component={Tab}>
              </Route>
              <Route exact path="/" component={List}>
              </Route>
            </Switch>
          </Main>
        </Route>
      </Switch>
    </div>
  )
}

export default App
