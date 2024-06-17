import PropTypes from "prop-types";
import {TextInput} from "react-native";
import Style from "./Style";

interface EditTextProps {
    text: string,
    inputType: string,
    value: string,
    onChangeText: any,
}

const inputTypes = ["text", "password", "numeric", "email"];

const getKeyboardType = (inputType: string) => {
    switch (inputType) {
        case inputTypes[0]:
            return "default";
        case inputTypes[1]:
            return "default";
        case inputTypes[2]:
            return "number-pad";
        case inputTypes[3]:
            return "email-address";
        default:
            console.log("Default case triggered. Check input types");
            return "default";
    }
};

const EditText = (props: EditTextProps) => {
    return (
        <TextInput
            style={Style.inputStyle}
            placeholder={props.text}
            placeholderTextColor={"#DBDBDB"}
            value={props.value}
            keyboardType={getKeyboardType(props.inputType)}
            secureTextEntry={props.inputType === inputTypes[1]}
            onChangeText={props.onChangeText}
        />
    )
};

EditText.propTypes = {
    text: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.any.isRequired,
}

export default EditText;
