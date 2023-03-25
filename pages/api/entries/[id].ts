import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data =
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: `El ${id} no es válido` })
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);

        default:
            return res.status(200).json({ message: `Método no existente` });
    }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.conect()

    const entryToUpdate = await Entry.findById(id)

    if (!entryToUpdate) {
        await db.disconect()
        return res.status(400).json({ message: `No hay entrada con ese ${id}` })
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;

    //runValidators para ver si el estado es uno de los que permitimos
    //new para que regrese la información actualizada
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
        await db.disconect()
        res.status(200).json(updatedEntry!)

    } catch (error) {
        await db.disconect()
        res.status(400).json({ message: 'bad request' })
    }


}

