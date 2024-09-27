import {StyleSheet} from "react-native";
import {horizontalScale, scaleFontSize, verticalScale} from "../../../Assets/ScalingUtility/ScalingUtility";
import {getUrbanistFontFamily} from "../../../Assets/Fonts/helper";

const Style = StyleSheet.create({
	backButton: {
		marginTop: verticalScale(88),
		marginLeft: horizontalScale(28),
	},
	headerTextView: {
		marginTop: verticalScale(26.33),
		marginLeft: horizontalScale(28.1),
		marginRight: horizontalScale(70.63),
		marginBottom: verticalScale(20),
	},
	subHeaderTextView: {
		fontFamily: getUrbanistFontFamily('Urbanist', '500'),
		fontSize: scaleFontSize(16),
		marginTop: verticalScale(10),
		color: "#FFF"
	},
	inputFieldContainer: {
		marginHorizontal: horizontalScale(27),
		marginTop: verticalScale(25),
	},
	footerTextView: {
		fontFamily: getUrbanistFontFamily( 'Urbanist', '500'),
		fontSize: scaleFontSize(15),
		color: "#D0D0D0",
		letterSpacing: 0.15,
		marginBottom: verticalScale(15)
	},
	footerTextView2: {
		fontFamily: getUrbanistFontFamily('Urbanist', '700'),
		color: '#35C2C1',
		letterSpacing: 0.15
	},

});

export default Style;
