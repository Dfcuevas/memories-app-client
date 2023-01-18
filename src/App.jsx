import React from "react";
import { Container } from "@material-ui/core";
/* import { GoogleOAuthProvider } from "@react-oauth/google"; */
import { gapi } from "gapi-script";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId:
      "293153057237-bsl3f42dkmt7i1106ek1s5kum598gjos.apps.googleusercontent.com",
    plugin_name: "chat",
  });
});

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path={"/"} exact component={() => <Redirect to="/posts" />} />{" "}
          {/* siempre que querramos ir a / redirect nos va a redirigir a /posts la cual es la ruta del componente Home, al igual que /posts/search */}
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route
            path={"/auth"}
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
