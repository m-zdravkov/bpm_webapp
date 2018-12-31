export class BPMError implements Error {
  constructor (private message: string, private name: string, private stack: string) { }
}
