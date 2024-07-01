import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Styles from "./Style";
import ProfileContainer from "../../Components/ProfileContainer/ProfileContainer.tsx";
import EditText from "../../Components/EditText/EditText.tsx";
import { Dropdown, SelectCountry } from "react-native-element-dropdown";

const EditProfileScreen = () => {
  const [defaultNameValue, setDefaultNameValue] = useState("");
  const [defaultEmailValue, setDefaultEmailValue] = useState("");
  const [defaultPasswordValue, setDefaultPasswordValue] = useState("");
  const [value, setValue] = useState(null);

  const [country, setCountry] = useState('1');
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" }
  ];


  return (
    <SafeAreaView>
      <View style={Styles.background}>
        <Text style={Styles.editProfileHeader}>Edit profile</Text>
        <View style={{ marginTop: -25 }}>
          <ProfileContainer profilePhoto={require("../../Assets/Images/Ellipse.png")} imageDimensions={170}
                            allign={"center"} />
        </View>
        <View style={{ marginRight: 40, marginLeft: 40, marginTop: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={Styles.editProfileNames}>Name</Text>
            <EditText text={"Enter Name"} inputType={"text"} value={defaultNameValue} onChangeText={(value: string) => {
              console.log(value);
              setDefaultNameValue(value);
            }
            } />
          </View>
          <View>
            <View style={{ marginBottom: 10 }}>
              <Text style={Styles.editProfileNames}>Email</Text>
              <EditText text={"Enter Email"} inputType={"email"} value={defaultEmailValue}
                        onChangeText={(value: string) => {
                          console.log(value);
                          setDefaultEmailValue(value);
                        }
                        } />
            </View>
          </View>
          <View>
            <View style={{ marginBottom: 20 }}>
              <Text style={Styles.editProfileNames}>Password</Text>
              <EditText text={"Enter Password"} inputType={"password"} value={defaultPasswordValue}
                        onChangeText={(value: string) => {
                          console.log(value);
                          setDefaultPasswordValue(value);
                        }
                        } />
            </View>
          </View>
          <View>

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
