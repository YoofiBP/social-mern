import React from 'react';
import {ThemeProvider} from "@mui/material";
import theme from "./theme";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {hot} from 'react-hot-loader';
import Home from "./Home";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default hot(module)(App);