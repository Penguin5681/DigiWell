import { Appearance, SafeAreaView, Text } from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import { Routes } from "../../Navigation/Routes";

const DashboardScreen = () => {
    const colorSchema = Appearance.getColorScheme();
    return (
        <SafeAreaView style={[GlobalStyle.globalBackgroundFlex, GlobalStyle.globalAppBackground]}>
            <Text style={{color: '#FFF'}}>
                Top 5 used apps
            </Text>
        </SafeAreaView>
    );
};

export default DashboardScreen;
