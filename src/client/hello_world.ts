import {
  Keypair,
  Connection,
  PublicKey,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';


import {getPayer, getRpcUrl} from './utils';

let connection: Connection;
let payer: Keypair;
let programId: PublicKey;
let tokenprogram : PublicKey;

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

  const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
  tokenprogram = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
  const mint = new PublicKey('6642UyGLtN9dhQMVNKB5xGUxYtPp9dCFSmHh9cuz3Sb3');

  const [address] = await PublicKey.findProgramAddress(
    [payer.publicKey.toBuffer(), tokenprogram.toBuffer(), mint.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
);

  const ata = new PublicKey('D3LqKTZuWGD1TZUrQF8LzgDtUyihFnVpSy5EfyhGtmae');
  console.log('reached instruction');
  programId = new PublicKey('ByPy64kKUyfLHkAQQRPxEpC5ocuWXjXBeMcpbm8A6YgR');
  const instruction = new TransactionInstruction({
    keys: [
      {pubkey: tokenprogram, isSigner: false, isWritable: false},
      {pubkey: address, isSigner: false, isWritable: true},
      {pubkey: mint, isSigner: false, isWritable: true},
      {pubkey: payer.publicKey, isSigner: true, isWritable: true}
    ],
    programId,
    data: Buffer.alloc(0),
  });

  const result = await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer],
  );
  console.log('======================',result);

}