import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  DollarSign, 
  CheckSquare, 
  Clock, 
  MapPin,
  Edit,
  Plus
} from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();

  // Sample project data - in real app this would come from API
  const project = {
    id: 1,
    name: "Tamil Nadu Tourism Portal",
    description: "Comprehensive portal for Tamil Nadu tourism information and booking system with integrated payment gateway and multilingual support.",
    status: "active",
    priority: "high",
    progress: 75,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    manager: "Arjun Kumar",
    teamSize: 8,
    district: "Chennai",
    budget: "₹50,00,000",
    spent: "₹37,50,000"
  };

  const tasks = [
    { id: 1, title: "Design homepage layout", status: "completed", assignee: "Priya Sharma", dueDate: "2024-01-15" },
    { id: 2, title: "Implement user authentication", status: "completed", assignee: "Raj Patel", dueDate: "2024-01-20" },
    { id: 3, title: "Create district pages", status: "in-progress", assignee: "Meera Rajan", dueDate: "2024-02-01" },
    { id: 4, title: "Integrate payment gateway", status: "pending", assignee: "Arjun Kumar", dueDate: "2024-02-15" },
    { id: 5, title: "Add multilingual support", status: "pending", assignee: "Priya Sharma", dueDate: "2024-02-28" },
  ];

  const teamMembers = [
    { id: 1, name: "Arjun Kumar", role: "Project Manager", avatar: "/avatars/arjun.jpg" },
    { id: 2, name: "Priya Sharma", role: "Frontend Developer", avatar: "/avatars/priya.jpg" },
    { id: 3, name: "Raj Patel", role: "Backend Developer", avatar: "/avatars/raj.jpg" },
    { id: 4, name: "Meera Rajan", role: "UI/UX Designer", avatar: "/avatars/meera.jpg" },
    { id: 5, name: "Suresh Kumar", role: "DevOps Engineer", avatar: "/avatars/suresh.jpg" },
  ];

  const milestones = [
    { id: 1, title: "Project Kickoff", date: "2024-01-01", status: "completed" },
    { id: 2, title: "Design Phase Complete", date: "2024-01-31", status: "completed" },
    { id: 3, title: "Development Phase 1", date: "2024-03-15", status: "in-progress" },
    { id: 4, title: "Testing & QA", date: "2024-05-01", status: "pending" },
    { id: 5, title: "Deployment", date: "2024-06-30", status: "pending" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'completed': return 'default';
      case 'in-progress': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/projects">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">{project.name}</CardTitle>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                    <Badge variant="destructive">{project.priority} priority</Badge>
                    <Badge variant="outline">{project.district}</Badge>
                  </div>
                </div>
                <Button className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Project
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="w-full" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">{project.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">{project.endDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Team Size</p>
                      <p className="font-medium">{project.teamSize} members</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{project.district}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Content */}
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Project Tasks</CardTitle>
                    <Button size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckSquare className={`h-4 w-4 ${
                            task.status === 'completed' ? 'text-green-500' : 'text-muted-foreground'
                          }`} />
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Assigned to {task.assignee} • Due {task.dueDate}
                            </p>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className={`h-3 w-3 rounded-full ${
                          milestone.status === 'completed' ? 'bg-green-500' :
                          milestone.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium">{milestone.title}</p>
                          <p className="text-sm text-muted-foreground">{milestone.date}</p>
                        </div>
                        <Badge variant={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Budget Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Budget Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Budget Utilization</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="w-full" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Budget</span>
                  <span className="font-medium">{project.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Spent</span>
                  <span className="font-medium">{project.spent}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm text-muted-foreground">Remaining</span>
                  <span className="font-medium">₹12,50,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Tasks</span>
                <span className="font-medium">{tasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="font-medium">{tasks.filter(t => t.status === 'completed').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">In Progress</span>
                <span className="font-medium">{tasks.filter(t => t.status === 'in-progress').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pending</span>
                <span className="font-medium">{tasks.filter(t => t.status === 'pending').length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;