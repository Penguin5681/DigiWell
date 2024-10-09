import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, useColorScheme, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { NativeModules } from 'react-native';

const { AppUsageModule } = NativeModules;

const MonthlyUsageStats = () => {
	const colorSchema = useColorScheme();
	const darkModeGradientColorList = ['#3f3c3c', '#313334'];
	const lightModeGradientColorList = ['#c6c6d2', '#d0d0e8'];
	const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
	const [weeklyUsage, setWeeklyUsage] = useState([0, 0, 0, 0]);

	useEffect(() => {
		const updateWidth = () => {
			setScreenWidth(Dimensions.get("window").width);
		};

		const subscription = Dimensions.addEventListener('change', updateWidth);

		return () => {
			subscription?.remove();
		};
	}, []);

	useEffect(() => {
		const fetchMonthlyUsageStats = async () => {
			try {
				const result = await AppUsageModule.getMonthlyUsageStats();
				setWeeklyUsage(result);
			} catch (error) {
				console.error("Error fetching monthly usage stats: ", error);
			}
		};

		fetchMonthlyUsageStats();
	}, []);

	const data = {
		labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
		datasets: [
			{
				data: weeklyUsage,
				color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
				strokeWidth: 2,
			},
		],
		legend: ["Usage in Minutes"],
	};

	const chartConfig: AbstractChartConfig = {
		backgroundGradientFrom: colorSchema === 'dark' ? darkModeGradientColorList[0] : lightModeGradientColorList[0],
		backgroundGradientTo: colorSchema === 'dark' ? darkModeGradientColorList[1] : lightModeGradientColorList[1],
		color: colorSchema === 'dark' ? (opacity = 1) => `rgba(255, 255, 255, ${opacity})` : (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
		strokeWidth: 2,
		barPercentage: 0.5,
		decimalPlaces: 0,
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colorSchema === 'dark' ? "#000" : "#FFF" }}>
			<View>
				<LineChart
					data={data}
					width={screenWidth - 30}
					height={220}
					yAxisLabel=""
					yAxisSuffix=" min"
					chartConfig={chartConfig}
					bezier
					withInnerLines={false}
					withOuterLines={false}
					style={{
						marginLeft: 15,
						marginRight: 15,
						marginVertical: 8,
						borderRadius: 16,
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default MonthlyUsageStats;
