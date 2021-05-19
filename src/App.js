import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from 'pages/Login';
import HomePage from 'pages/Home';

import GlobalStyle from 'globalStyles';

function App() {
    return (
        <Router>
            <GlobalStyle />
            <Switch>
                <Route exact path='/login' component={LoginPage} />
                <Route path='/' component={HomePage} />
            </Switch>
        </Router>
    );
}

export default App;
