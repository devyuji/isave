/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractIDFromInstagramURL } from '$lib/utils/extractIdFromInstagramUrl';
import { openDB, type IDBPDatabase } from 'idb';

export interface SavedToDB {
	id: string;
	username: string;
	data: any;
	url: string;
	cover: string;
	timestamp: number;
}

class IndexDB {
	dbName = 'isave-cache';
	dbVersion = 2;
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
				upgrade: (db, oldVersion, newVersion, transaction) => {
					switch (oldVersion) {
						case 0:
							if (!db.objectStoreNames.contains('cache')) {
								const objectStore = db.createObjectStore('cache', { keyPath: 'id' });
								objectStore.createIndex('username', 'username', { unique: false });
								objectStore.createIndex('url', 'url', { unique: false });
								objectStore.createIndex('data', 'data', { unique: false, multiEntry: true });
								objectStore.createIndex('cover', 'cover', { unique: false });
							}

						// eslint-disable-next-line no-fallthrough
						case 1: {
							const objectStore = transaction.objectStore('cache');

							if (!objectStore.indexNames.contains('timestamp')) {
								objectStore.createIndex('timestamp', 'timestamp', { unique: true });
							}

							console.log('upgraded to version 2');
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
		if (!this.db) throw new Error('db.not.found');

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

		// trim the data
		const allData = await this.getAll();

		const lengthOfAllData = allData.length;

		if (lengthOfAllData <= 10) return;

		// Descending Order
		allData.sort((a, b) => a.timestamp - b.timestamp);

		await this.db.delete('cache', allData[0].id);
	}

	async check(url: string): Promise<boolean> {
		if (!this.db) return false;

		const id = extractIDFromInstagramURL(url);

		const value = await this.db.get('cache', id);

		return value ? true : false;
	}

	async get(id: string): Promise<SavedToDB> {
		if (!this.db) throw new Error('db.not.found');

		const value = await this.db.get('cache', id);

		if (!value) throw new Error('no.data.found');

		return value;
	}

	async getAll(): Promise<SavedToDB[]> {
		if (!this.db) return [];

		const value: SavedToDB[] = await this.db.getAll('cache');

		if (value.length < 1) return [];

		value.sort((a, b) => a.timestamp - b.timestamp);

		return value;
	}

	private cleanData<T>(data: T) {
		return JSON.parse(JSON.stringify(data));
	}
}

const idb = new IndexDB();

export default idb;
