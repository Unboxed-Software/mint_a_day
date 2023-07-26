import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {
  ConnectionProvider,
  useConnection,
} from './components/provider/ConnectionProvider';
import {clusterApiUrl} from '@solana/web3.js';
import {useMetaplex} from './components/provider/MetaplexProvider';
import MainScreen from './screens/MainScreen';
import {
  AuthorizationProvider,
  useAuthorization,
} from './components/provider/AuthorizationProvider';

function App(): JSX.Element {
  const {connection} = useConnection();
  const {selectedAccount, authorizeSession} = useAuthorization();
  const {metaplex} = useMetaplex(connection, selectedAccount, authorizeSession);

  return (
    <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
      <AuthorizationProvider>
        <MainScreen />
      </AuthorizationProvider>
    </ConnectionProvider>
  );
}

export default App;
