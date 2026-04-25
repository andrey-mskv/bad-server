import { Request, Response, NextFunction } from 'express'
import { fileTypeFromBuffer, fileTypeFromFile } from 'file-type'

export const validateImage = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const file = req.file

    console.log('проверка изображения',req.file)

    if (!file) {
        return next()
    }

    // const type = await fileTypeFromBuffer(new Uint8Array(file.buffer))

    const type = await fileTypeFromFile(file.path)

    if (!type || !type.mime.startsWith('image/')) {
        return next(new Error('Неизвестный тип файла'))
    }

    next()
}
