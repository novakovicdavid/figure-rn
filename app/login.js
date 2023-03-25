import {View, TextInput, Button, Text, StyleSheet} from "react-native";
import {useRef} from "react";
import {backend} from "../services/backend";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import {storage} from "../services/storage";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const router = useRouter();
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.titleContainer}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>Welcome to Figure.</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput onChangeText={text => email.current = text}/>
                    <TextInput onChangeText={text => password.current = text}/>
                    <Button title={"Login"} onPress={() => {
                        backend.login(email.current, password.current)
                            .then((result) => {
                                if (result.profile) {
                                    storage.saveProfile(result.profile);
                                    router.push("/main");
                                }
                            })
                    }}/>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40
    },
    formContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        maxWidth: 90,
        width: 90
        // fontSize: 30
    }
});