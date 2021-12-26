import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { Signin } from '~/views/access'
import { Main, List } from '~/views/main'
import { Tab, Tabx } from '~/views/tab'
import { Playground } from '~/views/playground'

export function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/">
          <Main>
            <Switch>
              <Route exact path="/tab/:id" component={Tab} />
              <Route exact path="/tabx" component={Tabx} />
              <Route exact path="/playground" component={Playground} />
              <Route path="/" component={List} />
              
            </Switch>
          </Main>
        </Route>
      </Switch>
    </div>
  )
}

export default App
