import {Alert, Platform, ToastAndroid} from 'react-native';

const showToast = (message: string, title?: string) => {
  if (Platform.OS == 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(title ?? 'Alert', message);
  }
};

export default showToast;
