import sharp from 'sharp';

// eslint-disable-next-line require-jsdoc
export async function resize(img, width, height) {
  const buffer = await sharp(Buffer.from(img.data, 'base64'))
      .resize(width || null, height || null)
      .toBuffer();
  const resizedImageData = buffer.toString('base64');
  return `data:${img.contentType};base64,${resizedImageData}`;
}
