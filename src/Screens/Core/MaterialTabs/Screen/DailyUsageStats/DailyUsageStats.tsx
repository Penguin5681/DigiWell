import {SafeAreaView, Text, useColorScheme} from 'react-native';

const DailyUsageStats = () => {
	const colorSchema = useColorScheme();
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: colorSchema === 'dark' ? "#000" : "#FFF"}}>
			<Text>
				Daily App Usage Graph
			</Text>
		</SafeAreaView>
	);
};

export default DailyUsageStats;
