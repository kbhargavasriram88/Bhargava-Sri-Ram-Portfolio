import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, FolderGit2, MessageSquare } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import ContactMessage from "@/models/ContactMessage";
import Analytics from "@/models/Analytics";

export default async function AdminDashboard() {
  await dbConnect();

  const [projectsCount, unreadMessages, recentAnalytics] = await Promise.all([
    Project.countDocuments(),
    ContactMessage.countDocuments({ read: false }),
    Analytics.find().sort({ date: -1 }).limit(7),
  ]);

  const totalPageViews = recentAnalytics.reduce((acc, curr) => acc + curr.pageViews, 0);

  const stats = [
    { title: "Total Projects", value: projectsCount.toString(), icon: FolderGit2 },
    { title: "Unread Messages", value: unreadMessages.toString(), icon: MessageSquare },
    { title: "7-Day Page Views", value: totalPageViews.toString(), icon: Activity },
    { title: "Total Visitors", value: "—", icon: Users }, // Mocked or implement later
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-2">Welcome back. Here is a summary of your portfolio.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2 flex items-center justify-center min-h-[300px] text-muted-foreground border-t">
            Analytics Chart Placeholder (Implement Recharts)
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {/* Quick action buttons can go here */}
             <div className="text-sm text-muted-foreground">Add Project</div>
             <div className="text-sm text-muted-foreground">View Messages</div>
             <div className="text-sm text-muted-foreground">Update Resume</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
