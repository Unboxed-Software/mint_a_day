import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  centeredContentView: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    position: 'absolute',
    backgroundColor: '#f04a4a',
    borderRadius: 50,
    width: 48,
    height: 48,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 16,
    end: 4,
  },
  infoText: {
    color: 'black',
    margin: 8,
    padding: 4,
  },
});

export default globalStyles;
