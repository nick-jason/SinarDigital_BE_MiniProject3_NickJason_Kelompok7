import pkg from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import mysql from 'mysql2/promise';

const { PrismaClient } = pkg;

const connectionString = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/tpmbemini3kel7';
const url = new URL(connectionString);
const poolConfig = {
	host: url.hostname,
	port: url.port ? parseInt(url.port) : 3306,
	user: url.username || 'root',
	password: url.password || '',
	database: url.pathname.slice(1)
};

const pool = mysql.createPool(poolConfig);
const adapter = new PrismaMariaDb(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;