import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, BarChart, DollarSign, Flag, ImageIcon, Users } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,453</div>
            <p className="text-xs text-muted-foreground">+2,464 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Artworks</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">+5,647 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$84,429.89</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">12 require attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Platform Overview</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>User and content growth over the last 12 months.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BarChart className="h-8 w-8" />
                <span>Growth chart visualization would appear here</span>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Artists</CardTitle>
                <CardDescription>Artists with the most sales this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Elena Rivera", sales: 42, revenue: "$12,546" },
                    { name: "Marcus Chen", sales: 38, revenue: "$10,892" },
                    { name: "Sophia Johnson", sales: 31, revenue: "$9,475" },
                  ].map((artist, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{artist.name}</p>
                        <p className="text-sm text-muted-foreground">{artist.sales} sales</p>
                      </div>
                      <p className="font-medium">{artist.revenue}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
                <CardDescription>Most active art categories this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Abstract", artworks: 1245, growth: "+12%" },
                    { name: "Digital Art", artworks: 856, growth: "+18%" },
                    { name: "Photography", artworks: 642, growth: "+5%" },
                  ].map((category, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-muted-foreground">{category.artworks} artworks</p>
                      </div>
                      <p className="text-green-500">{category.growth}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="moderation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Moderation Queue</CardTitle>
              <CardDescription>Content that requires review.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "Artwork",
                    title: "Untitled #45",
                    reason: "Potentially inappropriate content",
                    urgency: "High",
                  },
                  { type: "Comment", title: "On 'Urban Landscape'", reason: "Reported as spam", urgency: "Medium" },
                  { type: "User", title: "user123", reason: "Multiple violations", urgency: "High" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <p className="font-medium">
                          {item.type}: {item.title}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">Reason: {item.reason}</p>
                    </div>
                    <div
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.urgency === "High"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                      }`}
                    >
                      {item.urgency}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Reports</CardTitle>
              <CardDescription>Reports submitted by users in the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>User reports visualization would appear here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
