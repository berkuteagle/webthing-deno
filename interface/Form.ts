export interface Response {
  contentType: string;
}

export default interface Form {
  op?: string;
  href: string;
  contentType?: string;
  contentCoding?: string;
  subprotocol?: string;
  security?: string | string[];
  scopes?: string | string[];
  response?: Response;
}
