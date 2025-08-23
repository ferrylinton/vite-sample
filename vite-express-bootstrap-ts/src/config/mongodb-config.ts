import constant from '@/config/env-constant';
import {
	ConnectionPoolMonitoringEvent,
	Db,
	type Document,
	MongoClient,
	type MongoClientOptions,
	type TransactionOptions,
} from 'mongodb';
import { serverLogger } from '@/config/winston-config';

const mongoClientOptions: MongoClientOptions = {
	authMechanism: 'DEFAULT',
	authSource: constant.MONGODB_AUTH_SOURCE,
	monitorCommands: true,
	connectTimeoutMS: 15000,
	socketTimeoutMS: 15000,
	auth: {
		username: constant.MONGODB_USERNAME,
		password: constant.MONGODB_PASSWORD,
	},
};

export const transactionOptions: TransactionOptions = {
	readConcern: { level: 'snapshot' },
	writeConcern: { w: 'majority' },
	readPreference: 'primary',
};

/**
 * @type {Promise<MongoClient>}
 */
let mongoClient: Promise<MongoClient>;

const log = (event: ConnectionPoolMonitoringEvent) => {
	try {
		serverLogger.info(
			JSON.stringify(event, (_, v) => (typeof v === 'bigint' ? v.toString() : v))
		);
	} catch (error) {
		serverLogger.error(error);
	}
};

const getMongoClientInstance = () => {
	const instance = new MongoClient(constant.MONGODB_URL, mongoClientOptions);

	instance.on('connectionPoolCreated', log);

	instance.on('connectionPoolReady', log);

	instance.on('connectionCreated', log);

	instance.on('connectionClosed', log);

	return instance;
};

export const getMongoClient = async () => {
	if (mongoClient) {
		return mongoClient;
	} else {
		try {
			mongoClient = getMongoClientInstance().connect();
		} catch (error) {
			serverLogger.error(error);
		}

		return mongoClient;
	}
};

export const getDb = async () => {
	const connection = await getMongoClient();
	return connection.db(constant.MONGODB_DATABASE);
};

export const getCollection = async <TSchema extends Document = Document>(name: string, db?: Db) => {
	if (db) {
		return db.collection<TSchema>(name);
	} else {
		const db = await getDb();
		return db.collection<TSchema>(name);
	}
};
