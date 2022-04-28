use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    program::invoke,
    msg,
    // program_error::ProgramError,
    pubkey::Pubkey,
};
// pub mod spl_token;
use spl_token::instruction::burn;

/// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct GreetingAccount {
    /// number of greetings
    pub counter: u32,
}

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    _program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    _instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    msg!("Hello World Rust program entrypoint");

    // Iterating accounts is safer than indexing
    let accounts_iter = &mut accounts.iter();

    let token_program = next_account_info(accounts_iter)?;
    let burn_account = next_account_info(accounts_iter)?;
    let mint = next_account_info(accounts_iter)?;
    let authority = next_account_info(accounts_iter)?;
    
    let amount = 1;

    let ix = burn(
        token_program.key,
        burn_account.key,
        mint.key,
        authority.key,
        &[],
        amount,
    )?;
    invoke(
        &ix,
        &[
            burn_account.clone(),
            mint.clone(),
            authority.clone(),
            token_program.clone(),
        ],
    )?;

    Ok(())
}