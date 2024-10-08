import {SafeAreaView, Text, useColorScheme} from 'react-native';

const WeeklyUsageStats = () => {
	const colorSchema = useColorScheme();
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: colorSchema === 'dark' ? "#000" : "#FFF"}}>
			<Text>
				Weekly App Usage Graph
			</Text>
		</SafeAreaView>
	);
};

export default WeeklyUsageStats;
