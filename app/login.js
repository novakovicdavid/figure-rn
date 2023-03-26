import {View, Button, Text, StyleSheet} from "react-native";
import {backend} from "../services/backend";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import {storage} from "../services/storage";
import {useForm} from "react-hook-form";

export default function Login() {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = data => {
        backend.login(data.email, data.password)
            .then((result) => {
                if (result.profile) {
                    storage.saveProfile(result.profile);
                    router.push("/main");
                }
            })
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.titleContainer}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>Login to Figure.</Text>
                </View>
                <form onSubmit={handleSubmit(onSubmit)} style={styles.formContainer}>
                    <input placeholder={"Email"} {...register("email", {required: true})}
                           style={styles.formInput}/>
                    {errors.email && <span style={styles.error}>This field is required</span>}

                    <input placeholder={"Password"} type={"password"} {...register("password", {required: true})}
                           style={styles.formInput}/>
                    {errors.password && <span style={styles.error}>This field is required</span>}

                    <View style={styles.submitButton}>
                        <Button title={"Login"} onPress={handleSubmit(onSubmit)}/>
                    </View>
                </form>
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
        display: "flex",
        flexDirection: "column",
        maxWidth: "30em",
        marginLeft: "5em",
        marginRight: "5em"
    },
    button: {
        maxWidth: 90,
        width: 90
        // fontSize: 30
    },
    formInput: {
        height: 30,
        marginTop: 10,
        borderStyle: "solid",
        borderColor: "#2196f3",
        borderWidth: 1,
        borderRadius: 3
    },
    submitButton: {
        marginTop: 20
    },
    error: {
        fontSize: 13,
        fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
        marginTop: 5,
        marginBottom: 5,
        color: "red"
    }
});