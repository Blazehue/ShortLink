import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MousePointerClick, Users, TrendingUp, Link as LinkIcon } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const clicksData = [
  { date: "Jan 1", clicks: 120 },
  { date: "Jan 2", clicks: 180 },
  { date: "Jan 3", clicks: 150 },
  { date: "Jan 4", clicks: 220 },
  { date: "Jan 5", clicks: 280 },
  { date: "Jan 6", clicks: 240 },
  { date: "Jan 7", clicks: 300 },
];

const geoData = [
  { country: "USA", clicks: 450 },
  { country: "UK", clicks: 280 },
  { country: "Canada", clicks: 180 },
  { country: "Germany", clicks: 150 },
  { country: "France", clicks: 120 },
];

const deviceData = [
  { name: "Desktop", value: 620, color: "hsl(var(--chart-1))" },
  { name: "Mobile", value: 480, color: "hsl(var(--chart-2))" },
  { name: "Tablet", value: 180, color: "hsl(var(--chart-3))" },
];

const Analytics = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="font-sans text-4xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track your link performance and audience insights
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <MousePointerClick className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">1,890</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-success">↑ 12%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">1,280</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-success">↑ 8%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Click-through Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">67.8%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-success">↑ 3%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Links</CardTitle>
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">24</div>
                <p className="text-xs text-muted-foreground mt-1">
                  3 created this week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="font-sans">Clicks Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={clicksData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="font-sans">Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={geoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="country" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Bar dataKey="clicks" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="font-sans">Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="font-sans">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "2 minutes ago", location: "San Francisco, US", device: "📱 Mobile" },
                    { time: "15 minutes ago", location: "London, UK", device: "💻 Desktop" },
                    { time: "1 hour ago", location: "Toronto, CA", device: "📱 Mobile" },
                    { time: "2 hours ago", location: "Berlin, DE", device: "💻 Desktop" },
                    { time: "3 hours ago", location: "Paris, FR", device: "📱 Tablet" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{activity.location}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <span className="text-sm">{activity.device}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
