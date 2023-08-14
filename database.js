import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    user: 'nikita.persyanov',
    password: 'OZvdqPSfmb65',
    host: 'ep-falling-thunder-22737386-pooler.eu-central-1.aws.neon.tech',
    port: 5432,
    database: 'neondb',
    ssl: { rejectUnauthorized: false }
});


export default pool



