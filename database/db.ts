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
        console.log('Ya estamos conectados');
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

    await mongoose.connect('')
    mongooConection.isConnected = 1
    console.log('Conectado a mongoDB', '');
}

export const disconect = async () => {
    if (mongooConection.isConnected !== 0) {
        return;
    }
    await mongoose.disconnect()
    console.log('Desconectando de mongoDB');
}