import { FC } from 'react';

export type IColors =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| 'dark'
	| 'light'
	| 'link';

export type IColorsLight =
	| 'light-primary'
	| 'light-secondary'
	| 'light-success'
	| 'light-danger'
	| 'light-warning'
	| 'light-info'
	| 'light-dark'
	| 'light-light'
	| 'light-link';

export type ISizes = 'lg' | 'md' | 'sm';

export interface IObject {
	[key: string]: string | number | boolean | any;
}

export interface IMetaSort {
	field?: string;
	order?: 'asc' | 'desc';
}

export interface IMeta {
	page?: number;
	prevOffset?: number;
	nextOffset?: number;
	limit?: number;
	totalRecords?: number;
	resultCount?: number;
	totalPageCount?: number;
	sort?: Array<IMetaSort>;
}

export interface IAppRoutes {
	link: string;
	element?: FC;
	params?: IObject;
	childrens?: IAppRoutes[];
	redirect?: string;
	isPrivate?: boolean;
	routeKey?: string;
}

export interface IFile {
	bucketName?: string;
	filePath?: string;
	fileName?: string;
	fileType: string;
	originalFileName?: string;
	previewUrl: string;
	isDeleted?: boolean;
}

export interface IMetaKeyResponse {
	id: string;
	titleEn: string;
	titleBn: string;
	metaTypeEn: string;
	metaTypeBn: string;
	metaKey: string;
	isDefault: boolean;
	serial: number;
	isActive: boolean;
}

export interface IRequestPayload {
	meta: IMeta;
	body?: IObject;
}

export interface IAPIResponse {
	timestamp: number;
	status: number;
	message?: string;
	fieldErrors: string[] | string;
	error: any;
	header: any;
	meta: IMeta;
	body: IObject | IObject[] | string | number | boolean;
}
