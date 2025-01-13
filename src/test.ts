import * as fs from 'fs/promises';
import { join } from 'path';

const filePath = join(__dirname, '../dist/db/questions.json');

async function testFile() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    console.log('File content:', JSON.parse(data));
  } catch (error: any) {
    console.error('Error reading file:', error.message);
  }
}

testFile();
