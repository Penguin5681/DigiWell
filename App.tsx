import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import MainNavigation from "./src/Navigation/MainNavigation.tsx";

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);
	return (
		<NavigationContainer>
			<MainNavigation />
			<FlashMessage position={'top'} />
		</NavigationContainer>
	);
};

export default App;
