export interface IDatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface IJwtConfig {
  secret: string;
  expiresIn: number;
}

export interface IServer {
  port: number;
  host: string;
}

export interface IConfig {
  server: IServer;
  database: IDatabaseConfig;
  jwt: IJwtConfig;
}
