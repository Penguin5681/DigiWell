import {StyleSheet} from "react-native";
import {getUrbanistFontFamily} from "../../Assets/Fonts/helper";
import {scaleFontSize, verticalScale} from "../../Utility/ScalingUtility/ScalingUtility";

const Style = StyleSheet.create({
    buttonLayout: {
        borderRadius: 8,
        paddingTop: verticalScale(15.3),
        paddingBottom: verticalScale(15.3),
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: getUrbanistFontFamily('Urbanist', '600'),
        fontSize: scaleFontSize(15),
    }
});

export default Style;
