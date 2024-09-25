import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native"
import MainNavigation from "./Navigation/MainNavigation.tsx";
import React, {useEffect} from "react";
import {Platform} from "react-native";
import SplashScreen from "react-native-splash-screen";
import {AuthProvider} from "./Components/AuthContext/AuthContext.tsx";
import {ProviderDataProvider} from "./context/ProviderDataContext.tsx";
import FlashMessage from "react-native-flash-message";

const App = () => {
    useEffect(() => {
        if (Platform.OS === 'android')
            SplashScreen.hide();
    }, []);
    return (
        <ProviderDataProvider>
            <AuthProvider>
                <NavigationContainer>
                    <MainNavigation/>
                </NavigationContainer>
            </AuthProvider>
            <FlashMessage position={'top'}/>
        </ProviderDataProvider>
    );
};

export default App;
