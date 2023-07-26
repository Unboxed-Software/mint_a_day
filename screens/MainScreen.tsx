import {Text, View} from 'react-native';
import {useAuthorization} from '../components/provider/AuthorizationProvider';
import ConnectWallet from '../components/ConnectWallet';
import globalStyles from '../utils/Styles';
import NFTCarousel from '../components/NFTCarousel';

const MainScreen = () => {
  const {selectedAccount} = useAuthorization();

  return (
    <View style={globalStyles.centeredContentView}>
      {selectedAccount ? <NFTCarousel /> : <ConnectWallet />}
    </View>
  );
};

export default MainScreen;
