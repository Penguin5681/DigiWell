// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// export const _signInWithGoogle = async () => {
//     try {
//         GoogleSignin.configure({
//             offlineAccess: false,
//             webClientId: '411285290789-h7085ag0gmrfickl1h80fkpcv97vgttu.apps.googleusercontent.com',
//             scopes: ['profile', 'email'],
//         });
//         await GoogleSignin.hasPlayServices();
//         const userInfo = await GoogleSignin.signIn();
//
//         const {idToken} = await GoogleSignin.signIn();
//         const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
//         auth().signInWithCredential(googleCredentials);
//         return userInfo;
//     } catch (error) {
//         console.log('=> Google Sign In', error,error.code);
//         return null;
//     }
// };




