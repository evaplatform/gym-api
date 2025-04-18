import multer from 'multer';
import { s3 } from '../config/aws';
import multerS3 from 'multer-s3';
import { DeleteObjectCommand, ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';

const bucketName = process.env.AWS_BUCKET_NAME || 'meu-bucket-api';

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    cacheControl: 'no-cache, no-store, must-revalidate',
    // acl: 'public-read', // Permissão para leitura pública
    key: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});

export const findObject = async (fileKey: string) => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_BUCKET_NAME || 'meu-bucket-api',
  });

  try {
    const response = await s3.send(command);
    return response.Contents?.find((e) => e.Key === fileKey);
  } catch (error) {
    console.error('Erro ao listar os objetos:', error);
  }
};

export const findObjectByPrefix = async (fileKey: string) => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_BUCKET_NAME || 'meu-bucket-api',
    Prefix: fileKey, // Busca diretamente pelo caminho fornecido
  });

  try {
    const response = await s3.send(command);

    // Garante que o retorno verifica o fileKey exato
    return response.Contents?.find((e) => e.Key === fileKey);
  } catch (error) {
    console.error('Erro ao listar os objetos:', error);
    throw new Error('Erro ao buscar o arquivo no S3');
  }
};

// Function to delete an image from S3
export const deleteAWSFile = async (file: string, folder = 'photos') => {
  const fileKey = `public/${folder}/${file.split('/').pop() || ''}`;

  const object = await findObjectByPrefix(fileKey);
  if (!object) {
    throw new Error(`Arquivo ${fileKey} não encontrado no S3`);
  }

  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME || 'meu-bucket-api',
    Key: fileKey,
  });

  try {
    await s3.send(command);
    const object = await findObject(fileKey);

    if (object) throw new Error('Failed to delete image');
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
};

export const deleteAWSFileByFileKey = async (fileKeyTemp: string) => {
  const fileKey = `public/${fileKeyTemp}`;
  try {
    const object = await findObjectByPrefix(fileKey);
    if (!object) {
      throw new Error(`Arquivo ${fileKey} não encontrado no S3`);
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME || 'meu-bucket-api',
      Key: fileKey,
    });

    await s3.send(command); // Tenta deletar o arquivo
    console.log(`Arquivo ${fileKey} deletado com sucesso!`);
  } catch (error) {
    console.error('Erro ao deletar o arquivo:', error);
    throw new Error('Falha ao deletar o arquivo');
  }
};
