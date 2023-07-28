// Import the NFTStorage class and File constructor from the 'nft.storage' package
import {NFTStorage, File} from 'nft.storage';

import path from 'path';

const NFT_STORAGE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDliMTM2MjliMTk2OTU2NmU1Q0ZjYTM0NURFMDBBOTYyYTQ4ZUFDQ2IiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MDU1NTI3OTcwMCwibmFtZSI6Ik1pbnQgYSBkYXkifQ.K5enkYdWNFncKAfGNOeihon6xyVRilGaifTvzwvqvyM';

export async function storeNFT(imagePath: string, name: string) {
  const nftstorage = new NFTStorage({token: NFT_STORAGE_KEY});
  return nftstorage.store({
    image: new File(imagePath),
    name,
    description: '',
  });
}
