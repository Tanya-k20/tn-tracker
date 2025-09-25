import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Search, Plus, Edit, Trash2, Calendar, Users, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Projects = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Tamil Nadu Tourism Portal",
      description: "Comprehensive portal for Tamil Nadu tourism information and booking",
      status: "active",
      priority: "high",
      progress: 75,
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      manager: "Arjun Kumar",
      teamSize: 8,
      district: "Chennai",
      budget: "₹50,00,000"
    },
    {
      id: 2,
      name: "Heritage Sites Documentation",
      description: "Digital documentation of Tamil Nadu's UNESCO World Heritage Sites",
      status: "active",
      priority: "medium",
      progress: 45,
      startDate: "2024-02-15",
      endDate: "2024-12-31",
      manager: "Priya Sharma",
      teamSize: 5,
      district: "Thanjavur",
      budget: "₹25,00,000"
    },
    {
      id: 3,
      name: "District Comparison Tool",
      description: "Interactive tool for comparing Tamil Nadu districts across various metrics",
      status: "completed",
      priority: "low",
      progress: 100,
      startDate: "2023-09-01",
      endDate: "2024-01-15",
      manager: "Raj Patel",
      teamSize: 3,
      district: "Coimbatore",
      budget: "₹15,00,000"
    },
    {
      id: 4,
      name: "Cultural Events Calendar",
      description: "Centralized calendar for Tamil Nadu's cultural events and festivals",
      status: "planning",
      priority: "medium",
      progress: 15,
      startDate: "2024-03-01",
      endDate: "2024-08-31",
      manager: "Meera Rajan",
      teamSize: 6,
      district: "Madurai",
      budget: "₹30,00,000"
    }
  ]);

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "Project deleted",
      description: "Project has been successfully removed.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'default';
      case 'planning': return 'secondary';
      case 'on-hold': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
        <p className="text-muted-foreground">Manage and track Tamil Nadu development projects.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Planning</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'planning').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Projects List</CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Project Name</Label>
                      <Input id="name" placeholder="Enter project name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager">Project Manager</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select manager" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="arjun">Arjun Kumar</SelectItem>
                          <SelectItem value="priya">Priya Sharma</SelectItem>
                          <SelectItem value="raj">Raj Patel</SelectItem>
                          <SelectItem value="meera">Meera Rajan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Enter project description" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chennai">Chennai</SelectItem>
                          <SelectItem value="coimbatore">Coimbatore</SelectItem>
                          <SelectItem value="madurai">Madurai</SelectItem>
                          <SelectItem value="trichy">Trichy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" type="date" />
                    </div>
                    <div className="col-span-2">
                      <Button className="w-full">Create Project</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Link 
                            to={`/projects/${project.id}`}
                            className="text-xl font-semibold hover:text-primary transition-colors"
                          >
                            {project.name}
                          </Link>
                          <p className="text-muted-foreground mt-1">{project.description}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                        <Badge variant={getPriorityColor(project.priority)}>{project.priority}</Badge>
                        <Badge variant="outline">{project.district}</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="w-full" />
                      </div>
                    </div>

                    <div className="lg:w-64 space-y-4">
                      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Timeline</p>
                            <p className="font-medium">{project.startDate} - {project.endDate}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Team</p>
                            <p className="font-medium">{project.teamSize} members</p>
                          </div>
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                          <p className="text-sm text-muted-foreground">Manager</p>
                          <p className="font-medium">{project.manager}</p>
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                          <p className="text-sm text-muted-foreground">Budget</p>
                          <p className="font-medium">{project.budget}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;