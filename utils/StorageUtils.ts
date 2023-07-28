import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_COLLECTION_KEY = 'life_collection_storage_key';
export const getCollectionMintAddress = () => {
  return AsyncStorage.getItem(STORAGE_COLLECTION_KEY);
};

export const storeCollectionAddress = (address: string) => {
  AsyncStorage.setItem(STORAGE_COLLECTION_KEY, address);
};
