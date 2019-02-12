import { Response } from 'express';

const NO_CACHE = 'private, max-age=0, no-cache';
const PUBLIC_CACHE = 'public, max-age=';
const CACHE_CONTROL = 'Cache-Control';

/**
 * Set response Cache-Control
 * @maxage integet in minutes
 */
export function maxage(res: Response, maxage: number) {
	// maxage = 0;
	var cache = NO_CACHE;
	if (maxage > 0) {
		cache = PUBLIC_CACHE + (maxage * 60);
	}
	res.set(CACHE_CONTROL, cache);
}

export function maxageTopic(res: Response) {
	maxage(res, 60 * 1);
}


export function maxageRedirect(res: Response) {
	maxage(res, 60 * 12);
}

export function maxageIndex(res: Response) {
	maxage(res, 60);
}

export function maxageSearch(res: Response) {
	maxage(res, 60 * 2);
}

export function maxageHelp(res: Response) {
	maxage(res, 60 * 6);
}

export function maxageApi(res: Response) {
	maxage(res, 0);
}

export function startWithUpperCase(target: string) {
	if (target) {
		return target[0].toUpperCase() + target.substr(1);
	}
	return target;
}

export async function mapPromise<T, R>(keys: T[], callback: (key: T) => Promise<R>):
    Promise<Map<T, R>> {
    const tasks = keys.map(key => callback(key).then(result => ({ key, result })));

    const results = await Promise.all(tasks);
	const response: Map<T, R> = new Map();
	for (let item of results) {
		response.set(item.key, item.result);
	}
	return response;
}
