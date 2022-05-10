use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    program::invoke,
    msg,
    pubkey::Pubkey,
};
use spl_token::instruction::burn;

entrypoint!(process_instruction);

pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8]
) -> ProgramResult {
    
    msg!("Watch your tokens get burnt");

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