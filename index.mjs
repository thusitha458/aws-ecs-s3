import 'dotenv/config';

import { ListObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({ region: process.env.REGION });

const readCommand = new ListObjectsCommand({ Bucket: process.env.S3_READ_BUCKET });

client.send(readCommand).then((listResponse) => {
    if (listResponse?.Contents?.length) {
        const writeCommand = new PutObjectCommand({
            Key: new Date().toISOString(), 
            Bucket: process.env.S3_WRITE_BUCKET,
            Body: listResponse?.Contents?.length?.toString(),
        });
        client.send(writeCommand).catch((error) => {
            console.log("write failed:", error.message);
        });
    } 
}).catch((error) => {
    console.log("read failed:", error?.message);
});