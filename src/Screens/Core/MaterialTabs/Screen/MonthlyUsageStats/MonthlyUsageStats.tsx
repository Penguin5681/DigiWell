import {SafeAreaView, Text, useColorScheme} from 'react-native';

const MonthlyUsageStats = () => {
	const colorSchema = useColorScheme();
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: colorSchema === 'dark' ? "#000" : "#FFF"}}>
			<Text>
				Monthly App Usage Graph
			</Text>
		</SafeAreaView>
	);
};

export default MonthlyUsageStats;
