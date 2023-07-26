import {Cluster} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {Connection} from '@solana/web3.js';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ConnectionContextType = {
  connection: Connection | null;
};

const DEFAULT_CONTEXT: ConnectionContextType = {
  connection: null,
};

const ConnectionContext = createContext<ConnectionContextType>(DEFAULT_CONTEXT);

export const useConnection = () => useContext(ConnectionContext);

export const ConnectionProvider = ({
  children,
  endpoint,
}: {
  children: ReactNode;
  endpoint: string;
}) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  useEffect(() => {
    const connection = new Connection(endpoint, {commitment: 'finalized'});
    setConnection(connection);
  }, [endpoint]);

  const value = useMemo(
    () => ({
      connection,
    }),
    [connection],
  );

  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  );
};
