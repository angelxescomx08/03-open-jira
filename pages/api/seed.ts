import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { Entry } from '../../models'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No tiene acceso a este servicio' })
    }

    await db.conect()

    //Borrar las entradas anteriores
    await Entry.deleteMany()

    //Insertar nuevas entradas
    await Entry.insertMany(seedData.entries)

    await db.disconect()

    res.status(200).json({ message: 'Proceso realizado correctamente' })
}