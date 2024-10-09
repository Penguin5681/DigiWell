import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, useColorScheme, View } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';
import { NativeModules } from 'react-native';

const { AppUsageModule } = NativeModules;

const WeeklyUsageStats = () => {
	const colorSchema = useColorScheme();
	const darkModeGradientColorList = ['#3f3c3c', '#313334'];
	const lightModeGradientColorList = ['#c6c6d2', '#d0d0e8'];
	const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
	const [weeklyData, setWeeklyData] = useState([]);
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

	useEffect(() => {
		const fetchWeeklyStats = async () => {
			try {
				const result = await AppUsageModule.getWeeklyUsageStats();
				setWeeklyData(result);
			} catch (error) {
				console.error("Error fetching weekly stats:", error);
			}
		};

		fetchWeeklyStats();
	}, []);

	const data = {
		labels: ["M", "T", "W", "TH", "F", "S", "S"],
		datasets: [
			{
				data: weeklyData.length > 0 ? weeklyData.map((usage) => usage) : [0, 0, 0, 0, 0, 0, 0],
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
					width={screenWidth - 3 * horizontalMargin}
					height={220}
					chartConfig={chartConfig}
					bezier
					withInnerLines={false}
					withOuterLines={false}
					style={{
						marginLeft: horizontalMargin - 5,
						marginRight: horizontalMargin,
						marginVertical: 8,
						borderRadius: 16,
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default WeeklyUsageStats;
