import {useState} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

const styles = StyleSheet.create({
  constainer: {
    width: '100%',
  },
  imageContainer: {
    minHeight: '50%',
    minWidth: '90%',
    borderWidth: 1,
    borderColor: 'black',
  },

  imagePickerButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const CoverImagePicker = ({
  handleImagePick,
}: {
  handleImagePick: (res: ImagePickerResponse) => void;
}) => {
  const [coverUri, setCoverUri] = useState<string>('');

  const handleLaunchPicker = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets) {
        setCoverUri(response.assets[0].uri?.toString() ?? '');
      }
      handleImagePick(response);
    });
  };

  return (
    <View style={styles.constainer}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePickerButton}>
          <Image source={{uri: coverUri}} />
          <Button title="Pick a cover photo" onPress={handleLaunchPicker} />
        </View>
      </View>
    </View>
  );
};

export default CoverImagePicker;
