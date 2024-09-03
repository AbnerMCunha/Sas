import {open} from 'sqlite';
import sqlite3 from 'sqlite3';

export async function openDb(){
    return await open({
        filename: "./SasDB.db",
        driver: sqlite3.Database
    })
}