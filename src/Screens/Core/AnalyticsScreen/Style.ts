
import {StyleSheet} from 'react-native';
import {getUrbanistFontFamily} from '../../../Assets/Fonts/helper';
import {horizontalScale, scaleFontSize, verticalScale} from '../../../Utility/ScalingUtility/ScalingUtility';

const Style = StyleSheet.create({
	notificationStatContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: verticalScale(28),
		marginHorizontal: 10,
	},
	periodicNotificationCount: {
	},
	periodicNotificationCountHeaderContainer: {
		flexDirection: "row",
		alignItems: 'center',
		padding: 10
	},
	peakNotificationCountContainer: {

	},
	peakNotificationCountHeaderContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
	},
	gradientWrapper: {
		borderRadius: 11,
	},
	headerLabelText: {
		fontSize: scaleFontSize(15),
		fontFamily: getUrbanistFontFamily('Urbanist', '600')
	},
	countText: {
		fontWeight: '700',
		fontSize: scaleFontSize(30),
		marginLeft: horizontalScale(16)
	},
	countTextWrapper: {
		marginRight: horizontalScale(10),
		marginBottom: verticalScale(9),
	},
	bodyContainer: {
		flex: 0.65,
		margin: 18,
		borderRadius: 11,
	},
});

export default Style;
