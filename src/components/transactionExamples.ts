export const transactionExamples: Record<string, object> = {
    AccountSet: {
      TransactionType: 'AccountSet',
      Account: '', // Replace dynamically
      SetFlag: 5,
    },
    AccountDelete: {
      TransactionType: 'AccountDelete',
      Account: '', // Replace dynamically
      Destination: '',
    },
    AMMBid: {
      TransactionType: 'AMMBid',
      Account: '', // Replace dynamically
      Amount: '1000000',
      AMMId: '',
    },
    AMMCreate: {
      TransactionType: 'AMMCreate',
      Account: '', // Replace dynamically
      Amount1: '1000000',
      Amount2: {
        currency: 'USD',
        issuer: '',
        value: '1000',
      },
    },
    AMMDelete: {
      TransactionType: 'AMMDelete',
      Account: '', // Replace dynamically
      AMMId: '',
    },
    AMMDeposit: {
      TransactionType: 'AMMDeposit',
      Account: '', // Replace dynamically
      AMMId: '',
      Amount: '1000000',
    },
    AMMVote: {
      TransactionType: 'AMMVote',
      Account: '', // Replace dynamically
      AMMId: '',
      Vote: 1,
    },
    AMMWithdraw: {
      TransactionType: 'AMMWithdraw',
      Account: '', // Replace dynamically
      AMMId: '',
      Amount: '1000000',
    },
    CheckCancel: {
      TransactionType: 'CheckCancel',
      Account: '', // Replace dynamically
      CheckID: '',
    },
    CheckCash: {
      TransactionType: 'CheckCash',
      Account: '', // Replace dynamically
      CheckID: '',
      Amount: '1000000',
    },
    CheckCreate: {
      TransactionType: 'CheckCreate',
      Account: '', // Replace dynamically
      Destination: '',
      SendMax: '1000000',
    },
    Clawback: {
      TransactionType: 'Clawback',
      Account: '', // Replace dynamically
      Amount: {
        currency: 'USD',
        issuer: '',
        value: '100',
      },
      Destination: '',
    },
    DepositPreauth: {
      TransactionType: 'DepositPreauth',
      Account: '', // Replace dynamically
      Authorize: '', // Address to preauthorize
    },
    DIDDelete: {
      TransactionType: 'DIDDelete',
      Account: '', // Replace dynamically
    },
    DIDSet: {
      TransactionType: 'DIDSet',
      Account: '', // Replace dynamically
      DID: '', // Decentralized Identifier
    },
    EscrowCancel: {
      TransactionType: 'EscrowCancel',
      Account: '', // Replace dynamically
      Owner: '',
      OfferSequence: 0,
    },
    EscrowCreate: {
      TransactionType: 'EscrowCreate',
      Account: '', // Replace dynamically
      Destination: '',
      Amount: '1000000',
      FinishAfter: '', // Optional
      CancelAfter: '', // Optional
      Condition: '', // Optional
    },
    EscrowFinish: {
      TransactionType: 'EscrowFinish',
      Account: '', // Replace dynamically
      Owner: '',
      OfferSequence: 0,
    },
    NFTokenAcceptOffer: {
      TransactionType: 'NFTokenAcceptOffer',
      Account: '', // Replace dynamically
      NFTokenSellOffer: '', // Or NFTokenBuyOffer
    },
    NFTokenBurn: {
      TransactionType: 'NFTokenBurn',
      Account: '', // Replace dynamically
      NFTokenID: '',
    },
    NFTokenCancelOffer: {
      TransactionType: 'NFTokenCancelOffer',
      Account: '', // Replace dynamically
      NFTokenOfferID: '',
    },
    NFTokenCreateOffer: {
      TransactionType: 'NFTokenCreateOffer',
      Account: '', // Replace dynamically
      NFTokenID: '',
      Amount: '1000000',
      Owner: '', // Optional for sell offers
    },
    NFTokenMint: {
      TransactionType: 'NFTokenMint',
      Account: '', // Replace dynamically
      NFTokenTaxon: 0,
      URI: '', // Optional
    },
    OfferCancel: {
      TransactionType: 'OfferCancel',
      Account: '', // Replace dynamically
      OfferSequence: 0,
    },
    OfferCreate: {
      TransactionType: 'OfferCreate',
      Account: '', // Replace dynamically
      TakerGets: '1000000',
      TakerPays: {
        currency: 'USD',
        issuer: '',
        value: '1000',
      },
    },
    OracleDelete: {
      TransactionType: 'OracleDelete',
      Account: '', // Replace dynamically
      OracleID: '', // Identifier for the Oracle
    },
    OracleSet: {
      TransactionType: 'OracleSet',
      Account: '', // Replace dynamically
      OracleID: '', // Identifier for the Oracle
    },
    Payment: {
      TransactionType: 'Payment',
      Account: '', // Replace dynamically
      Amount: '1000000',
      Destination: '',
    },
    IOUPayment: {
      TransactionType: 'Payment',
      Account: '', // Replace dynamically
      Amount: {
        currency: 'USD', // Currency code (e.g., USD)
        issuer: '', // Issuer account (rAddress)
        value: '100', // Value of the IOU
      },
      Destination: '',
    },
    PaymentChannelClaim: {
      TransactionType: 'PaymentChannelClaim',
      Account: '', // Replace dynamically
      Channel: '',
      Balance: '1000000',
    },
    PaymentChannelCreate: {
      TransactionType: 'PaymentChannelCreate',
      Account: '', // Replace dynamically
      Destination: '',
      Amount: '1000000',
      SettleDelay: 86400,
    },
    PaymentChannelFund: {
      TransactionType: 'PaymentChannelFund',
      Account: '', // Replace dynamically
      Channel: '',
      Amount: '500000',
    },
    SetRegularKey: {
      TransactionType: 'SetRegularKey',
      Account: '', // Replace dynamically
      RegularKey: '',
    },
    SignerListSet: {
      TransactionType: 'SignerListSet',
      Account: '', // Replace dynamically
      SignerQuorum: 2,
      SignerEntries: [
        {
          SignerEntry: {
            Account: '',
            SignerWeight: 1,
          },
        },
      ],
    },
    TicketCreate: {
      TransactionType: 'TicketCreate',
      Account: '', // Replace dynamically
      TicketCount: 1,
    },
    TrustSet: {
      TransactionType: 'TrustSet',
      Account: '', // Replace dynamically
      LimitAmount: {
        currency: 'USD',
        issuer: '',
        value: '1000',
      },
    },
    XChainAccountCreateCommit: {
      TransactionType: 'XChainAccountCreateCommit',
      Account: '', // Replace dynamically
      Amount: '1000000',
      Destination: '',
    },
    XChainAddAccountCreateAttestation: {
      TransactionType: 'XChainAddAccountCreateAttestation',
      Account: '', // Replace dynamically
      AttestationData: '',
    },
    XChainAddClaimAttestation: {
      TransactionType: 'XChainAddClaimAttestation',
      Account: '', // Replace dynamically
      AttestationData: '',
    },
    XChainClaim: {
      TransactionType: 'XChainClaim',
      Account: '', // Replace dynamically
      ClaimAmount: '1000000',
      Destination: '',
    },
    XChainCommit: {
      TransactionType: 'XChainCommit',
      Account: '', // Replace dynamically
      CommitAmount: '1000000',
      Destination: '',
    },
    XChainCreateBridge: {
      TransactionType: 'XChainCreateBridge',
      Account: '', // Replace dynamically
      Destination: '',
      BridgeDetails: '',
    },
  };
  