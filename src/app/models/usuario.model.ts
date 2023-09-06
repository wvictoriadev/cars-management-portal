export class Usuario {
  constructor(
    public userId: number,
    public username: string,
    public password?: string,
  ) {}
}
