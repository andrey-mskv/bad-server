import { Request, Response, NextFunction } from 'express'
import { fileTypeFromBuffer } from 'file-type'

export const validateImage = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const file = req.file

    if (!file) {
        return next()
    }

    const type = await fileTypeFromBuffer(new Uint8Array(file.buffer))

    if (!type || !type.mime.startsWith('image/')) {
        return next(new Error('Invalid image file'))
    }

    next()
}
