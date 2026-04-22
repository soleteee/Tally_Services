const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const MONGODB_URI = "mongodb+srv://Tally-services-db:TallyServices%401234@tally-services.ikdgdfk.mongodb.net/?appName=Tally-Services";

async function fixIndexes() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const collection = mongoose.connection.collection('seos');
        
        // List indexes
        console.log('Fetching current indexes...');
        const indexes = await collection.indexes();
        console.log('Current indexes:', JSON.stringify(indexes, null, 2));

        const hasPageIndex = indexes.some(idx => idx.name === 'page_1');
        if (hasPageIndex) {
            console.log('Dropping stale index: page_1');
            await collection.dropIndex('page_1');
            console.log('Index dropped successfully');
        } else {
            console.log('Index page_1 not found. It may have already been dropped or never existed.');
        }

        // Check for other potentially stale indexes (e.g., if there's any other field named 'page')
        const otherStaleIndex = indexes.find(idx => idx.key && idx.key.page !== undefined && idx.name !== 'page_1');
        if (otherStaleIndex) {
            console.log(`Found another stale index: ${otherStaleIndex.name}. Dropping...`);
            await collection.dropIndex(otherStaleIndex.name);
            console.log(`Index ${otherStaleIndex.name} dropped.`);
        }

        console.log('Index cleanup complete.');
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    } catch (error) {
        console.error('Error fixing indexes:', error);
        process.exit(1);
    }
}

fixIndexes();
