import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux';
import {makeStore} from './redux/store'
import './styles/main'

import Header from './components/Header'
import Sidebar from './components/Sidebar';
import Main from './components/Main';

export const store = makeStore();

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Header />

                <section className='container'>
                    <Sidebar />
                    <Main />
                </section>
            </Provider>
        )
    }
}

ReactDom.render(
    <App />, 
    document.getElementById('app')
)