import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
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
  // console.log('Saying hello to', greetedPubkey.toBase58());
  const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
  tokenprogram = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
  const mint = new PublicKey('6642UyGLtN9dhQMVNKB5xGUxYtPp9dCFSmHh9cuz3Sb3');

  const [address] = await PublicKey.findProgramAddress(
    [payer.publicKey.toBuffer(), tokenprogram.toBuffer(), mint.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
);

    // console.log(address.toBase58());
    // console.log(payer.publicKey.toBase58());
    

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
    data: Buffer.alloc(0), // All instructions are hellos
  });
  // console.log('payer.pubkey', payer.publicKey.toBase58());
  // console.log('Instruction made >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', instruction);
  // console.log()
  const result = await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer],
  );
  console.log('======================',result);
}

//
// const status = 0;
// const level = 3;
// const instruction = new TransactionInstruction({
//   keys: [
//     {pubkey: mint_universe_metadata, isSigner: false, isWritable: true},
//     {pubkey: mint, isSigner: false, isWritable: false},
//     {pubkey: update_authority, isSigner: true, isWritable: false},
//   ],
//   programId,
//   data: Buffer.from(new Uint8Array([status, level])), // All instructions are hellos
// });