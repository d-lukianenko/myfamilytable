import { environment } from '../environments/environment';

export function cldUrl(publicId: string, w = 800): string {
  const cloud = environment.cloudinary.cloudName;
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_${w}/${publicId}`;
}
