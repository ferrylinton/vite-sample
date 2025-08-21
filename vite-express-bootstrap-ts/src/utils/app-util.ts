
import constant from '@/config/env-constant';
import { COOKIE_LOCALE, DEFAULT_LOCALE, LOCALES } from '@/config/i18n-config';
import { QueryParams } from '@/types/express-type';
import { Request, Response } from 'express';

export const COOKIE_VARIANT = 'variant';
export const DEFAULT_VARIANT = 'default';
export const VARIANTS = ['default', 'darkly'];

export const COOKIE_THEME = 'theme';
export const DEFAULT_THEME = 'light';
export const THEMES = ['light', 'dark']

export const initTheme = (req: Request<{}, {}, {}, QueryParams>,
	res: Response) => {

    if (req.query.theme && THEMES.includes(req.query.theme)) {
        res.cookie(COOKIE_THEME, req.query.theme, { maxAge: constant.APP_COOKIE_MAX_AGE, httpOnly: true });
        res.locals.theme = req.query.theme;
    }else if (req.cookies[COOKIE_THEME] === undefined) {
        res.cookie(COOKIE_THEME, DEFAULT_THEME, { maxAge: constant.APP_COOKIE_MAX_AGE, httpOnly: true });
        res.locals.theme = DEFAULT_THEME;
    } else {
        res.locals.theme = req.cookies[COOKIE_THEME];
    }

}

export const initVariant = (req: Request<{}, {}, {}, QueryParams>,
	res: Response) => {

    if (req.query.variant && VARIANTS.includes(req.query.variant)) {
        res.cookie(COOKIE_VARIANT, req.query.variant, { maxAge: constant.APP_COOKIE_MAX_AGE, httpOnly: true });
        res.locals.variant = req.query.variant;
    }else if (req.cookies[COOKIE_VARIANT] === undefined) {
        res.cookie(COOKIE_VARIANT, DEFAULT_VARIANT, { maxAge: constant.APP_COOKIE_MAX_AGE, httpOnly: true });
        res.locals.variant = DEFAULT_VARIANT;
    } else {
        res.locals.variant = req.cookies[COOKIE_VARIANT];
    }

}

export const initLocale = (req: Request<{}, {}, {}, QueryParams>,
	res: Response) => {

    if (req.query.locale && LOCALES.includes(req.query.locale)) {
        res.cookie(COOKIE_LOCALE, req.query.locale, { maxAge: constant.APP_COOKIE_MAX_AGE, httpOnly: true });
        res.locals.locale = req.query.locale;
    }else if (req.cookies[COOKIE_LOCALE] === undefined) {
        res.cookie(COOKIE_LOCALE, DEFAULT_LOCALE, { maxAge: constant.APP_COOKIE_MAX_AGE, httpOnly: true });
        res.locals.locale = DEFAULT_LOCALE;
    } else {
        res.locals.locale = req.cookies[COOKIE_LOCALE];
    }

}