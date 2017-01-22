import "reflect-metadata";
import { Container } from "inversify";

const env = process.env.NODE_ENV || "dev";
var container = new Container();

//Register ioc
require(`./inversify.${env}.config`).default(container);

export default container;