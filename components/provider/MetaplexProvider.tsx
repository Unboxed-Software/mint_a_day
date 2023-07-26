import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Connection, Keypair, Transaction} from '@solana/web3.js';
import {
  IdentitySigner,
  Metaplex,
  MetaplexPlugin,
  keypairIdentity,
} from '@metaplex-foundation/js';
import {Account} from './AuthorizationProvider';
import {
  Web3MobileWallet,
  transact,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

const ASYNC_STORAGE_KEY = '@mint_a_day_keypair_key';

type MetaplexContextType = {
  metaplex: Metaplex | null;
  wallet: Keypair | null;
};

type EncodedKeypair = {
  publicKeyBase58: string;
  secretKeyBase58: string;
};

const DEFAULT_CONTEXT: MetaplexContextType = {
  metaplex: null,
  wallet: null,
};

const mobileWalletAdapterIdentity = (
  mwaIdentitySigner: IdentitySigner,
): MetaplexPlugin => ({
  install(metaplex: Metaplex) {
    metaplex.identity().setDriver(mwaIdentitySigner);
  },
});

export const useMetaplex = (
  connection: Connection | null,
  selectedAccount: Account | null,
  authorizeSession: (wallet: Web3MobileWallet) => Promise<Account>,
) => {
  return useMemo(() => {
    if (!selectedAccount || !authorizeSession || !connection) {
      return {mwaIdentitySigner: null, metaplex: null};
    }

    const mwaIdentitySigner: IdentitySigner = {
      publicKey: selectedAccount.publicKey,
      signMessage: async (messages: Uint8Array): Promise<Uint8Array> => {
        return await transact(async (wallet: Web3MobileWallet) => {
          await authorizeSession(wallet);
          const signedMessages = await wallet.signMessages({
            addresses: [selectedAccount.publicKey.toBase58()],
            payloads: [messages],
          });

          return signedMessages[0];
        });
      },
      signTransaction: async (
        transaction: Transaction,
      ): Promise<Transaction> => {
        return await transact(async (wallet: Web3MobileWallet) => {
          await authorizeSession(wallet);
          const signedTransaction = await wallet.signTransactions({
            transactions: [transaction],
          });
          return signedTransaction[0];
        });
      },
      signAllTransactions: async (
        transactions: Transaction[],
      ): Promise<Transaction[]> => {
        return await transact(async (wallet: Web3MobileWallet) => {
          await authorizeSession(wallet);
          const signedTransactions = await wallet.signTransactions({
            transactions,
          });
          return signedTransactions;
        });
      },
    };
    const metaplex = Metaplex.make(connection).use(
      mobileWalletAdapterIdentity(mwaIdentitySigner),
    );

    return {metaplex};
  }, [connection, selectedAccount, authorizeSession]);
};
