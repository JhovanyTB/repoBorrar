import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tablero from "../pages/tablero/Tablero";

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path={"/"} element={<Tablero/>} />
                <Route exact path={"/Tablero"} element={<Tablero/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;