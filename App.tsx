import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native"
import MainNavigation from "./Navigation/MainNavigation.tsx";
import React from "react";

const App = () => {
    return (
        <NavigationContainer>
            <MainNavigation/>
        </NavigationContainer>
    );
};

export default App;
