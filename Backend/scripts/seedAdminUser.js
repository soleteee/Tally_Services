const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const envFilePath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envFilePath)) {
    const rawEnvBuffer = fs.readFileSync(envFilePath);
    const isUtf16Le = rawEnvBuffer.length >= 2 && rawEnvBuffer[0] === 0xff && rawEnvBuffer[1] === 0xfe;
    const rawEnvText = isUtf16Le
        ? rawEnvBuffer.toString('utf16le')
        : rawEnvBuffer.toString('utf8');
    const parsedEnv = dotenv.parse(rawEnvText);
    Object.assign(process.env, parsedEnv);
}

const User = require('../src/models/User');

const run = async () => {
    const mongoUri = process.env.MONGODB_URI;
    const email = process.env.ADMIN_USER_EMAIL;
    const password = process.env.ADMIN_USER_PASSWORD;
    const rounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

    if (!mongoUri) {
        throw new Error('MONGODB_URI is required in environment variables');
    }

    if (!email || !password) {
        throw new Error('ADMIN_USER_EMAIL and ADMIN_USER_PASSWORD are required in environment variables');
    }

    await mongoose.connect(mongoUri);

    const normalizedEmail = email.toLowerCase().trim();
    const existingAdminUser = await User.findOne({ email: normalizedEmail });

    if (!existingAdminUser) {
        const hashedPassword = await bcrypt.hash(password, rounds);
        await User.create({
            email: normalizedEmail,
            password: hashedPassword,
            role: 'admin',
        });
        return;
    }

    const passwordMatched = await bcrypt.compare(password, existingAdminUser.password);
    if (!passwordMatched) {
        existingAdminUser.password = await bcrypt.hash(password, rounds);
    }

    if (existingAdminUser.role !== 'admin') {
        existingAdminUser.role = 'admin';
    }

    await existingAdminUser.save();
};

run()
    .catch((error) => {
        console.error(error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });
