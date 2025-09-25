import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Trash2, MessageSquare, Clock, CheckSquare2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Tasks = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Sample data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design homepage layout for Tourism Portal",
      description: "Create responsive homepage with hero section and district cards",
      status: "completed",
      priority: "high",
      project: "Tamil Nadu Tourism Portal",
      assignee: "Priya Sharma",
      dueDate: "2024-01-15",
      createdDate: "2024-01-01",
      completedDate: "2024-01-14",
      commentsCount: 5
    },
    {
      id: 2,
      title: "Implement user authentication system",
      description: "Set up JWT-based authentication with login/signup forms",
      status: "completed",
      priority: "high",
      project: "Tamil Nadu Tourism Portal",
      assignee: "Raj Patel",
      dueDate: "2024-01-20",
      createdDate: "2024-01-05",
      completedDate: "2024-01-18",
      commentsCount: 3
    },
    {
      id: 3,
      title: "Create district comparison feature",
      description: "Build interactive comparison tool for district statistics",
      status: "in-progress",
      priority: "medium",
      project: "District Comparison Tool",
      assignee: "Meera Rajan",
      dueDate: "2024-02-01",
      createdDate: "2024-01-10",
      commentsCount: 8
    },
    {
      id: 4,
      title: "Integrate payment gateway",
      description: "Add Razorpay integration for tourism bookings",
      status: "pending",
      priority: "high",
      project: "Tamil Nadu Tourism Portal",
      assignee: "Arjun Kumar",
      dueDate: "2024-02-15",
      createdDate: "2024-01-12",
      commentsCount: 2
    },
    {
      id: 5,
      title: "Document heritage sites data",
      description: "Collect and organize data for UNESCO World Heritage Sites",
      status: "in-progress",
      priority: "medium",
      project: "Heritage Sites Documentation",
      assignee: "Priya Sharma",
      dueDate: "2024-03-01",
      createdDate: "2024-02-01",
      commentsCount: 12
    }
  ]);

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Task has been successfully removed.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in-progress': return 'secondary';
      case 'pending': return 'outline';
      case 'blocked': return 'destructive';
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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Tasks</h1>
        <p className="text-muted-foreground">Manage and track project tasks across Tamil Nadu initiatives.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckSquare2 className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{taskStats.total}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{taskStats.completed}</p>
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
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{taskStats.inProgress}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{taskStats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Task List</TabsTrigger>
          <TabsTrigger value="board">Kanban Board</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>All Tasks</CardTitle>
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full md:w-64"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        New Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="taskTitle">Task Title</Label>
                          <Input id="taskTitle" placeholder="Enter task title" />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="taskDescription">Description</Label>
                          <Textarea id="taskDescription" placeholder="Enter task description" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="project">Project</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tourism">Tamil Nadu Tourism Portal</SelectItem>
                              <SelectItem value="heritage">Heritage Sites Documentation</SelectItem>
                              <SelectItem value="comparison">District Comparison Tool</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="assignee">Assignee</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select assignee" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="arjun">Arjun Kumar</SelectItem>
                              <SelectItem value="priya">Priya Sharma</SelectItem>
                              <SelectItem value="raj">Raj Patel</SelectItem>
                              <SelectItem value="meera">Meera Rajan</SelectItem>
                            </SelectContent>
                          </Select>
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
                          <Label htmlFor="dueDate">Due Date</Label>
                          <Input id="dueDate" type="date" />
                        </div>
                        <div className="col-span-2">
                          <Button className="w-full">Create Task</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <Link 
                            to={`/tasks/${task.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {task.title}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description.substring(0, 60)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{task.project}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {task.assignee}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {task.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          {task.commentsCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="board" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pending Column */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Pending</span>
                  <Badge variant="outline">{tasks.filter(t => t.status === 'pending').length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.filter(t => t.status === 'pending').map((task) => (
                  <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{task.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {task.description.substring(0, 80)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* In Progress Column */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>In Progress</span>
                  <Badge variant="outline">{tasks.filter(t => t.status === 'in-progress').length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.filter(t => t.status === 'in-progress').map((task) => (
                  <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{task.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {task.description.substring(0, 80)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Completed Column */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Completed</span>
                  <Badge variant="outline">{tasks.filter(t => t.status === 'completed').length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.filter(t => t.status === 'completed').map((task) => (
                  <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow border-green-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{task.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {task.description.substring(0, 80)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        <span className="text-xs text-muted-foreground">{task.completedDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;