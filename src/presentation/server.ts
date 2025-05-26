import express, { Router } from 'express';
import cookieParser from 'cookie-parser';

/**
 * interface que define las opciones para inicializar el servidor
 */
interface Options {
  port: number;
  routes: Router;
}

/**
 * Clase que representa un servidor Express configurable
 */
export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  /**
   * Crea una nueva instancia del servidor
   * @param options - Opciones para inicializar el servidor
   */
  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
  }

  /**
   * inicializa el servidor Express y lo pone a la escucha en el puerto especificado
   *
   * @example
   * ```ts
   * import express, { Router } from 'express';
   * import {Server} from './server';
   *
   * cosnt router = Router();
   * router.get('/',(req,res)=>{
   * 	res.send('Hello World!');
   * });
   *
   * const server = new Server({port:3000, routes: router})
   *
   * server.start()
   * ```
   */
  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
