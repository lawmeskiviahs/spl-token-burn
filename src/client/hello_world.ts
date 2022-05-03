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

let connection: Connection;
let payer: Keypair;
let programId: PublicKey;

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

  const mint = new PublicKey('J6PXH6vJZhS8SNzVqathiRCLPwmsetAYQHSqwgadofxJ');

  const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  );

  const associatedtokenaccount = (await PublicKey.findProgramAddress(
    [
        payer.publicKey.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
    ],
    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  ))[0];

  // console.log('reached instruction');
  programId = new PublicKey('ByPy64kKUyfLHkAQQRPxEpC5ocuWXjXBeMcpbm8A6YgR');
  
  let mintPubkeya = new PublicKey("AUa5RUdky6whb3AJ351yd9vpzRm5tpvE6W4CgUnFJ72p");
  let tokenmetaPubkeya = await Metadata.getPDA(mintPubkeya);
  let resultt = await Metadata.load(connection, tokenmetaPubkeya);

  let mintPubkeyb = new PublicKey("BSqDDYwFKmoJmjvjtNdhgcWT4J65Xd9tiE1buc6cL3gz");
  let tokenmetaPubkeyb = await Metadata.getPDA(mintPubkeyb);
  // let resulttt = await Metadata.load(connection, tokenmetaPubkeyb);

  console.log(resultt);
  // console.log(resulttt.data.data.uri);

  const signer =Keypair.fromSecretKey(
    bs58.decode("4tuQjd1M2c5pB3P3u8qLyadm6ZPAVGtjcAbEya1ucoGfXtQoEf2JaKCAtLvFkJYdBUixXRg8HFywDAJtnT9MkQpq")
  );

  const instruction = new TransactionInstruction({
    keys: [{pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false},{pubkey: associatedtokenaccount, isSigner: false, isWritable: true},{pubkey: mint, isSigner: false, isWritable: true},{pubkey: payer.publicKey, isSigner: false, isWritable: true},{pubkey: tokenmetaPubkeya, isSigner: false, isWritable: true}, {pubkey: tokenmetaPubkeyb, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.alloc(0),
  });

  // console.log('payer.pubkey', payer.publicKey.toBase58());
  // console.log('Instruction made >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', instruction);

  const result = await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [signer],
  );
  console.log(result);
}
