import {Text, View} from 'react-native';
import globalStyles from '../utils/Styles';
import {useMetaplex} from './provider/MetaplexProvider';
import {useAuthorization} from './provider/AuthorizationProvider';
import {useConnection} from './provider/ConnectionProvider';
import {useEffect, useState} from 'react';
import {FindNftsByOwnerOutput} from '@metaplex-foundation/js';
import CaptureButton from './CaptureButton';
import {ImagePickerResponse} from 'react-native-image-picker';
import showToast from '../utils/Toast';

const NFTCarousel = () => {
  const {connection} = useConnection();
  const {selectedAccount, authorizeSession} = useAuthorization();
  const {metaplex} = useMetaplex(connection, selectedAccount, authorizeSession);
  const [nfts, setNfts] = useState<FindNftsByOwnerOutput | null>(null);

  useEffect(() => {
    const getNFTs = async () => {
      if (metaplex && selectedAccount) {
        const nfts = await metaplex
          .nfts()
          .findAllByOwner({owner: selectedAccount.publicKey});
        setNfts(nfts);
      }
    };

    getNFTs();
  }, [metaplex, selectedAccount]);

  const handleCameraResult = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      showToast('Cancelled');
      return;
    }

    if (response.errorCode) {
      showToast(response.errorMessage ?? response.errorCode);
      return;
    }

    if (response.assets) {
      console.log('uri: ' + response.assets[0].uri);
    }
  };

  return (
    <View style={globalStyles.centeredContentView}>
      {nfts?.length && nfts.length > 0 ? (
        <Text>{nfts.length}</Text>
      ) : (
        <Text style={globalStyles.infoText}>
          No NFTs found. Click the capture button to click and upload today's
          NFT
        </Text>
      )}

      <CaptureButton handleCameraResult={handleCameraResult} />
    </View>
  );
};

export default NFTCarousel;
