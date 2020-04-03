import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "../screens/Home/Home";
import FavouriteMovies from "../screens/FavouriteMovies/FavouriteMovies";
import NotFoundPage from "../screens/NotFoundPage/NotFoundPage";

/* Rotering */
const AppRouters = () => (
    <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route  path={["/", "/movie/upcoming", "/movie/now-playing"]} 
                component={Home} 
                exact={true} 
        />
        <Route path="/favourites" component={FavouriteMovies} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouters;