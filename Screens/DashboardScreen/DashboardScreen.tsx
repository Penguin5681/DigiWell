import { Appearance, SafeAreaView, Text } from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import { Routes } from "../../Navigation/Routes";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import {firebase} from "@react-native-firebase/auth";
const DashboardScreen = ({navigation}: { navigation: any }) => {
    const colorSchema = Appearance.getColorScheme();

    return (
        <SafeAreaView style={[GlobalStyle.globalBackgroundFlex, GlobalStyle.globalAppBackground]}>
            <Text style={{color: '#FFF'}}>
                Top 5 used apps
            </Text>
            <LoginSignUpButton text={'SignOut'} onPress={()=>{
                firebase.auth().signOut().then(() => {
                    navigation.navigate(Routes.LoginScreen);
                }).catch(error => {
                    console.log(error)
                });
            }} buttonColor={'#1936c5'} textColor={'#fff'} isEnabled={true}
                               buttonRadius={8} leftMargin={30} topMargin={50}/>
        </SafeAreaView>
    );
};

export default DashboardScreen;
