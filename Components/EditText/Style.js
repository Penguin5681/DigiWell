
import {StyleSheet} from "react-native";
import {horizontalScale, verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";
import {getUrbanistFontFamily} from "../../Assets/Fonts/helper";

const Style = StyleSheet.create({
    inputStyle: {
        backgroundColor: "#2f2e2e",
        paddingTop: verticalScale(14.6),
        paddingBottom: verticalScale(14.6),
        paddingLeft: horizontalScale(16.6),
        borderRadius: 7.68,
        color: "#FFF",
        fontFamily: getUrbanistFontFamily('Urbanist', '600')
    }
});

export default Style;
