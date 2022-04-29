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
  const mint = new PublicKey('FVjm9NswmXbnPinGnU2Zooj4CrZKsYFHqrxaCvV8dUpH');
  const ata = new PublicKey('FXvXaFbaRmo4NrFbiTsax4HVQrTnHEovZRddwiK2dXAL');
  // console.log('reached instruction');
  programId = new PublicKey('ByPy64kKUyfLHkAQQRPxEpC5ocuWXjXBeMcpbm8A6YgR');
  
  let mintPubkeya = new PublicKey("AUa5RUdky6whb3AJ351yd9vpzRm5tpvE6W4CgUnFJ72p");
  let tokenmetaPubkeya = await Metadata.getPDA(mintPubkeya);
  let resultt = await Metadata.load(connection, tokenmetaPubkeya);
  let mintPubkeyb = new PublicKey("BSqDDYwFKmoJmjvjtNdhgcWT4J65Xd9tiE1buc6cL3gz");
  let tokenmetaPubkeyb = await Metadata.getPDA(mintPubkeyb);
  let resulttt = await Metadata.load(connection, tokenmetaPubkeyb);
  console.log(resultt.data.data.uri);
  console.log(resulttt.data.data.uri);

  const instruction = new TransactionInstruction({
    keys: [{pubkey: tokenprogram, isSigner: false, isWritable: false},{pubkey: ata, isSigner: false, isWritable: true},{pubkey: mint, isSigner: false, isWritable: true},{pubkey: payer.publicKey, isSigner: true, isWritable: true},{pubkey: tokenmetaPubkeya, isSigner: false, isWritable: true}, {pubkey: tokenmetaPubkeyb, isSigner: false, isWritable: true}],
    programId,
    data: Buffer.alloc(0),
  });
  // console.log('payer.pubkey', payer.publicKey.toBase58());
  // console.log('Instruction made >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', instruction);
  const result = await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer],
  );
  // console.log(result);
}
