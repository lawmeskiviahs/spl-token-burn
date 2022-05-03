use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    // program::invoke,
    msg,
    pubkey::Pubkey,
};
// use spl_token::instruction::burn;

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct UniverseMetadata {
    authority: Pubkey, // same as metadata update authority
    candy_machine: Pubkey, // pubkey of the candymachine which minted
    mint: Pubkey,
    minting_epoch: u64,
    current_universe_level: u32,
    status: u8, // status can be 0-idle, 1-requested, 2-evolving
    bump: u8,
    cost: u64
}

entrypoint!(process_instruction);

pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {

    msg!("Hello World Rust program entrypoint");

    let accounts_iter = &mut accounts.iter();

    let _token_program = next_account_info(accounts_iter)?;
    let _burn_account = next_account_info(accounts_iter)?;
    let _mint = next_account_info(accounts_iter)?;
    let _authority = next_account_info(accounts_iter)?;
    let metadata_account_info_a = next_account_info(accounts_iter)?;
    let _metadata_account_info_b = next_account_info(accounts_iter)?;
    
    let metadata_account_a = UniverseMetadata::try_from_slice(&metadata_account_info_a.data.borrow())?;
    // let mut metadata_account_a = UniverseMetadata::try_from_slice(&metadata_account_info_a.data.borrow())?;
    // let metadata_account_b = UniverseMetadata::try_from_slice(&metadata_account_info_b.data.borrow())?;

    // metadata_account_a.current_universe_level = metadata_account_a.current_universe_level + metadata_account_b.current_universe_level;
    msg!("metadata_account_a.current_universe_level {}", metadata_account_a.current_universe_level);

    // metadata_account_a.serialize(&mut *metadata_account_info_a.try_borrow_mut_data()?)?;
    metadata_account_a.serialize(&mut &mut metadata_account_info_a.data.borrow_mut()[..])?;


    let _amount = 1;

    // let ix = burn(
    //     token_program.key,
    //     burn_account.key,
    //     mint.key,
    //     authority.key,
    //     &[],
    //     amount,
    // )?;
    // invoke(
    //     &ix,
    //     &[
    //         burn_account.clone(),
    //         mint.clone(),
    //         authority.clone(),
    //         token_program.clone(),
    //     ],
    // )?;

    Ok(())
}