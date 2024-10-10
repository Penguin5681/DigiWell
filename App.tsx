import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import MainNavigation from "./src/Navigation/MainNavigation.tsx";
import {AuthProviderProvider} from './src/Context/AuthProviderContext/AuthProviderContext.tsx';

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);
	return (
		<AuthProviderProvider>
			<NavigationContainer>
				<MainNavigation />
				<FlashMessage position={'top'} />
			</NavigationContainer>
		</AuthProviderProvider>
	);
};

export default App;
