import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView} from "react-native";

const KeyboardCoveringContainer = ({children, style}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default KeyboardCoveringContainer;
