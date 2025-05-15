import { DataSource } from 'typeorm';
import { User } from './models/user.model';
import { PetPost } from './models/pet-post.model';

/**
 * interface que define las opciones para hacer la conexion a la base de datos
 */
interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

/**
 * Clase para gestionar la conexión a la base de datos PostgresSQL utilizando TypeORM.
 *
 * @remarks
 * Esta clase se encarga de crear una conexión a la base de datos PostgresSQL utilizando TypeORM.
 *
 * la conexióm se configura para sincronizqr la base de datos y utilizar ssl con rechazo de certificado no autorizado, en desarrollo.
 *
 * @example
 * ``` typescript
 * cosnt postgres = new PostgresDatabase({
 *   host: 'localhost',
 *   port: 5432,
 *   username: 'user',
 *   password: 'password',
 *   database: 'database',
 * });
 *
 * await postgres.connect();
 * ```
 */
export class PostgresDatabase {
  public datasource: DataSource;

  /**
   *
   * Crea una instancia de la clase PostgresDatabase
   *
   * @params options - Objeto que contiene la configuración de la conexión a la base de datos.
   * @param options.host - Host de la base de datos.
   * @param options.port - Puerto de la base de datos.
   * @param options.username - Nombre de usuario de la base de datos.
   * @param options.password - Contraseña de la base de datos.
   * @param options.database - Nombre de la base de datos.
   */
  constructor(options: Options) {
    this.datasource = new DataSource({
      type: 'postgres',
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      entities: [User, PetPost],
      synchronize: true, // automatically create database schema
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  /**
   * * Conecta a la base de datos PostgresSQL.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando la conexión se ha establecido correctamente.
   * @throws {Error} - Si ocurre un error al intentar conectar a la base de datos.
   */

  async connect() {
    try {
      await this.datasource.initialize();
      console.log('Postgres database connected successfully 👌.');
    } catch (error) {
      console.error(error);
    }
  }
}
