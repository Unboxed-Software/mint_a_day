import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {useAuthorization} from './provider/AuthorizationProvider';
import {useConnection} from './provider/ConnectionProvider';
import {useMetaplex} from './provider/MetaplexProvider';
import {Button, Text, View} from 'react-native';
import globalStyles from '../utils/Styles';

const ConnectWallet = () => {
  const {connection} = useConnection();
  const {selectedAccount, authorizeSession} = useAuthorization();
  const {metaplex} = useMetaplex(connection, selectedAccount, authorizeSession);

  const handleConnectWallet = async () => {
    await transact(async wallet => {
      await authorizeSession(wallet);
    });
  };
  return (
    <View style={globalStyles.centeredContentView}>
      <Text style={globalStyles.infoText}>
        {selectedAccount?.publicKey
          ? `Selected Wallet Address:\n${selectedAccount?.publicKey.toString()}`
          : 'Click the Connect Wallet button to get started'}
      </Text>
      <Button title="Connect Wallet" onPress={handleConnectWallet} />
    </View>
  );
};

export default ConnectWallet;
