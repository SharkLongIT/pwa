import { Platform, PermissionsAndroid } from 'react-native';
import GetLocation from 'react-native-get-location';

export const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true; // iOS tự handle qua plist
};