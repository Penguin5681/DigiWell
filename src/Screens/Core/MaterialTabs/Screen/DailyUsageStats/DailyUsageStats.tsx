import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, useColorScheme, View } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';
import { NativeModules } from 'react-native';

const { AppUsageModule } = NativeModules;

const DailyUsageStats = () => {
	const colorSchema = useColorScheme();
	const darkModeGradientColorList = ['#3f3c3c', '#313334'];
	const lightModeGradientColorList = ['#c6c6d2', '#d0d0e8'];
	const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
	const [usageData, setUsageData] = useState([0, 0, 0, 0]); // Morning, Afternoon, Evening, Night
	const horizontalMargin = 15;

	useEffect(() => {
		const updateWidth = () => {
			setScreenWidth(Dimensions.get("window").width);
		};

		const subscription = Dimensions.addEventListener('change', updateWidth);

		AppUsageModule.getUsageStatsForDay()
			.then((result: any) => {
				setUsageData([
					parseUsageTime(result.morning),
					parseUsageTime(result.afternoon),
					parseUsageTime(result.evening),
					parseUsageTime(result.night),
				]);
			})
			.catch((error: Error) => console.error(error));

		return () => {
			subscription?.remove();
		};
	}, []);

	const parseUsageTime = (timeString: string) => {
		const [hours, minutes] = timeString.split(/[h m]/).map(Number);
		return (hours || 0) * 60 + (minutes || 0); // Convert hours and minutes to total minutes
	};

	const data: LineChartData = {
		labels: ["Morning", "Afternoon", "Evening", "Night"],
		datasets: [
			{
				data: usageData,
				color: colorSchema === 'dark' ? (opacity = 1) => `rgba(112, 18, 206, ${opacity})` : (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
				strokeWidth: 2,
				withDots: true,
			},
		],
		legend: ["Screen Usage Time (Minutes)"],
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

export default DailyUsageStats;
