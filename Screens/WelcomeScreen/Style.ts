import {StyleSheet} from "react-native";
import {horizontalScale, verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";
import {getUrbanistFontFamily} from "../../Assets/Fonts/helper";

const Style = StyleSheet.create({
    buttonContainer: {
        marginHorizontal: horizontalScale(17),
        justifyContent: 'center',
        marginTop: verticalScale(40)
    },
    loginButton: {
        marginBottom: verticalScale(18),
    },
    textStyle: {
        fontFamily: getUrbanistFontFamily('Urbanist', '800'),
        color: '#FFF',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    appLogoAndTextContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: verticalScale(15)
    },
    footerView: {
        flexDirection: 'column',
        justifyContent: 'center',
        top: 10
    }

});

export default Style;
