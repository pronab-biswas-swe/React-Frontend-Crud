import { IObject, IRequestPayload } from '@interface/common.interface';
import { isObjectNull } from './check-validation';

export const objectTrim = (object: IObject) => {
	if (object instanceof Object)
		return Object.keys(object).forEach(
			(key) => (object[key] = typeof object[key] === 'string' ? object[key].trim() : object[key])
		);
	return;
};

export const searchParamsToObject = (searchParams: any) => {
	// It will take useSearchParams (resct-router-dom) and return an object of query params
	let params: IObject = {};
	searchParams.forEach(
		(item: string, key: string) =>
			item !== '' && item !== 'null' && item !== 'undefined' && (params[key] = item)
	);
	return params;
};

type ISearchParamsToRequestBodyOptions = {
	multiFields?: Array<string>;
};

export const searchParamsToRequestBody = (
	searchObj: any,
	currentBody?: IObject,
	options?: ISearchParamsToRequestBodyOptions
): IRequestPayload => {
	searchObj = searchParamsToObject(searchObj);
	const bodyIgnore = ['page', 'limit'];
	const body: IObject = {};
	Object.keys(searchObj)?.forEach((obj) => {
		if (!bodyIgnore.includes(obj)) {
			body[obj] =
				searchObj[obj].toLowerCase() === 'true'
					? true
					: searchObj[obj].toLowerCase() === 'false'
					? false
					: options?.multiFields?.includes(obj)
					? searchObj[obj]?.split(',')
					: searchObj[obj];
		}
	});
	const reqBody: IRequestPayload = {
		meta: {
			page: +searchObj?.page || 0,
			limit: +searchObj?.limit || currentBody?.meta?.limit || 10,
			sort: currentBody?.meta?.sort || [],
		},
		body,
	};
	return reqBody;
};

export const makeBoolean = (cData: IObject) => {
	let data = { ...cData };
	Object.keys(data).forEach(
		(d) =>
			(data[d] =
				data[d] === 'true' ? true : data[d] === 'false' ? false : data[d] === 'null' ? null : data[d])
	);
	return data;
};

export const removeObjectEmptyProperty = (obj: IObject, removeEmptyObj: boolean = false) => {
	let params: IObject = {};
	const removable = ['', 'null', 'undefined', null, undefined];
	Object.keys(obj || {}).forEach((key: string) => {
		if (removeEmptyObj && obj[key] instanceof Object) {
			if (!isObjectNull(obj[key])) params[key] = obj[key];
			else return;
		}
		if (!removable.includes(obj[key])) params[key] = obj[key];
	});
	return params;
};

export const makeFormData = (reqData: IObject) => {
	let data = { ...reqData };
	const fd = new FormData();
	Object.keys(data).forEach((key) => {
		if (data[key] instanceof File) {
			fd.append(key, data[key]);
			delete data[key];
		} else if (data[key] instanceof FileList) {
			for (const k of Object.keys(data[key])) fd.append(key, data[key][k]);
			delete data[key];
		}
	});
	fd.append('body', JSON.stringify(data));
	return fd;
};

export const getResponseValue = (resp: IObject) => (resp?.status === 'fulfilled' ? resp?.value?.body : []);

