import cron from 'node-cron';
import { RefreshTokens } from '../database';

cron.schedule('0 * * * *', async () => {
    await RefreshTokens().where('expiresAt', '<', new Date())
        .andWhere('updatedAt', '<', new Date(Date.now() - 6 * 60 * 60 * 1000)).delete();
});
