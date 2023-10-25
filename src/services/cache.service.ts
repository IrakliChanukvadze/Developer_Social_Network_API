import dotenv from 'dotenv';
import redis from 'redis';
import { logger } from '../libs/logger';
const client = redis.createClient();
dotenv.config();

export class CacheService {
  async getFromCache(id: number) {
    return new Promise((resolve, reject) => {
      client.get(`cv-${id}`, (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data));
      });
    });
  }

  async saveToCache(id: number, cv: any) {
    try {
      await client.set(`cv-${id}`, JSON.stringify(cv));
      logger.info(`CV with id: ${id} has been saved to Redis `);
    } catch (err) {
      logger.error(err);
    }
  }
  async clearCache(id: number) {
    client.del(`cv-${id}`);
    logger.info(`CV for user with id: ${id}, was deleted from redis`);
  }
}
