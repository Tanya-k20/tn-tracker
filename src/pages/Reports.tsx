import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { 
  Download, 
  Filter, 
  TrendingUp, 
  Users, 
  FolderOpen, 
  CheckSquare,
  Calendar,
  BarChart3
} from "lucide-react";

const Reports = () => {
  const [dateRange, setDateRange] = useState("last-30-days");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");

  // Sample data
  const projectProgress = [
    { name: "Tourism Portal", completed: 75, total: 100, pending: 25 },
    { name: "Heritage Sites", completed: 45, total: 80, pending: 35 },
    { name: "District Tool", completed: 95, total: 100, pending: 5 },
    { name: "Cultural Events", completed: 30, total: 70, pending: 40 },
  ];

  const taskStatusData = [
    { name: "Completed", value: 45, color: "hsl(var(--chart-1))" },
    { name: "In Progress", value: 30, color: "hsl(var(--chart-2))" },
    { name: "Pending", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Blocked", value: 5, color: "hsl(var(--chart-4))" },
  ];

  const weeklyProgress = [
    { week: "Week 1", tasksCompleted: 12, tasksCreated: 15 },
    { week: "Week 2", tasksCompleted: 18, tasksCreated: 20 },
    { week: "Week 3", tasksCompleted: 25, tasksCreated: 22 },
    { week: "Week 4", tasksCompleted: 30, tasksCreated: 28 },
  ];

  const teamProductivity = [
    { name: "Arjun Kumar", completedTasks: 24, totalTasks: 28, efficiency: 86 },
    { name: "Priya Sharma", completedTasks: 32, totalTasks: 35, efficiency: 91 },
    { name: "Raj Patel", completedTasks: 28, totalTasks: 30, efficiency: 93 },
    { name: "Meera Rajan", completedTasks: 22, totalTasks: 26, efficiency: 85 },
  ];

  const districtProgress = [
    { district: "Chennai", projects: 8, completion: 78 },
    { district: "Coimbatore", projects: 6, completion: 65 },
    { district: "Madurai", projects: 5, completion: 72 },
    { district: "Trichy", projects: 4, completion: 89 },
    { district: "Salem", projects: 3, completion: 56 },
    { district: "Thanjavur", projects: 4, completion: 68 },
  ];

  const budgetUtilization = [
    { month: "Jan", allocated: 50, utilized: 37 },
    { month: "Feb", allocated: 60, utilized: 45 },
    { month: "Mar", allocated: 70, utilized: 58 },
    { month: "Apr", allocated: 55, utilized: 42 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights into Tamil Nadu project performance and team productivity.</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Project</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="tourism">Tourism Portal</SelectItem>
                  <SelectItem value="heritage">Heritage Sites</SelectItem>
                  <SelectItem value="district">District Tool</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Team Member</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  <SelectItem value="arjun">Arjun Kumar</SelectItem>
                  <SelectItem value="priya">Priya Sharma</SelectItem>
                  <SelectItem value="raj">Raj Patel</SelectItem>
                  <SelectItem value="meera">Meera Rajan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-green-600">↑ 12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckSquare className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-green-600">↑ 8% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Team Efficiency</p>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-green-600">↑ 5% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Budget Utilization</p>
                <p className="text-2xl font-bold">76%</p>
                <p className="text-xs text-orange-600">↑ 3% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">Project Reports</TabsTrigger>
          <TabsTrigger value="tasks">Task Analytics</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="districts">District Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Project Progress Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="pending" fill="hsl(var(--chart-3))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Budget Utilization */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Utilization Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={budgetUtilization}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="allocated" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
                    <Area type="monotone" dataKey="utilized" stackId="2" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Project Details Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Project Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectProgress.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{project.name}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 bg-secondary rounded-full">
                            <div 
                              className="h-2 bg-primary rounded-full" 
                              style={{ width: `${project.completed}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{project.completed}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{project.completed} completed</Badge>
                      <Badge variant="secondary">{project.pending} pending</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Task Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Task Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Task Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="tasksCompleted" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                    <Line type="monotone" dataKey="tasksCreated" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamProductivity.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{member.name}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 bg-secondary rounded-full">
                            <div 
                              className="h-2 bg-primary rounded-full" 
                              style={{ width: `${member.efficiency}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{member.efficiency}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{member.completedTasks}/{member.totalTasks} tasks</Badge>
                      <Badge variant={member.efficiency > 90 ? "default" : "secondary"}>
                        {member.efficiency > 90 ? "Excellent" : "Good"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="districts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>District-wise Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={districtProgress} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="district" type="category" />
                  <Tooltip />
                  <Bar dataKey="completion" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>District Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {districtProgress.map((district, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{district.district}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Projects</span>
                          <span>{district.projects}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Completion</span>
                          <span>{district.completion}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${district.completion}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;