class ConfigService {
    getByKey(key: string) {
        if (process.env.NODE_ENV === 'test' && !key.includes('TEST')) {
            return '';
        }
        const value = process.env[key];
        if (!value) {
            throw new Error(`Environment variable is missing, Key: ${key}`)
        }
        return value;
    }
}

const configService = new ConfigService();

export default configService;
