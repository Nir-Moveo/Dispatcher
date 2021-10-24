import * as _ from 'lodash';

export function cleanObject(doc: any) {
    var obj = doc;
    delete obj.__v;
    // delete obj.createdAt
    delete obj.updatedAt;
    return obj;
}

export function replaceDotWithUnderscore(obj: any) {
    _.forOwn(obj, (value, key) => {
        // if key has a period, replace all occurences with an underscore
        if (_.includes(key, '.')) {
            const cleanKey = _.replace(key, /\./g, '_');
            obj[cleanKey] = value;
            delete obj[key];
        }

        // continue recursively looping through if we have an object or array
        if (_.isObject(value)) {
            return replaceDotWithUnderscore(value);
        }
    });
    return obj;
}
