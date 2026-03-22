/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractIDFromInstagramURL } from '$lib/utils/extractIdFromInstagramUrl';
import { openDB, type IDBPDatabase } from 'idb';

interface SavedToDB {
	id: string;
	username: string;
	data: any;
	url: string;
	cover: string;
}

class IndexDB {
	dbName = 'isave-cache';
	dbVersion = 1;
	loading = $state(true);

	db: IDBPDatabase | null = null;

	async init() {
		if (!('indexedDB' in window)) {
			// Can't use IndexedDB
			console.log("This browser doesn't support IndexedDB");

			return;
		}

		if (!this.loading) return;

		try {
			this.db = await openDB(this.dbName, this.dbVersion, {
				upgrade: (db, oldVersion) => {
					switch (oldVersion) {
						case 1:
							if (!db.objectStoreNames.contains('cache')) {
								const objectStore = db.createObjectStore('cache', { keyPath: 'id' });
								objectStore.createIndex('username', 'username', { unique: false });
								objectStore.createIndex('data', 'data', { unique: false, multiEntry: true });
								objectStore.createIndex('cover', 'cover', { unique: false });
							}

							if (!db.objectStoreNames.contains('cache-list')) {
								db.createObjectStore('cache-list', { keyPath: 'id' });
							}
							break;

						default:
							if (!db.objectStoreNames.contains('cache')) {
								const objectStore = db.createObjectStore('cache', { keyPath: 'id' });
								objectStore.createIndex('username', 'username', { unique: false });
								objectStore.createIndex('url', 'url', { unique: false });
								objectStore.createIndex('data', 'data', { unique: false, multiEntry: true });
								objectStore.createIndex('cover', 'cover', { unique: false });
							}

							if (!db.objectStoreNames.contains('cache-list')) {
								db.createObjectStore('cache-list', { keyPath: 'id' });
							}
					}

					console.log('database created');
				}
			});
		} catch (err) {
			console.error('unable to open database - ', err);
		}

		this.loading = false;
	}

	async add(data: SavedToDB) {
		if (!this.db) throw new Error('db not found');

		// check if it is already present or not
		const value = await this.db.get('cache-list', data.id);

		if (value) return;

		const ccList = {
			id: data.id
		};

		await this.db.add('cache-list', ccList);

		const tx = this.db.transaction('cache', 'readwrite');

		tx.onabort = function (event: any) {
			const error = event.target!.error; // DOMException
			if (error.name == 'QuotaExceededError') {
				alert('memorry full');
			}
		};

		await Promise.all([
			tx.store.add({
				...this.cleanData(data)
			}),
			tx.done
		]);
	}

	async check(url: string): Promise<boolean> {
		if (!this.db) return false;

		const id = extractIDFromInstagramURL(url);

		const value = await this.db.get('cache-list', id);

		return value ? true : false;
	}

	async get(id: string): Promise<SavedToDB> {
		if (!this.db) throw new Error('db.not.found');

		const value = await this.db.get('cache', id);

		if (!value) throw new Error('no.data.found');

		return value;
	}

	private cleanData<T>(data: T) {
		return JSON.parse(JSON.stringify(data));
	}
}

const idb = new IndexDB();

export default idb;
