
import { interfaces } from "inversify";
import {IServerConfig} from "../../../configurations/interfaces";
import Configurations from "../../../configurations";


export default function(container: interfaces.Container) {
    //Configurations
    container.bind<IServerConfig>("IServerConfig").to(Configurations).inSingletonScope();

};