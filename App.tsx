import 'react-native-gesture-handler';
import {SafeAreaView, Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native"
import MainNavigation from "./Navigation/MainNavigation.tsx";

const App = () => {
    return (
        <NavigationContainer>
            <MainNavigation/>
        </NavigationContainer>
    );
};

export default App;
