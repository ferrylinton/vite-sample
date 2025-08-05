import i18n from 'i18n';
import path from 'path';
import { Request, Response, NextFunction, Express } from 'express';
import { QueryParams } from '@/types/express-type';
import constant from '@/config/constant';

const BASE_FOLDER = constant.NODE_ENV === 'production' ? path.resolve(process.cwd()) : path.resolve(process.cwd(), 'src');

i18n.configure({
    locales: ['id', 'en'],
    defaultLocale: 'id',

    // change 'accept-language' because browser always send 'accept-language'
    // Accept-Language: en-US,en;q=0.9 , depend on your browser setting
    header: 'x-accept-language',
    queryParameter: 'lang',
    cookie: 'locale',

    directory: path.join(BASE_FOLDER, 'locales'),
    autoReload: true,
    updateFiles: false,
    syncFiles: false,
    api: {
        __: 't',
        __n: 'tn'
    },
});

export const i18nConfig = (app: Express) => {
    app.use(i18n.init);

    app.use((
        req: Request<{}, {}, {}, QueryParams>,
        res: Response,
        next: NextFunction) => {

        if (req.cookies.locale === undefined) {
            res.cookie('locale', req.getLocale(), { maxAge: 900000, httpOnly: true });
        }

        if (req.query.lang) {
            i18n.setLocale(req.query.lang);
            res.cookie('locale', req.getLocale(), { maxAge: 900000, httpOnly: true });
        }

        next();
    });
};
