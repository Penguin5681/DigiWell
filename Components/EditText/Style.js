import {StyleSheet} from "react-native";
import {horizontalScale, verticalScale} from "../../Assets/ScalingUtility/ScalingUtility";

const Style = StyleSheet.create({
    inputStyle: {
        backgroundColor: "#2f2e2e",
        paddingTop: verticalScale(16.6),
        paddingBottom: verticalScale(16.6),
        paddingLeft: horizontalScale(16.6),
        borderRadius: 7.68,
        color: "#FFF"
    }
});

export default Style;
