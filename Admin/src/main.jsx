
import './index.css'
import ReactDOM from 'react-dom/client'
import {Toaster} from 'react-hot-toast'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './App.jsx'

import store from './Redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<BrowserRouter>

    <App />
    <Toaster/>

  </BrowserRouter>
  </Provider>
)