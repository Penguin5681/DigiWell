import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    shadow: {
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 1,
        shadowRadius: 5
    },
    button: {
        flex: 1,
        justifyContent: "center"
    },
    bottomBar: {},
    btnCircleUp: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#61DA5E",
        bottom: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1
    },
    imgCircle: {
        width: 30,
        height: 30,
        tintColor: "gray"
    },
    tabbarItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        width: 30,
        height: 30
    },
});

export default Style;
