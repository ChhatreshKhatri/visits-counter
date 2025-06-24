import { MetadataRoute } from 'next';
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://visits.chhatreshkhatri.com',
      lastModified: new Date(),
    }
  ];
}