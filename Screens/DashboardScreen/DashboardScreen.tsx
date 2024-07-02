import { SafeAreaView, Text } from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import { Routes } from "../../Navigation/Routes";

const DashboardScreen = () => {
    return (
        <SafeAreaView style={[GlobalStyle.globalBackgroundFlex, GlobalStyle.globalAppBackground]}>
            <Text style={{color: '#FFF'}}>
                {Routes.DashboardScreen}
            </Text>
        </SafeAreaView>
    );
};

export default DashboardScreen;
