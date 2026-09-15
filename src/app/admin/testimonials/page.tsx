import { getTestimonials } from "@/actions/testimonials";
import { getProjects } from "@/actions/projects";
import { TestimonialTable } from "@/components/admin/TestimonialTable";
import { TestimonialDialog } from "@/components/admin/TestimonialDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Star, Heart } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminTestimonials() {
  const [testimonials, projects] = await Promise.all([
    getTestimonials(),
    getProjects()
  ]);

  const totalReviews = testimonials?.length || 0;
  const clientReviews = (testimonials || []).filter((t: any) => t.type === "Client").length;
  const ratings = (testimonials || []).map((t: any) => Number(t.rating) || 5);
  const avgRating = ratings.length > 0 
    ? (ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length).toFixed(1) 
    : "5.0";
  const positiveReviews = ratings.filter((r: number) => r >= 4).length;
  const satisfaction = ratings.length > 0 
    ? `${Math.round((positiveReviews / ratings.length) * 100)}%` 
    : "100%";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-muted-foreground mt-2">Manage client, colleague, and mentor reviews.</p>
        </div>
        <TestimonialDialog />
      </div>

      {/* Live Calculated Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-emerald-500/20 bg-muted/20">
          <CardContent className="p-5 flex flex-col items-center justify-center text-center">
            <Users className="w-6 h-6 text-emerald-400 mb-2" />
            <span className="text-2xl font-bold text-foreground">{totalReviews}+</span>
            <p className="text-xs text-muted-foreground mt-0.5">Happy Clients ({clientReviews} Verified)</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-500/20 bg-muted/20">
          <CardContent className="p-5 flex flex-col items-center justify-center text-center">
            <CheckCircle className="w-6 h-6 text-emerald-400 mb-2" />
            <span className="text-2xl font-bold text-foreground">{projects?.length || 0}+</span>
            <p className="text-xs text-muted-foreground mt-0.5">Projects Completed</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-500/20 bg-muted/20">
          <CardContent className="p-5 flex flex-col items-center justify-center text-center">
            <Star className="w-6 h-6 text-emerald-400 mb-2" />
            <span className="text-2xl font-bold text-foreground">{avgRating}</span>
            <p className="text-xs text-muted-foreground mt-0.5">Average Rating</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-500/20 bg-muted/20">
          <CardContent className="p-5 flex flex-col items-center justify-center text-center">
            <Heart className="w-6 h-6 text-emerald-400 mb-2" />
            <span className="text-2xl font-bold text-foreground">{satisfaction}</span>
            <p className="text-xs text-muted-foreground mt-0.5">Client Satisfaction</p>
          </CardContent>
        </Card>
      </div>

      <TestimonialTable testimonials={testimonials} />
    </div>
  );
}
