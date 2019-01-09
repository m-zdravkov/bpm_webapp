export class BPMError implements Error {
  constructor (public message: string, public name: string, public stack: string) { }
}
