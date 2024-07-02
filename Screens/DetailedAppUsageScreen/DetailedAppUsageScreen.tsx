import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import { SafeAreaView, Text } from "react-native";
import { Routes } from "../../Navigation/Routes";

const DetailedAppUsageScreen = () => {
    return (
        <SafeAreaView style={[GlobalStyle.globalBackgroundFlex, GlobalStyle.globalAppBackground]}>
            <Text>
                {Routes.DetailedAppUsageScreen}
            </Text>
        </SafeAreaView>
    );
};

export default DetailedAppUsageScreen;
