import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux';
import {makeStore} from './redux/store'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import './styles/main'

import Header from './components/Header'
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { Bounce } from './components/spinners/Bounce';

export const store = makeStore();

export class App extends React.Component {

    render() {
        return (
            <Router>
            <Provider store={store}>
                <Header />

                <section className='container'>
                    <Sidebar />

                    <React.Suspense fallback={<Bounce />}>
                    <Switch>
                        <Route exact path='/' component={Main} />
                        <Route render={({location}) => <><h1>404</h1> <p>No route found for <b>{`${location.pathname}`}</b> !</p></>} />
                    </Switch>
                    </React.Suspense>
                </section>
            </Provider>
            </Router>
        )
    }
}

ReactDom.render(
    <App />, 
    document.getElementById('app')
)