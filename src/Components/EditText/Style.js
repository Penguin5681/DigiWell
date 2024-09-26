
import {StyleSheet} from "react-native";
import {horizontalScale, verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";
import {getUrbanistFontFamily} from "../../Assets/Fonts/helper";

const Style = StyleSheet.create({
    inputStyle: {
        flex: 1,
        paddingTop: verticalScale(14.6),
        paddingBottom: verticalScale(14.6),
        paddingLeft: horizontalScale(16.6),
        borderRadius: 7.68,
        fontFamily: getUrbanistFontFamily('Urbanist', '600')
    }
});

export default Style;
