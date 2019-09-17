import * as React from 'react'
import * as ReactDom from 'react-dom'
import {Provider} from 'react-redux';
import makeStore from './redux_setup/store'

export const store = makeStore();

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <div>
                    ✔
                </div>
            </Provider>
        )
    }
}

ReactDom.render(
    <App />, 
    document.getElementById('app')
)