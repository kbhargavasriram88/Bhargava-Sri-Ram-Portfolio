  import { getTestimonials } from "@/actions/testimonials";
import { TestimonialTable } from "@/components/admin/TestimonialTable";
import { TestimonialDialog } from "@/components/admin/TestimonialDialog";

export default async function AdminTestimonials() {
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-muted-foreground mt-2">Manage client, colleague, and mentor reviews.</p>
        </div>
        <TestimonialDialog />
      </div>

      <TestimonialTable testimonials={testimonials} />
    </div>
  );
}
