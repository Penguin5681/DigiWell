import { Appearance, SafeAreaView, Text } from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
import { Routes } from "../../Navigation/Routes";
import LoginSignUpButton from "../../Components/LoginSignUpButton/LoginSignUpButton.tsx";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
const DashboardScreen = ({navigation}: { navigation: any }) => {
    const colorSchema = Appearance.getColorScheme();
    const signOut=async ()=>{
        try {
            await GoogleSignin.revokeAccess();
            await auth().signOut();
            navigation.navigate(Routes.LoginScreen);
            console.log("You are signed out")
        }
        catch (error){
            console.log(error);
        }
    }
    return (
        <SafeAreaView style={[GlobalStyle.globalBackgroundFlex, GlobalStyle.globalAppBackground]}>
            <Text style={{color: '#FFF'}}>
                Top 5 used apps
            </Text>
            <LoginSignUpButton text={'SignOut'} onPress={signOut} buttonColor={'#1936c5'} textColor={'#fff'} isEnabled={true}
                               buttonRadius={8} leftMargin={30} topMargin={50}/>
        </SafeAreaView>
    );
};

export default DashboardScreen;
