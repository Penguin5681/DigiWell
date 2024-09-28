import React, {useCallback, useState} from 'react';
import Style from './Style.ts';
import {
	Alert,
	BackHandler,
	Image,
	SafeAreaView,
	StatusBar,
	Text,
	ToastAndroid,
	TouchableOpacity,
	useColorScheme,
	View,
} from 'react-native';
import GlobalStyle from '../../../Assets/GlobalStyles/GlobalStyle';
import OptionsHeaderText from '../../../Components/OptionsHeaderText/OptionsHeaderText.tsx';
import {
	scaleFontSize,
	verticalScale,
} from '../../../Assets/ScalingUtility/ScalingUtility';
import {SvgXml} from 'react-native-svg';
import {VectorIcons} from '../../../Assets/Images/VectorIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Routes} from '../../../Navigation/Routes.ts';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {generateRandomUsername} from '../../../Assets/RandomUsernameGenerator/RandomUsernameGenerator';
import {useFocusEffect} from '@react-navigation/native';

const ProfilePreviewScreen = ({navigation}: {navigation: any}) => {
	const colorSchema = useColorScheme();
	const [defaultEmail, setDefaultEmail] = useState('');
	const [defaultImageUrl, setDefaultImageUrl] = useState('');
	const [defaultDisplayName, setDefaultDisplayName] = useState('');
	const [backPressedTime, setBackPressedTime] = useState(0);
	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				const BACK_BUTTON_DELAY = 2000;
				const currentTime = Date.now();

				if (
					backPressedTime &&
					currentTime - backPressedTime < BACK_BUTTON_DELAY
				) {
					BackHandler.exitApp();
				} else {
					ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
					setBackPressedTime(currentTime);
				}
				return true;
			};

			BackHandler.addEventListener('hardwareBackPress', onBackPress);
			return () => {
				BackHandler.removeEventListener('hardwareBackPress', onBackPress);
			};
		}, [backPressedTime]),
	);

	// TODO: Will write the core backend soon, (saturday is the day)
	const dailyScreenTime = '3h 28m';
	const weeklyScreenTime = '13h 42m';
	const dailyMostUsedApp = 'Brave';
	const weeklyMostUsedApp = 'Chrome';
	const accountCreationDate = '09/07/2024';
	// TODO: YEAH BAYBEE

	const darkModeGradientColorList = ['#0c0c0c', '#4C4E52', '#9FA2A8'];
	const lightModeGradientColorList = ['#c6c6d2', '#d0d0e8', '#97a1a3'];
	const fetchProfileImageUrl = async (imagePath: string) => {
		try {
			return await storage().ref(imagePath).getDownloadURL();
		} catch (error) {
			console.error('Firebase Storage Error: ' + error);
			return null;
		}
	};
	const fetchGoogleProfile = async () => {
		setDefaultEmail(firebase.auth().currentUser?.email || 'emailNotFound');
		setDefaultDisplayName(
			firebase.auth().currentUser?.displayName || generateRandomUsername(),
		);
		setDefaultImageUrl(
			firebase.auth().currentUser?.photoURL ||
			(colorSchema === 'light'
				? require('../../../Assets/Images/avatar_icon_black.png')
				: require('../../../Assets/Images/avatar_icon_white.png')),
		);
	};
	const fetchFirebaseProfile = async () => {
		const email =
			firebase.auth().currentUser?.email?.replace('@', '_').replace('.', '_') ||
			'';
		setDefaultEmail(firebase.auth().currentUser?.email || 'emailNotFound');
		const displayName = firestore()
			.collection('users')
			.doc(email)
			.get()
			.then(snapshot => {
				if (snapshot.exists) {
					const userNameSnapshot = snapshot.get('userName');
					if (userNameSnapshot) {
						const userName = userNameSnapshot.toString();
						console.log('USERNAME: ' + userName);
						setDefaultDisplayName(userName);
					} else {
						console.log('USERNAME IS POSSIBLY NULL');
						setDefaultDisplayName(generateRandomUsername());
					}
				}
			});

		if (displayName !== null) {
			console.log('displayName: ' + displayName);
		} else {
			console.error('You fucked up something!');
		}

		const imagePath = 'user_profile_images/' + email;
		const defaultProfileImagePath =
			colorSchema === 'light'
				? 'default_profile_images/' + 'avatar_icon_black.png'
				: 'default_profile_images/' + 'avatar_icon_white';
		const url = await fetchProfileImageUrl(imagePath);
		if (url !== null) {
			setDefaultImageUrl(url);
			console.log('URL FETCH COMPLETE RAHHHHH!: ' + url);
		} else {
			// TODO: Test this code later on
			const defaultProfileImageUrl = fetchProfileImageUrl(
				defaultProfileImagePath,
			);
			console.error('No Image found at this location! :(');
			console.log('Loaded the default image: ' + defaultProfileImageUrl);
		}
	};

	return (
		<SafeAreaView
			style={[
				GlobalStyle.globalBackgroundFlex,
				{backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'},
				{marginTop: StatusBar.currentHeight},
			]}>
			<StatusBar
				translucent={true}
				backgroundColor={colorSchema === 'dark' ? '#000' : '#FFF'}
				barStyle={colorSchema === 'light' ? 'dark-content' : 'light-content'}
			/>
			<View style={Style.userDetailContainer}>
				<Image
					style={[
						Style.userImage,
						{borderColor: colorSchema === 'dark' ? '#FFF' : '#000'},
					]}
					source={{uri: defaultImageUrl}}
				/>
				<View style={[Style.userLabelContainer, {alignItems: 'baseline'}]}>
					<View style={{width: 'auto'}}>
						<OptionsHeaderText
							text={defaultDisplayName}
							color={'#309CFF'}
							fontSize={scaleFontSize(25)}
							marginBottom={0}
							onPress={() => null}
						/>
					</View>
					<OptionsHeaderText
						text={'Surat'}
						color={colorSchema === 'dark' ? '#FFF' : '#000'}
						fontSize={scaleFontSize(19)}
						marginBottom={0}
						onPress={() => null}
					/>
					<OptionsHeaderText
						text={'Since 2024'}
						color={colorSchema === 'dark' ? '#FFF' : '#000'}
						fontSize={scaleFontSize(19)}
						marginBottom={0}
						onPress={() => null}
					/>

					<TouchableOpacity
						style={[
							Style.editProfileButton,
							{backgroundColor: colorSchema === 'dark' ? '#FFF' : '#E5E4E2'},
						]}
						onPress={() => {
							navigation.navigate(Routes.EditProfileScreen);
						}}>
						<Text style={Style.buttonContent}>Edit Profile</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View
				style={{
					flex: 1,
					justifyContent: 'space-around',
					top: 140,
					left: 0,
					right: 0,
					position: 'absolute',
					bottom: 75,
				}}>
				<View style={[Style.statsContainer]}>
					<LinearGradient
						style={Style.usageStatsGradient}
						start={{x: 0, y: 0}}
						end={{x: 0.2, y: 4}}
						colors={
							colorSchema === 'dark'
								? darkModeGradientColorList
								: lightModeGradientColorList
						}>
						<View style={Style.dailyStats}>
							<OptionsHeaderText
								text={'Screen Usage'}
								color={'#119b9b'}
								fontSize={scaleFontSize(30)}
								marginBottom={verticalScale(10)}
								onPress={() => null}
							/>

							<OptionsHeaderText
								text={`Today's Screen Time: ${dailyScreenTime}`}
								color={colorSchema === 'light' ? '#000' : '#FFF'}
								fontSize={scaleFontSize(14)}
								marginBottom={0}
								onPress={() => {}}
							/>

							<OptionsHeaderText
								text={`Today's Most Used App: ${dailyMostUsedApp}`}
								color={colorSchema === 'light' ? '#000' : '#FFF'}
								fontSize={scaleFontSize(14)}
								marginBottom={verticalScale(10)}
								onPress={() => {}}
							/>
						</View>

						<View style={Style.weeklyStats}>
							<OptionsHeaderText
								text={`Week's Screen Time: ${weeklyScreenTime}`}
								color={colorSchema === 'light' ? '#000' : '#FFF'}
								fontSize={scaleFontSize(14)}
								marginBottom={0}
								onPress={() => {}}
							/>

							<OptionsHeaderText
								text={`Week's Most Used App: ${weeklyMostUsedApp}`}
								color={colorSchema === 'light' ? '#000' : '#FFF'}
								fontSize={scaleFontSize(14)}
								marginBottom={10}
								onPress={() => {}}
							/>
						</View>
					</LinearGradient>
				</View>

				<View style={[Style.accountStatusContainer]}>
					<LinearGradient
						style={Style.usageStatsGradient}
						start={{x: 0, y: 0}}
						end={{x: 0.2, y: 4}}
						colors={
							colorSchema === 'dark'
								? darkModeGradientColorList
								: lightModeGradientColorList
						}>
						<OptionsHeaderText
							text={'Account Info'}
							color={'#119b9b'}
							fontSize={scaleFontSize(30)}
							marginBottom={verticalScale(10)}
							onPress={() => null}
						/>

						<OptionsHeaderText
							text={`Account Created On: ${accountCreationDate}`}
							color={colorSchema === 'light' ? '#000' : '#FFF'}
							fontSize={scaleFontSize(14)}
							marginBottom={10}
							onPress={() => {}}
						/>
					</LinearGradient>
				</View>

				<View style={[Style.profileOptionContainer]}>
					<LinearGradient
						style={Style.profileOptionGradient}
						start={{x: 0, y: 0}}
						end={{x: 0.2, y: 4}}
						colors={
							colorSchema === 'dark'
								? darkModeGradientColorList
								: lightModeGradientColorList
						}>
						<View style={Style.homeOption}>
							<SvgXml xml={VectorIcons.homeIconVector} />
							<Text
								style={[
									Style.optionLabel,
									{color: colorSchema === 'dark' ? '#FFF' : '#000'},
								]}>
								Go to Dashboard
							</Text>
							<SvgXml
								xml={
									colorSchema === 'dark'
										? VectorIcons.arrowRightVectorWhite
										: VectorIcons.arrowRightVectorBlack
								}
							/>
						</View>

						<View style={Style.settingsOption}>
							<SvgXml xml={VectorIcons.settingsVector} />
							<Text
								style={[
									Style.optionLabel,
									{color: colorSchema === 'dark' ? '#FFF' : '#000'},
								]}>
								Settings
							</Text>
							<SvgXml
								xml={
									colorSchema === 'dark'
										? VectorIcons.arrowRightVectorWhite
										: VectorIcons.arrowRightVectorBlack
								}
							/>
						</View>

						<TouchableOpacity
							style={Style.shareOption}
							onPress={async () => {}}>
							<SvgXml
								xml={
									colorSchema === 'dark'
										? VectorIcons.shareIconWhite
										: VectorIcons.shareIconBlack
								}
							/>
							<Text
								style={[
									Style.optionLabel,
									{color: colorSchema === 'dark' ? '#FFF' : '#000'},
								]}>
								Tell your friends
							</Text>
							<SvgXml
								xml={
									colorSchema === 'dark'
										? VectorIcons.arrowRightVectorWhite
										: VectorIcons.arrowRightVectorBlack
								}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={Style.deleteOption}
							onPress={() => {
								Alert.alert(
									'Are you sure?',
									'Your Account will be deleted permanently',
									[
										{
											text: 'Cancel',
											onPress: () => {
												console.log('Dismiss');
											},
											style: 'cancel',
										},
										{
											text: 'Confirm Delete',
											onPress: () => {
												firebase
													.auth()
													.currentUser?.delete()
													.then(() => {
														navigation.navigate(Routes.WelcomeScreen);
													});
											},
											style: 'cancel',
										},
									],
								);
							}}>
							<SvgXml
								xml={
									colorSchema === 'dark'
										? VectorIcons.deleteIconWhiteVector
										: VectorIcons.deleteIconBlackVector
								}
							/>
							<Text
								style={[
									Style.optionLabel,
									{color: colorSchema === 'dark' ? '#FFF' : '#000'},
								]}>
								Delete Account
							</Text>
							<SvgXml
								xml={
									colorSchema === 'dark'
										? VectorIcons.arrowRightVectorWhite
										: VectorIcons.arrowRightVectorBlack
								}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								firebase
									.auth()
									.signOut()
									.then(() => {
										console.log('Sign out complete');
										navigation.replace(Routes.WelcomeScreen);
									})
									.catch(reason => {
										console.log(reason);
									});
							}}
							style={[Style.logoutOption]}>
							<SvgXml xml={VectorIcons.logOutVector} />
							<Text
								style={[
									Style.optionLabel,
									{color: colorSchema === 'dark' ? '#FFF' : '#000'},
								]}>
								Logout
							</Text>
							<SvgXml
								xml={
									colorSchema === 'dark'
										? VectorIcons.arrowRightVectorWhite
										: VectorIcons.arrowRightVectorBlack
								}
							/>
						</TouchableOpacity>
					</LinearGradient>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ProfilePreviewScreen;