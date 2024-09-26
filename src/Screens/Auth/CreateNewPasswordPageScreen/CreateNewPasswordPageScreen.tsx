import {
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import Style from './Style.ts';
import BackButton from '../../../Components/BackButton/BackButton.tsx';
import {Routes} from "../../../Navigation/Routes.ts";
import HeaderText from '../../../Components/HeaderText/HeaderText.tsx';
import EditText from '../../../Components/EditText/EditText.tsx';
import {SetStateAction, useState} from 'react';
import LoginSignUpButton from '../../../Components/LoginSignUpButton/LoginSignUpButton.tsx';

const CreateNewPasswordPageScreen = ({navigation}: {navigation: any}) => {
	const colorSchema = useColorScheme();
	const [defaultNewPasswordValue, setDefaultNewPasswordValue] = useState('');
	const [defaultConfirmPasswordValue, setDefaultConfirmPasswordValue] =
		useState('');
	return (
		<SafeAreaView>
			<ImageBackground
				source={require('../../../Assets/Images/GlobalAppAssets/img.png')}
				style={{flexDirection: 'row', flexWrap: 'wrap'}}
				resizeMode={'cover'}>
				<View
					style={{
						...StyleSheet.absoluteFillObject,
						backgroundColor: 'rgba(0 ,0, 0, 0.6)',
					}}
				/>

				<View id={'back-button'} style={Style.backButton}>
					<BackButton
						onPress={() => {
							navigation.navigate(Routes.ForgetPasswordPage);
						}}
						backArrowColor={colorSchema === 'dark' ? '#FFF' : '#000'}
						buttonBackgroundColor={colorSchema === 'dark' ? '#000' : '#FFF'}
					/>
				</View>

				<View id={'header-text-view'} style={Style.headerTextView}>
					<HeaderText text={'Create new password'} textColor={'#FFF'} />

					<Text style={Style.subHeaderTextView}>
						Your new password must be unique from those previously used.
					</Text>
				</View>
			</ImageBackground>

			<View
				style={[
					Style.editTextContainer,
					{backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'},
				]}>
				<View style={Style.newPasswordEditTextContainer}>
					<EditText
						text={'New Password'}
						textColor={colorSchema === 'light' ? '#000' : '#FFF'}
						placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
						backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
						leftMargin={0}
						rightMargin={0}
						inputType={'password'}
						value={defaultNewPasswordValue}
						onChangeText={(value: SetStateAction<string>) => {
							setDefaultNewPasswordValue(value);
							console.log('new pass ', value);
						}}
					/>
				</View>

				<View style={Style.confirmPasswordEditTextContainer}>
					<EditText
						text={'Confirm Password'}
						textColor={colorSchema === 'light' ? '#000' : '#FFF'}
						placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
						backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
						leftMargin={0}
						rightMargin={0}
						inputType={'password'}
						value={defaultConfirmPasswordValue}
						onChangeText={(value: SetStateAction<string>) => {
							setDefaultConfirmPasswordValue(value);
							console.log('conf pass ', value);
						}}
					/>
				</View>
				<View style={Style.buttonContainer}>
					<LoginSignUpButton
						text={'Reset Password'}
						textColor={'#FFF'}
						buttonColor={'#1E232C'}
						onPress={() => {
							// TODO: Implement a password update feature without requiring a recent login
						}}
						isEnabled={
							defaultNewPasswordValue.length >= 6 &&
							defaultConfirmPasswordValue.length >= 6 &&
							defaultNewPasswordValue === defaultConfirmPasswordValue
						}
						topMargin={33}
						buttonRadius={8}
						leftMargin={0}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default CreateNewPasswordPageScreen;
