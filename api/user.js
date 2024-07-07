import auth from '@react-native-firebase/auth';

export const createUser = async (email, password) => {
  try {
    const user = await auth().createUserWithEmailAndPassword(email, password);
    console.log(user);
    return {user,displayName:user.user.displayName,};
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return { error: "The email is already in use." };
    } else if (error.code === "auth/invalid-email") {
      return { error: "Invalid email address." };
    }
    return { error: "Something went wrong! Try again." };
  }

};

export const loginUser = async (email, password) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    const token = await response.user.getIdToken();
    return {
      status: true,
      data: {
        displayName:response.user.displayName,
        email: response.user.email,
        token,
      },
    };
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      return { status: false, error: 'Please enter correct email or password' };
    }
    else if (error.code === "auth/user-not-found"){
      return { status: false, error: 'The email does not exist' };
    }
    else if (error.code==='auth/too-many-requests'){
      return { status: false, error: 'Try again later' };
    }
    console.log();
    return {status:false,error:error.message }
  }
};

