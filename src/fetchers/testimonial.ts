import { Testimonial } from '../utils/types';

export async function getTestimonials(): Promise<Testimonial[] | undefined> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_ADMIN_URL}/api/testimonials`
    );
    return (await response.json()).data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return;
  }
}
