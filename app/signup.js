import {View, Button, Text, StyleSheet, TextInput, ScrollView} from "react-native";
import {backend} from "../services/backend";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import {storage} from "../services/storage";
import {Controller, useForm} from "react-hook-form";

export default function Signup() {
    const router = useRouter();
    const {control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: '',
            password: '',
            username: ''
        }
    });

    const onSubmit = data => {
        backend.signup(data.email, data.password, data.username)
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
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.titleContainer}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>Login to Figure.</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                                <>
                                    <Text style={styles.formLabel}>Email:</Text>
                                    <TextInput
                                        style={styles.formInput}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={"john@doe.com"}
                                    />
                                </>
                            )}
                            name="email"
                        />
                        {errors.email && <Text style={styles.error}>Please enter your email.</Text>}

                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                                <>
                                    <Text style={styles.formLabel}>Password:</Text>
                                    <TextInput
                                        style={styles.formInput}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={"Password"}
                                        secureTextEntry={true}
                                    />
                                </>
                            )}
                            name="password"
                        />
                        {errors.password && <Text style={styles.error}>Please enter a password.</Text>}
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                                <>
                                    <Text style={styles.formLabel}>Username:</Text>
                                    <TextInput
                                        style={styles.formInput}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={"johndoe"}
                                    />
                                </>
                            )}
                            name="username"
                        />
                        {errors.email && <Text style={styles.error}>Please enter your email.</Text>}
                        <View style={styles.submitButton}>
                            <Button title={"Login"} onPress={handleSubmit(onSubmit)}/>
                        </View>
                    </View>
                </ScrollView>
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
        justifyContent: "center",
        alignContent: "center",
        // maxWidth: "30%",
        marginLeft: "5%",
        marginRight: "5%"
    },
    button: {
        maxWidth: 90,
        width: 90
        // fontSize: 30
    },
    formLabel: {
        fontSize: 15,
        marginBottom: 5
    },
    formInput: {
        height: 50,
        marginBottom: 10,
        paddingLeft: 10,
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
        // marginTop: 5,
        marginBottom: 15,
        color: "red"
    }
});