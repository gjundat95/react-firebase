import { AsyncStorage } from 'react-native';

export const save = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        // Error saving data
    }
};
export const get = async (key) => {
    try {
        return value = await AsyncStorage.getItem(key);
    } catch (error) {
        // Error saving data
        return null;
    }
}