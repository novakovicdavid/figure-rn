import * as SecureStore from "expo-secure-store";
import {Platform} from "react-native";

export const storage = {
    async save(key, value) {
        if (Platform.OS === "web") {
            localStorage.setItem(key, value);
        }
        else await SecureStore.setItemAsync(key, value);
    },
    async getValueFor(key) {
        if (Platform.OS === "web") {
            return localStorage.getItem(key);
        }
        else return await SecureStore.getItemAsync(key);
    },
    async saveProfile(profile) {
        await this.save("profile", JSON.stringify(profile));
    },
    async loadProfile() {
        return JSON.parse(await this.getValueFor("profile"));
    },
    async deleteKey(key) {
        if (Platform.OS === "web") {
            localStorage.removeItem(key)
        }
        else await SecureStore.deleteItemAsync(key);
    },
    async saveTheme(theme) {
        await this.save("theme", JSON.stringify(theme));
    },
    async loadTheme() {
        return JSON.parse(await this.getValueFor("theme"));
    }
}


