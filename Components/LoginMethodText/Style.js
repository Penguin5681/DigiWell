import {StyleSheet} from "react-native";
import {getUrbanistFontFamily} from "../../Assets/Fonts/helper";

const Style = StyleSheet.create({
   textStyle: {
       color: "#6A707C",
       fontFamily: getUrbanistFontFamily('Urbanist', '600'),
       fontSize: 12.913,
       textAlign: 'center'
   },
});

export default Style;
