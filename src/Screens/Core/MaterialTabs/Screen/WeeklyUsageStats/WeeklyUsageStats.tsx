import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, useColorScheme, View } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const WeeklyUsageStats = () => {
	const colorSchema = useColorScheme();
	const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
	const horizontalMargin = 15;

	useEffect(() => {
		const updateWidth = () => {
			setScreenWidth(Dimensions.get("window").width);
		};

		const subscription = Dimensions.addEventListener('change', updateWidth);

		return () => {
			subscription?.remove();
		};
	}, []);

	const data = {
		labels: ["1st", "2nd", "3rd", "4th", "5th", "6th"],
		datasets: [
			{
				data: [20, 45, 28, 80, 99, 43],
				color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
				strokeWidth: 2,
			},
		],
		legend: ["Rainy Days"],
	};

	const chartConfig = {
		backgroundGradientFrom: "#fff",
		backgroundGradientTo: "#fff",
		color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
		strokeWidth: 2,
		barPercentage: 0.5,
		decimalPlaces: 0,
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colorSchema === 'dark' ? "#000" : "#FFF" }}>
			<View>
				<LineChart
					data={data}
					width={screenWidth - 3 * horizontalMargin}
					height={220}
					yAxisLabel="$"
					chartConfig={chartConfig}
					bezier
					withInnerLines={false}
					withOuterLines={false}
					style={{
						marginLeft:horizontalMargin - 5,
						marginRight:horizontalMargin,
						marginVertical: 8,
						borderRadius: 16,
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default WeeklyUsageStats;
