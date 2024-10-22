import React, {useCallback, useEffect, useState} from 'react';
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
} from '../../../Utility/ScalingUtility/ScalingUtility';
import {SvgXml} from 'react-native-svg';
import {VectorIcons} from '../../../Assets/Images/VectorIcons.ts';
import LinearGradient from 'react-native-linear-gradient';
import {Routes} from '../../../Navigation/Routes.ts';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {generateRandomUsername} from '../../../Assets/RandomUsernameGenerator/RandomUsernameGenerator';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAuthProvider} from '../../../Context/AuthProviderContext/AuthProviderContext.tsx';

const ProfilePreviewScreen = ({navigation}: {navigation: any}) => {
	const colorSchema = useColorScheme();
	const [defaultEmail, setDefaultEmail] = useState('');
	const [defaultImageUrl, setDefaultImageUrl] = useState('');
	const [defaultDisplayName, setDefaultDisplayName] = useState('');
	const [backPressedTime, setBackPressedTime] = useState(0);
	const [accountCreationDate, setAccountCreationDate] = useState('');
	const [uid, setUid] = useState('');
	const {authProvider} = useAuthProvider();
	const [appUsageData, setAppUsageData] = useState('');
	const defaultProfileImagePath = colorSchema === 'dark' ? 'default_profile_image/avatar_icon_white.png' : 'default_profile_image/avatar_icon_black.png';
	const dailyScreenTime = '3h 28m';
	const weeklyScreenTime = '13h 42m';
	const dailyMostUsedApp = 'Brave';
	const weeklyMostUsedApp = 'Chrome';
	const darkModeGradientColorList = ['#0c0c0c', '#4C4E52', '#9FA2A8'];
	const lightModeGradientColorList = ['#c6c6d2', '#d0d0e8', '#97a1a3'];

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

	const downloadPlaceholderImage = async () => {
		try {
			await storage()
				.ref(defaultProfileImagePath)
				.getDownloadURL()
				.then(imageUri => {
					setDefaultImageUrl(imageUri)
				})
				.catch((error: Error) => {
					// TODO: Do something
				})
		} catch (error) {

		}
	}

	const fetchProfileImageUrl = async (imagePath: string) => {
		try {
			await storage()
				.ref(imagePath)
				.getDownloadURL()
				.then(imageUri => {
					if (imageUri !== null) {
						setDefaultImageUrl(imageUri);
					}
				})
				.catch((error: Error) => {
					showMessage({
						message: error.message,
						type: 'danger',
						statusBarHeight: StatusBar.currentHeight,
					});
					downloadPlaceholderImage()
						.then(() => {})
						.catch(() => {});
				});
		} catch (error) {
			console.error('Firebase Storage Error: ' + error);
			return null;
		}
	};

	const uploadToCloud = async () => {
		await firestore()
			.collection('backups')
			.doc(firebase.auth().currentUser?.uid.toString())
			.set({

			})
			.then(() => {

			})
			.catch(() => {

			})
	};
	const fetchGoogleProfile = async () => {
		setDefaultEmail(firebase.auth().currentUser?.email || 'emailNotFound');
		setDefaultDisplayName(
			firebase.auth().currentUser?.displayName || generateRandomUsername(),
		);
		console.log(GoogleSignin.getCurrentUser()?.user.photo?.toString());
		setDefaultImageUrl(
			firebase.auth().currentUser?.photoURL ||
			(colorSchema === 'light'
				? require('../../../Assets/Images/avatar_icon_black.png')
				: require('../../../Assets/Images/avatar_icon_white.png')),
		);
	};

	const fetchFirebaseProfile = async () => {
		await firestore()
			.collection('users')
			.doc(firebase.auth().currentUser?.email?.toString())
			.get()
			.then(async (snapshot) => {
				if (snapshot.exists) {
					setDefaultDisplayName(snapshot.get('username'));
					setAccountCreationDate(snapshot.get('accountCreationTime'));
				}
			})
			.catch((error: Error) => {
				setDefaultDisplayName(generateRandomUsername());
				console.error("Error fetching display name: " + error);
			});

		try {
			await firestore()
				.collection('users')
				.doc(firebase.auth().currentUser?.email?.toString())
				.get()
				.then((snapshot) => {
					if (snapshot.exists) {
						setUid(snapshot.get('uid'));
					} else {
						console.error("Error Occurred: " + "uid not found");
					}
				})

			console.log("ProfilePreviewScreen: " + uid);

			await fetchProfileImageUrl("user_profile_images/" + uid + ".jpg");
		} catch (error) {
			console.error("Error Fetching the Image URL");
		}
	};

	useEffect(() => {
		if (firebase.auth().currentUser?.providerId === 'firebase') {
			fetchFirebaseProfile()
				.then(() => {})
				.catch(() => {});
		} else {
			fetchGoogleProfile()
				.then(() => {})
				.catch(() => {});
		}
	}, []);

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
						<TouchableOpacity
							style={Style.homeOption}
							onPress={() => {
								navigation.dispatch(
									CommonActions.reset({
										index: 0,
										routes: [{name: Routes.DashboardScreen}]
									})
								)
							}}
						>
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
						</TouchableOpacity>

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
							onPress={async () => {

							}}>
							<SvgXml
								xml={
									colorSchema === 'dark'
										? VectorIcons.uploadIconWhite
										: VectorIcons.uploadIconBlack
								}
							/>
							<Text
								style={[
									Style.optionLabel,
									{color: colorSchema === 'dark' ? '#FFF' : '#000'},
								]}>
								Upload to Cloud
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
														navigation.replace(Routes.WelcomeScreen);
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
