import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export const CloudinaryConfig = {
  provide: 'Cloudinary',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dp4tp9gwa',
      api_key: '774542943245931',
      api_secret: 'mbwq5AMRewXo8Fo8ENBXrJRbjFE',
    });
  },
};
