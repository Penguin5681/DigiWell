import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  useColorScheme,
  View,
} from 'react-native';
import BackButton from '../../Components/BackButton/BackButton.tsx';
import React, {SetStateAction, useState} from 'react';
import Style from './Style.ts';
import HeaderText from '../../Components/HeaderText/HeaderText.tsx';
import EditText from '../../Components/EditText/EditText.tsx';
import GoogleButton from '../../Components/GoogleButton/GoogleButton.tsx';
import LoginMethodText from '../../Components/LoginMethodText/LoginMethodText.tsx';
import {Routes} from '../../Navigation/Routes.ts';
import {loginUser} from '../../api/user';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import GlobalStyle from '../../Assets/GlobalStyles/GlobalStyle';
import KeyboardCoveringContainer from '../../Components/KeboardCoveringContainer/KeyboardCoveringContainer';
import AwesomeButton from 'react-native-really-awesome-button';
import {horizontalScale} from '../../Assets/ScalingUtility/ScalingUtility';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const colorSchema = useColorScheme();
  const [error, setError] = useState('');
  const [defaultEmailValue, setDefaultEmailValue] = useState('');
  const [defaultPasswordValue, setDefaultPasswordValue] = useState('');

  const fireabseAuthProvider = 'firebase.com';
  const googleAuthProvider = 'google.com';
  const facebookAuthProvider = 'facebook.com';

  const signInWithGoogle = async () => {
    try {
      GoogleSignin.configure({
        offlineAccess: false,
        webClientId:
          '411285290789-h7085ag0gmrfickl1h80fkpcv97vgttu.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredentials);
      return userInfo;
    } catch (error) {
      console.log('=> Google Sign In', error);
      return null;
    }
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.globalBackgroundFlex,
        {backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'},
      ]}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        translucent={true}
      />

      <ImageBackground
        source={require('../../Assets/Images/GlobalAppAssets/img.png')}
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
              navigation.navigate(Routes.WelcomeScreen);
            }}
            buttonBackgroundColor={colorSchema === 'dark' ? '#000' : '#FFF'}
            backArrowColor={colorSchema === 'dark' ? '#FFF' : '#000'}
          />
        </View>

        <View id={'header-text-view'} style={Style.headerTextView}>
          <HeaderText
            text={'Welcome back! Glad to see you, Again!'}
            textColor={'#FFF'}
          />
        </View>
      </ImageBackground>
      <KeyboardCoveringContainer style={undefined}>
        <View
          style={[
            Style.inputFieldContainer,
            {backgroundColor: colorSchema === 'dark' ? '#000' : '#FFF'},
          ]}>
          <View style={Style.emailEditText}>
            <EditText
              text={'Enter your email'}
              textColor={colorSchema === 'light' ? '#000' : '#FFF'}
              placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
              backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
              inputType={'email'}
              value={defaultEmailValue}
              onChangeText={(value: SetStateAction<string>) => {
                console.log(value);
                setDefaultEmailValue(value);
              }}
            />
          </View>

          <View style={Style.passwordEditText}>
            <EditText
              text={'Enter your password'}
              textColor={colorSchema === 'light' ? '#000' : '#FFF'}
              placeHolderTextColor={colorSchema === 'light' ? '#000' : '#FFF'}
              inputType={'password'}
              value={defaultPasswordValue}
              onChangeText={(value: SetStateAction<string>) => {
                console.log(value);
                setDefaultPasswordValue(value);
              }}
              backgroundColor={colorSchema === 'light' ? '#E5E4E2' : '#303030'}
            />
          </View>

          <Text
            style={Style.forgetPasswordText}
            onPress={() => {
              console.log('LoginScreen -> ForgetPasswordPage');
              navigation.navigate(Routes.ForgetPasswordPage);
            }}>
            Forgot Password?
          </Text>
          {error.length > 0 && <Text style={Style.error}>{error}</Text>}
          <View style={Style.loginButtonContainer}>
            <AwesomeButton
              backgroundColor={colorSchema === 'dark' ? '#1E232C' : '#E5E4E2'}
              raiseLevel={0}
              progress={true}
              stretch={true}
              borderRadius={8}
              activeOpacity={0.5}
              onPress={async next => {
                if (
                  defaultPasswordValue.length === 0 ||
                  defaultEmailValue.length === 0
                ) {
                  ToastAndroid.show(
                    "Fields's cannot be empty",
                    ToastAndroid.SHORT,
                  );
                  if (next) {
                    next();
                  }
                } else {
                  let user = await loginUser(
                    defaultEmailValue,
                    defaultPasswordValue,
                  );
                  if (!user.status) {
                    setError(user.error);
                    if (next) {
                      next();
                    }
                  } else {
                    setError('');
                    navigation.navigate(Routes.DashboardScreen, {
                      authProvider: 'firebase.com',
                    });
                  }
                }
              }}>
              <Text
                style={{
                  color: colorSchema === 'dark' ? '#FFF' : '#000',
                  fontWeight: '500',
                }}>
                Login
              </Text>
            </AwesomeButton>

            <View style={Style.loginMethodTextContainer}>
              <LoginMethodText text={'Or Login with'} />
              <View style={Style.signInButtonContainer}>
                <GoogleButton
                  onPress={() =>
                    signInWithGoogle().then(data => {
                      navigation.navigate(Routes.DashboardScreen, {
                        authProvider: 'google.com',
                      });
                      console.log('UserData =>', data);
                    })
                  }
                  rightMargin={horizontalScale(12)}
                  buttonBackgroundColor={
                    colorSchema === 'dark' ? '#FFF' : '#E5E4E2'
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardCoveringContainer>
    </SafeAreaView>
  );
};

export default LoginScreen;
