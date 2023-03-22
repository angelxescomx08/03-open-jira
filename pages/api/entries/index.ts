import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'

type Data =
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res)
        case 'POST':
            return postEntrie(req, res)
        default:
            res.status(400).json({ message: 'Endpoint no existe' })
    }
}

const getEntries = async (res: NextApiResponse<Data>) => {
    await db.conect()

    const entries = await Entry.find().sort({ createdAt: 'ascending' })

    await db.disconect()

    return res.status(200).json(entries)
}

const postEntrie = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { description = '' } = req.body;

    const newEntrie = new Entry({
        description,
        createdAt: Date.now()
    })

    try {
        await db.conect()

        await newEntrie.save()

        await db.disconect()

        res.status(200).json(newEntrie)
    } catch (error) {
        await db.disconect()
        console.log(error);
        res.status(500).json({ message: 'Algo salió mal al crear la entrada' })
    }


}