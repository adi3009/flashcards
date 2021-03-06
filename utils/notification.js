import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const KEY = '@flashcardsNotification';

const notificationContent = {
  title: 'Study time',
  body: 'daily progress is important',
  sound: true,
  vibrate: true,
  autoDismiss: false
};

const clear = async () => {
  await AsyncStorage.removeItem(KEY);

  return Notifications.cancelAllScheduledNotificationsAsync().then(
    () => console.log('notifications cleared')
  );
};

const askForPermission = async () => {
  const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  return Constants.isDevice && status === 'granted';
};

const notificationRequest = (time) => {
  return {
    identifier: 'flashcard-notification',
    content: notificationContent,
    trigger: {
      hour: time.getHours(),
      minute: time.getMinutes(),
      repeats: true
    }
  }
};

const getDefaultScheduleTime = () => {
  let time = new Date();
  time.setSeconds(time.getSeconds() + 30);

  return time;
};

const AppNotification = {

  schedule: async (atTime = getDefaultScheduleTime()) => {
    let scheduled = await AsyncStorage.getItem(KEY);
    scheduled = JSON.parse(scheduled);

    if (scheduled) {
      await clear();
    }

    const approved = await askForPermission();

    if (approved) {
      console.log('Current time ' + new Date());
      console.log(`Scheduling at ${atTime}`);
      await Notifications.scheduleNotificationAsync(notificationRequest(atTime));

      AsyncStorage.setItem(KEY, JSON.stringify(true));
    }
  },

  onNotification: (handler) => {
    return Notifications.addNotificationReceivedListener(handler);
  }
};


export default AppNotification;