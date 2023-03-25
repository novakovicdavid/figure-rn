import {Button, Modal, StyleSheet, View, Text, Pressable, TouchableOpacity} from "react-native";
import {useState} from "react";
import {backend} from "../services/backend";
import {storage} from "../services/storage";
import {useRouter} from "expo-router";

export default function Settings() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <View style={{flex: 1}}>
                <View style={styles.logout_button}>
                    <Button title={"Logout"} onPress={() => {
                        setShowModal(true);
                    }
                    }/>
                </View>
            </View>
            <LogoutModal showModal={showModal} setShowModal={setShowModal}/>
        </>

    )
}

function LogoutModal(props) {
    const {showModal, setShowModal} = props;
    const router = useRouter();
    return (
        <View>
            <Modal visible={showModal} onRequestClose={() => setShowModal(false)}
                   transparent={true} animationType={"fade"}>
                <Pressable onPress={(event) => event.target === event.currentTarget && setShowModal(false)}
                           style={styles.modal_container}>
                    <View style={styles.modal_content}>
                        <View style={styles.modal_message_container}>
                            <Text style={styles.modal_message_content}>Are you sure you want to logout?</Text>
                        </View>
                        <View style={styles.modal_button_container}>
                            <TouchableOpacity onPress={() => setShowModal(false)} style={{...styles.modal_button, ...styles.modal_cancel_button}}><Text>Cancel</Text></TouchableOpacity>
                            <TouchableOpacity onPress={async () => {
                                await backend.invalidateSession();
                                await storage.deleteKey("profile");
                                router.replace("/")
                            }
                            } style={{...styles.modal_button, ...styles.modal_confirm_button}}><Text>Logout</Text></TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    logout_button: {
        marginTop: "auto",
        paddingHorizontal: 50,
        marginBottom: 50
    },
    modal_container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modal_content: {
        width: "70%",
        maxHeight: "20%",
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#c6c9ce"
    },
    modal_message_container: {
        flex: 2,
        justifyContent: "center"
    },
    modal_message_content: {
        fontSize: 20
    },
    modal_button_container: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    modal_button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modal_cancel_button: {
        borderTopWidth: 1,
        borderColor: "#c6c9ce"
    },
    modal_confirm_button: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: "#c6c9ce"
    },
});