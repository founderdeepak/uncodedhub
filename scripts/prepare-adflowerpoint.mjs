import fs from 'fs';
import path from 'path';

const targetDir = 'public/client/demo/assets/adflowerpoint';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const userUpload = 'C:/Users/LENOVO/.gemini/antigravity/brain/025bee06-55b1-43bb-8cf7-b95ff5b9ca86/.user_uploaded/media_1795280981006_dd997858.jpg';
if (fs.existsSync(userUpload)) {
  fs.copyFileSync(userUpload, path.join(targetDir, 'banner_poster.jpg'));
  console.log('Copied poster to banner_poster.jpg');
} else {
  console.log('User upload not found');
}
