import GlobalStyle from "../../../Assets/GlobalStyles/GlobalStyle";
import { SafeAreaView, Text } from "react-native";
import {Routes} from "../../../Navigation/Routes.ts";

const AppUsageScreen = () => {
    return (
        <SafeAreaView style={[GlobalStyle.globalBackgroundFlex, GlobalStyle.globalAppBackground]}>
            <Text>
                {Routes.AppUsageScreen}
            </Text>
        </SafeAreaView>
    );
};

export default AppUsageScreen;
