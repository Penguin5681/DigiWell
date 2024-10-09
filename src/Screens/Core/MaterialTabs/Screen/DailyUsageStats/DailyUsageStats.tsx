import {Dimensions, SafeAreaView, Text, useColorScheme, View} from 'react-native';
import {
	LineChart,
} from "react-native-chart-kit";

const DailyUsageStats = () => {
	const colorSchema = useColorScheme();
	const screenWidth = Dimensions.get("window").width;
	const data = {
		labels: ["January", "February", "March", "April", "May", "June"],
		datasets: [
			{
				data: [20, 45, 28, 80, 99, 43],
				color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
				strokeWidth: 2 // optional
			}
		],
		legend: ["Rainy Days"] // optional
	};
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: colorSchema === 'dark' ? "#FFF" : "#FFF"}}>
			<View>
				<LineChart
					data={data}
					width={screenWidth}
					height={220}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DailyUsageStats;


