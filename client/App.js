import React from 'react';
import {ThemeProvider} from "@material-ui/core";
import theme from "./theme";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {hot} from 'react-hot-loader';
import Home from "./Home";
import SignUp from "./SignUp";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/signup'} element={<SignUp/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default hot(module)(App);