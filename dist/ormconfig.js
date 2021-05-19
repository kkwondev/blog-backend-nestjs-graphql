"use strict";
const config = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: 'root',
    password: 'tidl9662',
    database: 'klog',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migration/*.js'],
    cli: {
        migrationsDir: 'migration',
    },
    synchronize: false,
};
module.exports = config;
//# sourceMappingURL=ormconfig.js.map