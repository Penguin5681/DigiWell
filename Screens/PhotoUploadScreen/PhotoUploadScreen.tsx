import {Appearance, SafeAreaView, Text, useColorScheme} from "react-native";
import GlobalStyle from "../../Assets/GlobalStyles/GlobalStyle";
const PhotoUploadScreen = ({navigation}: {navigation: any}) => {
    const colorSchema = useColorScheme();
    return (
        <SafeAreaView style={[GlobalStyle.globalBackgroundFlex, {backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'}]}>
            <Text>Photo Upload Activity</Text>

        </SafeAreaView>
    );
};

export default PhotoUploadScreen;
