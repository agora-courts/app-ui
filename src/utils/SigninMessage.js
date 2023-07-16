export class SigninMessage {
  domain;
  publicKey;
  nonce;
  statement;

  constructor({ domain, publicKey, nonce, statement }) {
    this.domain = domain;
    this.publicKey = publicKey;
    this.nonce = nonce;
    this.statement = statement;
  }

  prepare() {
    return `${this.statement}${this.nonce}`;
  }
}
