import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Button, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import {useRouter} from "expo-router";
import {storage} from "../services/storage";
import {useEffect, useState} from "react";

export default function Page() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState("unknown");

    useEffect(() => {
        storage.loadProfile().then((profile) => {
            if (!profile) setIsLoggedIn("false");
            else router.push("/main");
        });
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                {
                    isLoggedIn === "unknown" &&
                    <ActivityIndicator/>
                }
                {
                    isLoggedIn === "false" &&
                    <>
                        <View style={styles.titleContainer}>
                            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>Welcome to Figure.</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <View style={{gap: 30, width: 170}}>
                                <Button title={"Sign up"}/>
                                <Button style={styles.button} title={"Login"} onPress={() => router.push("/login")}/>
                            </View>
                        </View>
                    </>
                }
            </SafeAreaView>
        </SafeAreaProvider>
    );
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
    buttonsContainer: {
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