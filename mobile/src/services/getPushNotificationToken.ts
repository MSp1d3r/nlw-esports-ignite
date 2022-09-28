import { PushTokenListener } from './../../node_modules/expo-notifications/src/TokenEmitter';
import * as Notifications from 'expo-notifications'

export async function getPushNotificationToken() {
    const { granted } = await Notifications.getPermissionsAsync();

    if(!granted) {
        await Notifications.requestPermissionsAsync();
    }
    if(granted) {
        const PushToken = await Notifications.getExpoPushTokenAsync();
        console.log('NOTIFICAÇÃO TOKEN =>', PushToken.data);

        return PushToken.data;
    }

}