import { Cleanup } from "./Cleanup";

export interface Initializable {
    initialize(): Promise<void | Cleanup> | Cleanup;
}