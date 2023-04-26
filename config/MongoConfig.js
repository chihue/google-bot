import { MongoClient, Db } from 'mongodb'

let db;

export async function MongoConfig() {
    const MONGOURI = process.env.MONGOURI;
    const MONGODATABASE = process.env.MONGODATABASE;

    if (!MONGOURI || !MONGODATABASE) {
        throw new Error('No URI or Database provided');
    }

    try {
        const client = new MongoClient(MONGOURI);
        const conexion = await client.connect();

        const mongoDB = conexion.db(MONGODATABASE);

        if (mongoDB) {
            console.log("    ✅ MongoDB");
            db = mongoDB;
        } else {
            console.log("    ❌ MongoDB");
        }
    } catch (err) {
        console.log(err);
        console.log("    ❌ MongoDB error");
    };

}

export const collections = Object.freeze({
    USERS: 'users',
})

export function getCollection(collection) {
    return db.collection(collection);
};