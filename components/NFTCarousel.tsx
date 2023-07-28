import {Button, Modal, Text, View} from 'react-native';
import globalStyles from '../utils/Styles';
import {useMetaplex} from './provider/MetaplexProvider';
import {useAuthorization} from './provider/AuthorizationProvider';
import {useConnection} from './provider/ConnectionProvider';
import {useCallback, useEffect, useState} from 'react';
import {
  FindNftsByOwnerOutput,
  Option,
  PublicKey,
} from '@metaplex-foundation/js';
import CaptureButton from './CaptureButton';
import {ImagePickerResponse} from 'react-native-image-picker';
import showToast from '../utils/Toast';
import {
  getCollectionMintAddress,
  storeCollectionAddress,
} from '../utils/StorageUtils';
import {Keypair} from '@solana/web3.js';
import {storeNFT} from '../utils/NftStorage';

const NFTCarousel = () => {
  const {connection} = useConnection();
  const {selectedAccount, authorizeSession} = useAuthorization();
  const {metaplex} = useMetaplex(connection, selectedAccount, authorizeSession);
  const [nfts, setNfts] = useState<FindNftsByOwnerOutput | null>(null);
  const [collectionMintAddress, setCollectionMintAddress] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setCollectionMintAddress(await getCollectionMintAddress());
    })();
  }, []);

  useEffect(() => {
    console.log('Collection: ' + collectionMintAddress);
  }, [collectionMintAddress]);

  const createCollection = async () => {
    if (!collectionMintAddress) {
      setLoading(true);
      try {
        const collectionResult = await metaplex?.nfts().create({
          name: 'Life',
          isCollection: true,
          uri: 'https://bafkreigwbl63u2brkz66r3tzsha3imbfpbek35xeanrawmgrgneskyfdlm.ipfs.nftstorage.link/',
          sellerFeeBasisPoints: 0,
        });
        console.log('response: ' + JSON.stringify(collectionResult));
        if (collectionResult) {
          setCollectionMintAddress(collectionResult.mintAddress.toString());
          storeCollectionAddress(collectionResult.mintAddress.toString());
        }
      } catch (e) {
        console.log('error: ' + e);
        showToast('Failed to create collection', 'Error');
      } finally {
        setLoading(false);
      }
    }
  };

  const uploadNft = useCallback(
    async (uri: string) => {
      try {
        const uploadToStorage = await storeNFT(uri, Date.now().toString());
        console.log('upload result: ' + JSON.stringify(uploadToStorage));
      } catch (e) {
        console.log('upload error: ' + e);
      }
      // const nftUploadResult = metaplex
      //   ?.nfts()
      //   .create({
      //     name: Date.now().toString(),
      //     uri,
      //     sellerFeeBasisPoints: 0,
      //   });

      //   if(nftUploadResult){

      //   }
    },
    [metaplex, collectionMintAddress],
  );

  useEffect(() => {
    const getNFTs = async () => {
      if (metaplex && selectedAccount) {
        const nfts = await metaplex
          .nfts()
          .findAllByOwner({owner: selectedAccount.publicKey});
        setNfts(nfts);

        if (!nfts || nfts.length == 0) {
          createCollection();
        }
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
      setLoading(true);
      try {
      } catch (e) {
        console.log('error' + e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={globalStyles.centeredContentView}>
      {loading ? (
        <Text style={globalStyles.infoText}>Loading. Please wait...</Text>
      ) : nfts?.length && nfts.length > 1 ? (
        <Text>{nfts.length}</Text>
      ) : (
        <>
          <Text style={globalStyles.infoText}>
            No NFTs found. Click the capture button to click and upload today's
            NFT
          </Text>
          <CaptureButton handleCameraResult={handleCameraResult} />
        </>
      )}
    </View>
  );
};

export default NFTCarousel;
