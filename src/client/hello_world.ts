import {
  Keypair,
  Connection,
  PublicKey,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import {getPayer, getRpcUrl} from './utils';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import * as bs58 from "bs58";
import { BN, Program, Provider} from '@project-serum/anchor';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import {
  IDL as mintingProgramIdl,
  NftCandyMachine,
} from './idl';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export interface UniverseMetadata {
  authority: PublicKey;
  candyMachine: PublicKey;
  mint: PublicKey;
  mintingEpoch: BN;
  currentUniverseLevel: number;
  status: number;
  bump: number;
  cost: BN;
}

let connection: Connection;
let payer: Keypair;
let programId: PublicKey;

const DEVNET_URL = 'https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899';
const ACTIVE_NETWORK = {
  NAME: WalletAdapterNetwork.Mainnet,
  URL: DEVNET_URL,
};
const TOKEN_METADATA_PREFIX = 'metadata';
const UNIVERSE_SIGNER_SEED = 'universe';
const UNIVERSE_PROGRAM_ID = new PublicKey('6U5p5noGQyx8Je33c8jp6dg3hzKKTcwuvtSEKJzK91KQ');

export async function establishConnection(): Promise<void> {
  const rpcUrl = await getRpcUrl();
  connection = new Connection(rpcUrl, 'confirmed');
  const version = await connection.getVersion();
  console.log('Connection to cluster established:', rpcUrl, version);
}

export async function establishPayer(): Promise<void> {
    payer = await getPayer();
}

export async function sayHello(): Promise<void> {
  // console.log('Saying hello to', greetedPubkey.toBase58());

  // const mint = new PublicKey('J6PXH6vJZhS8SNzVqathiRCLPwmsetAYQHSqwgadofxJ');
  const SIGNER_SEEDS = 'universe';
  let mintPubkey = new PublicKey("AUa5RUdky6whb3AJ351yd9vpzRm5tpvE6W4CgUnFJ72p");
  let CANDY_MACHINE_PROGRAM_ID = new PublicKey("4UJuwGFxWhz1mXzeKYtJyz1c6b1vzKQPqmdtX4kQwbUC");

  // const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
  //   'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  // );

  // const associatedtokenaccount = (await PublicKey.findProgramAddress(
  //   [
  //       payer.publicKey.toBuffer(),
  //       TOKEN_PROGRAM_ID.toBuffer(),
  //       mint.toBuffer(),
  //   ],
  //   SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  // ))[0];

  // console.log('reached instruction');
  // programId = new PublicKey('ByPy64kKUyfLHkAQQRPxEpC5ocuWXjXBeMcpbm8A6YgR'); // burn token programId
  programId = new PublicKey('3Z7SKfV86kndM46WqDLf7ULnAPFyGikpwyvtPGN5siCP'); // merfe nft programId

  // let mintPubkeya = new PublicKey("AUa5RUdky6whb3AJ351yd9vpzRm5tpvE6W4CgUnFJ72p");
  // let tokenmetaPubkeya = await Metadata.getPDA(mintPubkeya);
  // let resultt = await Metadata.load(connection, tokenmetaPubkeya);

  // let mintPubkeyb = new PublicKey("BSqDDYwFKmoJmjvjtNdhgcWT4J65Xd9tiE1buc6cL3gz");
  // let tokenmetaPubkeyb = await Metadata.getPDA(mintPubkeyb);
  // let resulttt = await Metadata.load(connection, tokenmetaPubkeyb);

  let universeMetadataAccount = new PublicKey("3zyCFi76PacHcC4huFbVhk7tPZqey2n6RicFuaBLg8Wq"); 

  // const [universeMetadataAccount] = await PublicKey.findProgramAddress(
  //   [
  //     Buffer.from('metadata'),
  //     CANDY_MACHINE_PROGRAM_ID.toBuffer(),
  //     mintPubkey.toBuffer(),
  //     Buffer.from(SIGNER_SEEDS),
  //   ],
  //   CANDY_MACHINE_PROGRAM_ID,
  // );

  // const accountInfo = await connection.getAccountInfo(universeMetadataAccount);
  // console.log(accountInfo?.data);
  
  // console.log(universeMetadataAccount.toBase58());
  

  // let level = 10;

  // console.log(resultt);
  // console.log(resulttt.data.data.uri);

  const signer =Keypair.fromSecretKey(
    bs58.decode("4tuQjd1M2c5pB3P3u8qLyadm6ZPAVGtjcAbEya1ucoGfXtQoEf2JaKCAtLvFkJYdBUixXRg8HFywDAJtnT9MkQpq")
  );

  // console.log(signer.publicKey.toBase58());
  

  const instruction = new TransactionInstruction({
    keys: [
      // {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},
      // {pubkey: associatedtokenaccount, isSigner: false, isWritable: true},
      // {pubkey: mint, isSigner: false, isWritable: true},
      // {pubkey: payer.publicKey, isSigner: false, isWritable: true},
      {pubkey: universeMetadataAccount, isSigner: false, isWritable: true}, 
      // {pubkey: tokenmetaPubkeyb, isSigner: false, isWritable: true}
    ],
    programId,
    data: Buffer.alloc(0),
    // data: Buffer.from(new Uint8Array([level])),
  });
  
  const result = await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [signer],
  );
  console.log(result);
}