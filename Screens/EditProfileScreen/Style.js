import { StyleSheet } from "react-native";
import { getInterFontFamily, getUrbanistFontFamily } from "../../Assets/Fonts/helper";
import { scaleFontSize } from "../../Assets/ScalingUtility/ScalingUtility";

const Styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  editProfileHeader: {
    marginTop: 15,
    textAlign: "center",
    fontFamily: getInterFontFamily("Inter", "700"),
    color: "#FFF",
    fontSize: scaleFontSize(25),
  },
  editProfileNames: {
    color: "#FFF",
    fontFamily: getInterFontFamily("Inter", "700"),
    fontSize: scaleFontSize(20),
  }, dropdown: {
    height:60,
    borderRadius: 7.68,
    backgroundColor: "rgba(217, 217, 217, 0.10)",
    paddingHorizontal: 8,
  }, selectedTextStyle: { fontSize: 16,
    marginLeft: 8, }, placeholderStyle: { color:'#000' },


});

export default Styles;
