import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native"
import MainNavigation from "./Navigation/MainNavigation.tsx";
import React, {useEffect} from "react";
import {Platform} from "react-native";
import SplashScreen from "react-native-splash-screen";
import {AuthProvider} from "./Components/AuthContext/AuthContext.tsx";

const App = () => {
    useEffect(() => {
        if (Platform.OS === 'android')
            SplashScreen.hide();
    }, []);
    return (
        <AuthProvider>
            <NavigationContainer>
                <MainNavigation/>
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;
