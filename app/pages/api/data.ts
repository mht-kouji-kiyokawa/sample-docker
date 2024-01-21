import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// データベース接続設定
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
};

// データベースからデータを取得する非同期関数
async function getData() {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute('SELECT * FROM mytable');
  await connection.end();
  return rows;
}

// APIルートのハンドラー関数
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data' });
  }
}
