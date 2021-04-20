import React, {useState, useEffect} from "react";
import {YellowBox} from "react-native";
import {firebaseApp} from "./App/utilidades/firebase";
import * as firebase from "firebase";
// import UserLogged from "./UserLogged";
import Loading from "./App/components/Loading";
import AcountStack from "./App/navigations/AcountStack";
import Navigation from "./App/navigations/Navigation";

YellowBox.ignoreWarnings(["Setting a timer"]);


export default function App() {

  const [login, setLogin] = useState(null);

  useEffect(() =>{
      firebase.auth().onAuthStateChanged((user) =>{
        !user ? setLogin(false) : setLogin(true)
      });

  }, [] );

  if (login === null) {
    return <Loading isVisible={true} text="Cargando..."/>;
  }


  return login ? <Navigation/> : <AcountStack/>;
}


