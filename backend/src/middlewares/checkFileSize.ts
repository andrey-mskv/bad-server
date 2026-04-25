import { Request, Response, NextFunction } from 'express'

export const checkFileSize = (req: Request, _res: Response, next: NextFunction) => {
    const file = req.file

    if (!file) {
        return next()
    }

    const MIN_SIZE = 2 * 1024 // 2 KB

    if (file.size < MIN_SIZE) {
        return next(new Error('Минимальный размер файла 2 КБ.'))
    }

    next()
}
