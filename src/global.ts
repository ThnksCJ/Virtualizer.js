import {Logger} from 'sitka';

export namespace logger {
    export const global = Logger.getLogger({name: "GLOBAL", format: '[${LEVEL}] [${NAME}] ${MESSAGE}'});
    export const virt = Logger.getLogger({name: "VIRTUALIZER", format: '[${LEVEL}] [${NAME}] ${MESSAGE}'});
}