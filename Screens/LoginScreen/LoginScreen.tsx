import {SafeAreaView, View} from "react-native";
import BackButton from "../../Components/BackButton/BackButton.tsx";
import {useState} from "react";

const LoginScreen = () => {
    const [defaultEmailValue, setDefaultEmailValue] = useState("");
    const [defaultPasswordValue, setDefaultPasswordValue] = useState("");
    return (
        <SafeAreaView>
            <View id={"back-button"}>
                <BackButton/>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
