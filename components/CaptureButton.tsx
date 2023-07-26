import {GestureResponderEvent, TouchableOpacity} from 'react-native';
import globalStyles from '../utils/Styles';
import CameraSvg from './CameraSvg';
import {launchCamera, ImagePickerResponse} from 'react-native-image-picker';
import showToast from '../utils/Toast';

const CaptureButton = ({
  handleCameraResult,
}: {
  handleCameraResult: (response: ImagePickerResponse) => void;
}) => {
  const handleLaunchCamera = () => {
    launchCamera(
      {mediaType: 'photo', cameraType: 'front', saveToPhotos: true},
      response => {
        handleCameraResult(response);
      },
    );
  };
  return (
    <TouchableOpacity
      style={globalStyles.captureButton}
      onPress={handleLaunchCamera}>
      <CameraSvg />
    </TouchableOpacity>
  );
};
export default CaptureButton;
