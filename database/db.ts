import mongoose from "mongoose";

/**
 * 0 = disconected
 * 1 = conected
 * 2 = conecting
 * 3 = disconecting
 */

const mongooConection = {
    isConnected: 0
}

export const conect = async () => {
    if (mongooConection.isConnected === 1) {
        console.log('Ya estabamos conectados');
        return;
    }

    if (mongoose.connections.length > 0) {
        mongooConection.isConnected = mongoose.connections[0].readyState;

        if (mongooConection.isConnected === 1) {
            console.log("Usando conexión anterior");
            return;
        }

        await mongoose.disconnect()
    }

    await mongoose.connect(process.env.MONGO_URL || '')
    mongooConection.isConnected = 1
    console.log('Conectado a mongoDB', process.env.MONGO_URL);
}

export const disconect = async () => {

    if (process.env.NODE_ENV === 'development') return;

    if (mongooConection.isConnected === 0) {
        return;
    }
    await mongoose.disconnect()
    console.log('Desconectando de mongoDB');
}