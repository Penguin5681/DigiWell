import { StyleSheet } from "react-native";
import { getInterFontFamily, getUrbanistFontFamily } from "../../Assets/Fonts/helper";
import { horizontalScale, scaleFontSize, verticalScale } from "../../Assets/ScalingUtility/ScalingUtility";

const Styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
    },
    editProfileHeader: {
        marginTop: verticalScale(15),
        marginLeft: horizontalScale(16),
        marginBottom: verticalScale(16),
        fontFamily: getInterFontFamily("Inter", "700"),
        color: "#FFF",
        fontSize: scaleFontSize(25),
    },
    editTextLabelTextCommon: {
        color: "#FFF",
        marginBottom: 10,
        fontFamily: getInterFontFamily("Inter", "700"),
        fontSize: scaleFontSize(20),
    },
});

export default Styles;

