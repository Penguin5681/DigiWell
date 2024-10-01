import {StyleSheet} from "react-native";
import {getInterFontFamily, getUrbanistFontFamily} from "../../Assets/Fonts/helper";
import {scaleFontSize} from "../../Utility/ScalingUtility/ScalingUtility";

const Style = StyleSheet.create({
    textStyle: {
        color: '#309CFF',
        fontFamily: getUrbanistFontFamily('Urbanist', '700'),
        fontSize: scaleFontSize(23.25),
    }
});

export default Style;
