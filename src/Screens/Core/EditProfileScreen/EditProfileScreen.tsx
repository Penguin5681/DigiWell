import React, {SetStateAction, useState} from 'react';
import {Image, SafeAreaView, useColorScheme, View} from 'react-native';
import GlobalStyle from '../../../Assets/GlobalStyles/GlobalStyle';
import Style from './Style.ts';
import {
	scaleFontSize,
	verticalScale,
} from '../../../Utility/ScalingUtility/ScalingUtility';
import OptionsHeaderText from '../../../Components/OptionsHeaderText/OptionsHeaderText.tsx';
import EditText from '../../../Components/EditText/EditText.tsx';

const EditProfileScreen = ({navigation}: {navigation: any}) => {
	const colorSchema = useColorScheme();
	const [defaultNameValue, setDefaultNameValue] = useState('');
	const [defaultPasswordValue, setDefaultPassword] = useState('');
	const [defaultConfirmPasswordValue, setDefaultConfirmPasswordValue] =
		useState('');
	return (
		<SafeAreaView
			style={[
				GlobalStyle.globalBackgroundFlex,
				{backgroundColor: colorSchema === 'light' ? '#FFF' : '#000'},
			]}>
			<View style={Style.rootContainer}>
				<View style={Style.headerContainer}>
					<OptionsHeaderText
						text={'Edit Profile'}
						color={colorSchema === 'dark' ? '#FFF' : '#000'}
						fontSize={scaleFontSize(25)}
						marginBottom={verticalScale(15)}
						onPress={() => null}
					/>
					<Image
						style={[
							Style.userProfileImage,
							{borderColor: colorSchema === 'light' ? '#000' : '#FFF'},
						]}
						source={require('../../../Assets/Images/monkey.jpg')}
					/>
				</View>

				<View style={Style.inputFieldContainer}>
					<View style={Style.nameInputFieldContainer}>
						<OptionsHeaderText
							text={'Name'}
							color={colorSchema === 'dark' ? '#FFF' : '#000'}
							fontSize={scaleFontSize(18)}
							marginBottom={verticalScale(15)}
							onPress={() => null}
						/>

						<EditText
							text={'Enter your name'}
							inputType={'text'}
							value={defaultNameValue}
							onChangeText={(value: SetStateAction<string>) => {
								setDefaultNameValue(value);
							}}
							backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
							placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
							textColor={colorSchema === 'light' ? '#000' : '#FFF'}
							leftMargin={0}
							rightMargin={0}
						/>
					</View>

					<View style={Style.passwordInputFieldContainer}>
						<OptionsHeaderText
							text={'Password'}
							color={colorSchema === 'dark' ? '#FFF' : '#000'}
							fontSize={scaleFontSize(18)}
							marginBottom={verticalScale(15)}
							onPress={() => null}
						/>

						<EditText
							text={'Password'}
							inputType={'password'}
							value={defaultPasswordValue}
							onChangeText={(value: SetStateAction<string>) => {
								setDefaultPassword(value);
							}}
							backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
							placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
							textColor={colorSchema === 'light' ? '#000' : '#FFF'}
							leftMargin={0}
							rightMargin={0}
						/>
					</View>

					<View style={Style.confirmPasswordInputFieldContainer}>
						<OptionsHeaderText
							text={'Confirm Password'}
							color={colorSchema === 'dark' ? '#FFF' : '#000'}
							fontSize={scaleFontSize(18)}
							marginBottom={verticalScale(15)}
							onPress={() => null}
						/>

						<EditText
							text={'Confirm Password'}
							inputType={'text'}
							value={defaultConfirmPasswordValue}
							onChangeText={(value: SetStateAction<string>) => {
								setDefaultConfirmPasswordValue(value);
							}}
							backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
							placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
							textColor={colorSchema === 'light' ? '#000' : '#FFF'}
							leftMargin={0}
							rightMargin={0}
						/>
					</View>
					{/*<View></View>*/}
					{/*<View></View>*/}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default EditProfileScreen;
