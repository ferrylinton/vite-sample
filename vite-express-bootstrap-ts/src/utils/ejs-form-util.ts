import { APP_PATH } from '@/config/app-constant';
import { logger } from '@/config/winston-config';
import ejs from 'ejs';
import { join } from 'path';


const InputText = join(APP_PATH, "views", "partials", "input-text.ejs");

export const getInputText = (id: string, data: ejs.Data): Promise<string> => {
    console.log(data);
    data.id = id;
    data.value = data[id] || '';
    data.maxlength = data.maxlength || 100;
    data.errorValidations = data.errorValidations || {};
    data.clazz = data.clazz || 'form-control';
    data.clazz = data.clazz + (data.errorValidations[id] ? ' is-invalid' : '');

    return new Promise((resolve, _reject) => {
        ejs.renderFile(InputText, data, (err, html) => {
            if (err) {
                logger.error(err);
                resolve(`<div class="mb-3 p-2 text-bg-danger">Error at input-text.ejs</div>`)
            } else {
                resolve(html);
            }
        })
    });
}

export const autofocus = "autofocus";

export const inputTextData = (id: string, data: ejs.Data = {}) => {
    data.id = id;
    data.value = data[id] || '';
    data.maxlength = data.maxlength || 100;
    data.errorValidations = data.errorValidations || {};
    data.clazz = data.clazz || 'form-control';
    data.clazz = data.clazz + (data.errorValidations[id] ? ' is-invalid' : '');
    data.hasError = data.errorValidations[id] ? true : false;
    data.autofocus = data.autofocus || '';

    return data;
}

export const checboxData = (id: string, data: ejs.Data = {}) => {
    data.id = id;
    data.checked = data[id] ? 'checked' : '';

    return data;
}