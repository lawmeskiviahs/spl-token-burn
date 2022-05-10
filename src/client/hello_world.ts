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
  tokenprogram = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
  const mint = new PublicKey('AUParXdFTs28uzjgmaoHdxw94genyaxEe3ye5abPGec4');
  const ata = new PublicKey('D3LqKTZuWGD1TZUrQF8LzgDtUyihFnVpSy5EfyhGtmae');
  console.log('reached instruction');
  programId = new PublicKey('fYWnWoGVu25fMTzn7M1Ea9gfizGft5ZwQhVSnzfxg9e');
  const instruction = new TransactionInstruction({
    keys: [
      {pubkey: tokenprogram, isSigner: false, isWritable: false},
      {pubkey: ata, isSigner: false, isWritable: true},
      {pubkey: mint, isSigner: false, isWritable: true},
      {pubkey: payer.publicKey, isSigner: true, isWritable: true}
    ],
    programId,
    data: Buffer.alloc(0), // All instructions are hellos
  });
  console.log('payer.pubkey', payer.publicKey.toBase58());
  console.log('Instruction made >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', instruction);
  // console.log()
  const result = await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer],
  );
  console.log('======================',result);
}