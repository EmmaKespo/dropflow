import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseProductionDomain = 'https://vercel.app'; // Swap with your live Vercel web address

  return [
    {
      url: baseProductionDomain,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // Tells crawlers the home landing page form is the highest entry point
    },
    {
      url: `${baseProductionDomain}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseProductionDomain}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
