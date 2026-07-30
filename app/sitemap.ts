import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.chineapplescommunication.com';
  const routes = ['', '/deals', '/products', '/iphones', '/samsung', '/airpods', '/networking', '/accessories', '/contact'];

  return routes.map((route) => ({
    url: baseUrl + route,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}