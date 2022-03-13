import React from 'react';
import {ThemeProvider} from "@material-ui/core";
import theme from "./theme";
import {BrowserRouter} from "react-router-dom";
import {hot} from 'react-hot-loader';
import MainRouter from "./MainRouter";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <MainRouter/>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default hot(module)(App);