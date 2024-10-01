import {StyleSheet} from "react-native";
import {verticalScale} from "../../Utility/ScalingUtility/ScalingUtility";

const GlobalStyle = StyleSheet.create({
    globalBackgroundFlex: {
        flex: 1,
    },
    globalAppBackground: {
        backgroundColor: '#000'
    },
    globalAppLogoContainer: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 7.739,
        justifyContent: 'center',
        alignItems: 'center',
        width: 96,
        height: 51,
    },
    globalAppLogo: {
        width: 84,
        height: 84,
        marginBottom: verticalScale(5)
    }
});

export default GlobalStyle;
