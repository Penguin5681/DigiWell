import {Image, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Style from "./Style";

const BackButton = () => {
    return (
        <View style={Style.backButtonBackground}>
            <FontAwesomeIcon style={Style.icon} icon={faArrowLeft} />
        </View>
    );
}

export default BackButton;
