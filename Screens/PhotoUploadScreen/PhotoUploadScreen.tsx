import { Appearance, SafeAreaView, Text } from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
const PhotoUploadScreen = ({navigation}: {navigation: any}) => {
    const colorSchema = Appearance.getColorScheme();
    return (
        <SafeAreaView style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'}]}>
            <Text>Photo Upload Activity</Text>

        </SafeAreaView>
    );
};

export default PhotoUploadScreen;
