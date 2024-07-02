import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import { SafeAreaView, Text } from "react-native";
import { Routes } from "../../Navigation/Routes";

const ProfileScreen = () => {
    return (
        <SafeAreaView style={[GlobalStyle.globalBackgroundFlex, GlobalStyle.globalAppBackground]}>
            <Text>
                {Routes.ProfileScreen}
            </Text>
        </SafeAreaView>
    );
};

export default ProfileScreen;
