import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMtoke();
  }
}

async function GetFCMtoke() {
  let fcmtoken1 = await AsyncStorage.getItem('fcmtoken');
  if (!fcmtoken1) {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const fcmtoken = messaging()
        .getToken()
        .then(async token => {
          if (fcmtoken) {
            await AsyncStorage.setItem('fcmtoken', token);
            console.log(token);
          } else {
            console.log('Loi ban oi');
          }
        });
    } catch (error) {
      console.log(error, 'errol');
    }
  } else {
    console.log(fcmtoken1);
  }
}
export const NotoficationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().onMessage(async remoteMessage => {
    console.log('Notification on forground state ...', remoteMessage);
  });
};
