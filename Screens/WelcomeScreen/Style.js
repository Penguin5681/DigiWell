import {StyleSheet} from "react-native";
import {horizontalScale, verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";
import {getUrbanistFontFamily} from "../../Assets/Fonts/helper";

const Style = StyleSheet.create({
    buttonContainer: {
        marginHorizontal: horizontalScale(16),
        marginTop: 'auto',
        marginBottom: 100
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
});

export default Style;
