import React, {useState} from 'react';
import {
	Appearance,
	SafeAreaView,
	Switch,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import GlobalStyle from '../../../Assets/GlobalStyles/GlobalStyle';
import SettingsPageHeaderText from '../../../Components/SettingsPageHeaderText/SettingsPageHeaderText.tsx';
import Style from './Style.ts';
import {SvgXml} from 'react-native-svg';
import OptionsHeaderText from '../../../Components/OptionsHeaderText/OptionsHeaderText.tsx';
import {
	scaleFontSize,
	verticalScale,
} from '../../../Assets/ScalingUtility/ScalingUtility';
import BackButton from '../../../Components/BackButton/BackButton.tsx';
import {Routes} from '../../../Navigation/Routes.ts';

const accountIconVector =
	'<svg width="30" height="30" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
	'<path d="M3 27C2.175 27 1.4685 26.706 0.880502 26.118C0.292502 25.53 -0.000997453 24.824 2.54669e-06 24V3C2.54669e-06 2.175 0.294003 1.4685 0.882003 0.880502C1.47 0.292502 2.176 -0.000997453 3 2.54669e-06H24C24.825 2.54669e-06 25.5315 0.294003 26.1195 0.882003C26.7075 1.47 27.001 2.176 27 3V11.5125C26.3 11.1625 25.5685 10.906 24.8055 10.743C24.0425 10.58 23.274 10.499 22.5 10.5C21.775 10.5 21.0875 10.569 20.4375 10.707C19.7875 10.845 19.15 11.0385 18.525 11.2875C18.6 11.0375 18.6565 10.7875 18.6945 10.5375C18.7325 10.2875 18.751 10.025 18.75 9.75C18.75 8.3 18.2375 7.0625 17.2125 6.0375C16.1875 5.0125 14.95 4.5 13.5 4.5C12.05 4.5 10.8125 5.0125 9.7875 6.0375C8.7625 7.0625 8.25 8.3 8.25 9.75C8.25 11.2 8.7625 12.4375 9.7875 13.4625C10.8125 14.4875 12.05 15 13.5 15H13.875C13.55 15.45 13.269 15.9315 13.032 16.4445C12.795 16.9575 12.5885 17.4885 12.4125 18.0375C10.5625 18.1625 8.8435 18.6 7.2555 19.35C5.6675 20.1 4.249 21.075 3 22.275V24H12.45C12.625 24.55 12.825 25.075 13.05 25.575C13.275 26.075 13.55 26.55 13.875 27H3ZM21 28.5L20.55 26.25C20.25 26.125 19.9685 25.9935 19.7055 25.8555C19.4425 25.7175 19.174 25.549 18.9 25.35L16.725 26.025L15.225 23.475L16.95 21.975C16.9 21.625 16.875 21.3 16.875 21C16.875 20.7 16.9 20.375 16.95 20.025L15.225 18.525L16.725 15.975L18.9 16.65C19.175 16.45 19.444 16.2815 19.707 16.1445C19.97 16.0075 20.251 15.876 20.55 15.75L21 13.5H24L24.45 15.75C24.75 15.875 25.0315 16.0125 25.2945 16.1625C25.5575 16.3125 25.826 16.5 26.1 16.725L28.275 15.975L29.775 18.6L28.05 20.1C28.1 20.4 28.125 20.7125 28.125 21.0375C28.125 21.3625 28.1 21.675 28.05 21.975L29.775 23.475L28.275 26.025L26.1 25.35C25.825 25.55 25.5565 25.719 25.2945 25.857C25.0325 25.995 24.751 26.126 24.45 26.25L24 28.5H21ZM22.5 24C23.325 24 24.0315 23.706 24.6195 23.118C25.2075 22.53 25.501 21.824 25.5 21C25.5 20.175 25.206 19.4685 24.618 18.8805C24.03 18.2925 23.324 17.999 22.5 18C21.675 18 20.9685 18.294 20.3805 18.882C19.7925 19.47 19.499 20.176 19.5 21C19.5 21.825 19.794 22.5315 20.382 23.1195C20.97 23.7075 21.676 24.001 22.5 24Z" fill="url(#paint0_linear_670_433)"/>\n' +
	'<defs>\n' +
	'<linearGradient id="paint0_linear_670_433" x1="15.5194" y1="-10.337" x2="15" y2="46" gradientUnits="userSpaceOnUse">\n' +
	'<stop offset="0.446932" stop-color="#FFD600"/>\n' +
	'<stop offset="1" stop-color="#474747"/>\n' +
	'</linearGradient>\n' +
	'</defs>\n' +
	'</svg>\n';

const notificationIconVector =
	'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
	'<path d="M15 24.75C15.625 24.75 16.1565 24.531 16.5945 24.093C17.0325 23.655 17.251 23.124 17.25 22.5H12.75C12.75 23.125 12.969 23.6565 13.407 24.0945C13.845 24.5325 14.376 24.751 15 24.75ZM7.5 21H22.5V18H21V14.1C21 12.575 20.606 11.181 19.818 9.918C19.03 8.655 17.924 7.849 16.5 7.5V6.75C16.5 6.325 16.356 5.9685 16.068 5.6805C15.78 5.3925 15.424 5.249 15 5.25C14.575 5.25 14.2185 5.394 13.9305 5.682C13.6425 5.97 13.499 6.326 13.5 6.75V7.5C12.075 7.85 10.969 8.6565 10.182 9.9195C9.395 11.1825 9.001 12.576 9 14.1V18H7.5V21ZM15 30C12.925 30 10.975 29.606 9.15 28.818C7.325 28.03 5.7375 26.9615 4.3875 25.6125C3.0375 24.2625 1.969 22.675 1.182 20.85C0.395 19.025 0.001 17.075 0 15C0 12.925 0.394 10.975 1.182 9.15C1.97 7.325 3.0385 5.7375 4.3875 4.3875C5.7375 3.0375 7.325 1.969 9.15 1.182C10.975 0.395 12.925 0.001 15 0C17.075 0 19.025 0.394 20.85 1.182C22.675 1.97 24.2625 3.0385 25.6125 4.3875C26.9625 5.7375 28.0315 7.325 28.8195 9.15C29.6075 10.975 30.001 12.925 30 15C30 17.075 29.606 19.025 28.818 20.85C28.03 22.675 26.9615 24.2625 25.6125 25.6125C24.2625 26.9625 22.675 28.0315 20.85 28.8195C19.025 29.6075 17.075 30.001 15 30Z" fill="url(#paint0_linear_670_434)"/>\n' +
	'<defs>\n' +
	'<linearGradient id="paint0_linear_670_434" x1="15" y1="0" x2="15" y2="33.5" gradientUnits="userSpaceOnUse">\n' +
	'<stop stop-color="#309CFF"/>\n' +
	'<stop offset="1" stop-color="#1D5D99" stop-opacity="0.79"/>\n' +
	'</linearGradient>\n' +
	'</defs>\n' +
	'</svg>\n';

const otherIconVector =
	'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
	'<path d="M17.7458 17.0771L19.7875 13.5479C19.9187 13.3292 19.8604 13.0521 19.6708 12.8917L17.5125 11.2C17.5562 10.8792 17.5854 10.5438 17.5854 10.2083C17.5854 9.87292 17.5562 9.5375 17.5125 9.20208L19.6708 7.51042C19.8604 7.35 19.9187 7.07292 19.7875 6.85417L17.7458 3.325C17.6145 3.10625 17.352 3.01875 17.1187 3.10625L14.5812 4.12708C14.0562 3.71875 13.4875 3.38333 12.8604 3.12083L12.4812 0.422917C12.4567 0.30497 12.3929 0.198852 12.3001 0.121998C12.2074 0.045143 12.0912 0.00212138 11.9708 0H7.88745C7.63954 0 7.42079 0.189583 7.37704 0.4375L6.99787 3.13542C6.38537 3.39792 5.80204 3.73333 5.27704 4.14167L2.73954 3.12083C2.5062 3.03333 2.2437 3.12083 2.11245 3.33958L0.0707853 6.86875C-0.0604647 7.0875 -0.00213115 7.36458 0.187452 7.525L2.34579 9.21667C2.30204 9.5375 2.27287 9.87292 2.27287 10.2083C2.27287 10.5438 2.30204 10.8792 2.34579 11.2146L0.187452 12.9063C-0.00213115 13.0667 -0.0604647 13.3438 0.0707853 13.5625L2.11245 17.0917C2.2437 17.3104 2.5062 17.3979 2.73954 17.3104L5.27704 16.2896C5.80204 16.6979 6.37079 17.0333 6.99787 17.2958L7.37704 19.9938C7.42079 20.2271 7.63954 20.4167 7.88745 20.4167H11.9708C12.2187 20.4167 12.4375 20.2271 12.4812 19.9792L12.8604 17.2813C13.4729 17.0188 14.0562 16.6833 14.5812 16.275L17.1187 17.2958C17.352 17.3833 17.6145 17.2958 17.7458 17.0771ZM9.92912 13.125C8.32495 13.125 7.01245 11.8125 7.01245 10.2083C7.01245 8.60417 8.32495 7.29167 9.92912 7.29167C11.5333 7.29167 12.8458 8.60417 12.8458 10.2083C12.8458 11.8125 11.5333 13.125 9.92912 13.125ZM29.0479 24.3104L27.6479 23.2313C27.677 23.0271 27.7062 22.8083 27.7062 22.5896C27.7062 22.3708 27.6916 22.1521 27.6479 21.9479L29.0333 20.8687C29.15 20.7667 29.1937 20.5917 29.1062 20.4458L27.7937 18.1854C27.7208 18.0396 27.5458 17.9958 27.3854 18.0396L25.7666 18.6958C25.4312 18.4333 25.0666 18.2146 24.6583 18.0542L24.4104 16.3333C24.4046 16.2554 24.3701 16.1824 24.3135 16.1285C24.2569 16.0746 24.1823 16.0436 24.1041 16.0417H21.4937C21.3333 16.0417 21.1875 16.1583 21.1729 16.3188L20.925 18.0396C20.5312 18.2146 20.152 18.4188 19.8166 18.6813L18.1979 18.025C18.1236 17.997 18.0417 17.9964 17.967 18.0231C17.8922 18.0498 17.8293 18.1021 17.7895 18.1708L16.477 20.4313C16.4041 20.5771 16.4187 20.7521 16.55 20.8542L17.9354 21.9333C17.8752 22.359 17.8752 22.791 17.9354 23.2167L16.55 24.2958C16.4333 24.3979 16.3895 24.5729 16.477 24.7188L17.7895 26.9792C17.8625 27.125 18.0375 27.1688 18.1979 27.125L19.8166 26.4688C20.152 26.7313 20.5166 26.95 20.925 27.1104L21.1729 28.8313C21.202 28.9917 21.3333 29.1083 21.4937 29.1083H24.1041C24.2645 29.1083 24.4104 28.9917 24.425 28.8313L24.6729 27.1104C25.0666 26.9354 25.4458 26.7313 25.7666 26.4688L27.4 27.125C27.5458 27.1833 27.7208 27.125 27.8083 26.9792L29.1208 24.7188C29.2083 24.5875 29.1645 24.4125 29.0479 24.3104ZM22.7916 24.5438C22.2693 24.5436 21.7684 24.3359 21.3992 23.9664C21.03 23.5969 20.8227 23.0959 20.8229 22.5735C20.8231 22.0512 21.0307 21.5503 21.4002 21.1811C21.7697 20.8119 22.2707 20.6046 22.7931 20.6048C23.3154 20.605 23.8163 20.8127 24.1855 21.1822C24.5547 21.5516 24.762 22.0527 24.7618 22.575C24.7616 23.0973 24.554 23.5982 24.1845 23.9674C23.815 24.3366 23.314 24.5439 22.7916 24.5438Z" fill="url(#paint0_linear_670_435)"/>\n' +
	'<defs>\n' +
	'<linearGradient id="paint0_linear_670_435" x1="14.5835" y1="1.2438e-08" x2="15" y2="37.5" gradientUnits="userSpaceOnUse">\n' +
	'<stop stop-color="#AAF272"/>\n' +
	'<stop offset="1" stop-color="#638C42"/>\n' +
	'</linearGradient>\n' +
	'</defs>\n' +
	'</svg>\n';

const ProfileSettingsScreen = ({navigation}: {navigation: any}) => {
	const colorSchema = useColorScheme();
	const [notificationSwitchState, setNotificationSwitchState] = useState(false);
	const [updatesSwitchState, setUpdatesSwitchState] = useState(false);
	const [darkModeEnabledState, setDarkModeEnabledState] = useState(
		colorSchema === 'dark',
	);
	return (
		<SafeAreaView
			style={[
				GlobalStyle.globalBackgroundFlex,
				{backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'},
			]}>
			<View id={'SettingsHeader'} style={Style.settingsHeaderContainer}>
				<View style={Style.backButtonContainer}>
					<BackButton
						onPress={() => {
							navigation.navigate(Routes.DashboardScreen);
						}}
						buttonBackgroundColor={colorSchema === 'dark' ? '#FFF' : '#000'}
						backArrowColor={colorSchema === 'light' ? '#FFF' : '#000'}
					/>
				</View>
				<SettingsPageHeaderText text={'Settings'} />
			</View>

			<View id={'AccountOptions'} style={Style.accountOptionsContainer}>
				<View style={Style.subAccountOptionsContainer}>
					<SvgXml style={Style.svgStyle} xml={accountIconVector} />
					<SettingsPageHeaderText text={'Account'} />
				</View>

				<View style={Style.accountOptionsLabelContainer}>
					<OptionsHeaderText
						text={'Edit Profile'}
						color={colorSchema === 'dark' ? '#FFF' : '#000'}
						fontSize={scaleFontSize(20)}
						marginBottom={verticalScale(15)}
						onPress={() => {}}
					/>

					<OptionsHeaderText
						text={'Change Password'}
						color={colorSchema === 'dark' ? '#FFF' : '#000'}
						fontSize={scaleFontSize(20)}
						marginBottom={verticalScale(15)}
						onPress={() => {}}
					/>

					<OptionsHeaderText
						text={'Privacy'}
						color={colorSchema === 'dark' ? '#FFF' : '#000'}
						fontSize={scaleFontSize(20)}
						marginBottom={0}
						onPress={() => {}}
					/>
				</View>
			</View>

			<View
				id={'NotificationOptions'}
				style={Style.notificationOptionsContainer}>
				<View style={Style.subAccountOptionsContainer}>
					<SvgXml style={Style.svgStyle} xml={notificationIconVector} />
					<SettingsPageHeaderText text={'Notifications'} />
				</View>

				<View style={Style.accountOptionsLabelContainer}>
					<View style={Style.labelSwitchContainer}>
						<OptionsHeaderText
							text={'Allow Notification'}
							color={colorSchema === 'dark' ? '#FFF' : '#000'}
							fontSize={scaleFontSize(20)}
							marginBottom={verticalScale(15)}
							onPress={() => {}}
						/>
						<Switch
							trackColor={{false: '#2d2c2c', true: '#2d2c2c'}}
							thumbColor={notificationSwitchState ? '#309CFF' : '#454545'}
							value={notificationSwitchState}
							onValueChange={switchState => {
								setNotificationSwitchState(switchState);
							}}
						/>
					</View>

					<View style={Style.labelSwitchContainer}>
						<OptionsHeaderText
							text={'Updates'}
							color={colorSchema === 'dark' ? '#FFF' : '#000'}
							fontSize={scaleFontSize(20)}
							marginBottom={verticalScale(15)}
							onPress={() => {}}
						/>

						<Switch
							trackColor={{false: '#2d2c2c', true: '#2d2c2c'}}
							thumbColor={updatesSwitchState ? '#309CFF' : '#454545'}
							value={updatesSwitchState}
							onValueChange={switchState => {
								setUpdatesSwitchState(switchState);
							}}
						/>
					</View>
				</View>
			</View>

			<View id={'OtherOptions'} style={Style.otherOptionsContainer}>
				<View style={Style.subAccountOptionsContainer}>
					<SvgXml style={Style.svgStyle} xml={otherIconVector} />
					<SettingsPageHeaderText text={'Other'} />
				</View>

				<View style={Style.labelSwitchContainer2}>
					<OptionsHeaderText
						text={'Dark Mode'}
						color={colorSchema === 'dark' ? '#FFF' : '#000'}
						fontSize={scaleFontSize(20)}
						marginBottom={verticalScale(15)}
						onPress={() => {}}
					/>

					<Switch
						trackColor={{false: '#2d2c2c', true: '#2d2c2c'}}
						thumbColor={darkModeEnabledState ? '#309CFF' : '#454545'}
						value={darkModeEnabledState}
						onValueChange={switchState => {
							setDarkModeEnabledState(switchState);
						}}
					/>
				</View>

				<View style={Style.labelSwitchContainer2}>
					<OptionsHeaderText
						text={'Language'}
						color={colorSchema === 'dark' ? '#FFF' : '#000'}
						fontSize={scaleFontSize(20)}
						marginBottom={verticalScale(15)}
						onPress={() => {}}
					/>

					<Text
						style={[
							Style.languageText,
							{color: colorSchema === 'dark' ? '#FFF' : '#000'},
						]}>
						English
					</Text>
				</View>

				<View style={Style.labelSwitchContainer2}>
					<OptionsHeaderText
						text={'Region'}
						color={colorSchema === 'dark' ? '#FFF' : '#000'}
						fontSize={scaleFontSize(20)}
						marginBottom={verticalScale(15)}
						onPress={() => {}}
					/>

					<Text
						style={[
							Style.languageText,
							{color: colorSchema === 'dark' ? '#FFF' : '#000'},
						]}>
						India
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ProfileSettingsScreen;
