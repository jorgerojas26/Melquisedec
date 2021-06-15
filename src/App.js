import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "pages/Login";
import HomePage from "pages/Home";

import GlobalStyle from "globalStyles";

import DolarContextProvider from "context/dolar";

function App() {
    return (
        <Router>
            <GlobalStyle />
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <DolarContextProvider>
                    <Route path="/" component={HomePage} />
                </DolarContextProvider>
            </Switch>
        </Router>
    );
}

export default App;
