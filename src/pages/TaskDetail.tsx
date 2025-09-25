import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  MessageSquare, 
  Edit,
  Clock,
  CheckSquare2,
  Send,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TaskDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");

  // Sample task data - in real app this would come from API
  const task = {
    id: 1,
    title: "Design homepage layout for Tourism Portal",
    description: "Create responsive homepage with hero section showcasing Tamil Nadu's beauty, district cards with key information, and integrated search functionality. The design should follow Tamil Nadu's cultural theme with temple-inspired colors and traditional motifs.",
    status: "in-progress",
    priority: "high",
    project: "Tamil Nadu Tourism Portal",
    assignee: "Priya Sharma",
    reporter: "Arjun Kumar",
    dueDate: "2024-02-15",
    createdDate: "2024-01-01",
    updatedDate: "2024-01-12",
    estimatedHours: 40,
    loggedHours: 28
  };

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Arjun Kumar",
      avatar: "/avatars/arjun.jpg",
      content: "Great work on the initial mockups! The cultural theme really comes through nicely. Can we add more Tamil script elements?",
      timestamp: "2024-01-10 14:30",
      isEdited: false
    },
    {
      id: 2,
      author: "Priya Sharma",
      avatar: "/avatars/priya.jpg",
      content: "Thanks! I've incorporated more Tamil typography in the latest version. Also added traditional patterns as background elements.",
      timestamp: "2024-01-10 16:45",
      isEdited: false
    },
    {
      id: 3,
      author: "Meera Rajan",
      avatar: "/avatars/meera.jpg",
      content: "The color palette looks perfect - very authentic to Tamil culture. The temple gold gradient is especially beautiful.",
      timestamp: "2024-01-11 09:15",
      isEdited: false
    },
    {
      id: 4,
      author: "Raj Patel",
      avatar: "/avatars/raj.jpg",
      content: "From a technical perspective, this design will work great with our component architecture. Mobile responsiveness looks solid too.",
      timestamp: "2024-01-12 11:20",
      isEdited: false
    }
  ]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Current User", // This would be the logged-in user
        avatar: "/avatars/current-user.jpg",
        content: newComment,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        isEdited: false
      };
      setComments([...comments, comment]);
      setNewComment("");
      toast({
        title: "Comment added",
        description: "Your comment has been added to the task.",
      });
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(c => c.id !== commentId));
    toast({
      title: "Comment deleted",
      description: "Comment has been removed.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in-progress': return 'secondary';
      case 'pending': return 'outline';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/tasks">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tasks
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Details */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>{task.project}</span>
                    <span>•</span>
                    <span>TASK-{task.id}</span>
                  </div>
                  <CardTitle className="text-2xl mb-4">{task.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                    <Badge variant={getPriorityColor(task.priority)}>{task.priority} priority</Badge>
                  </div>
                </div>
                <Button className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{task.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Assignee</p>
                      <p className="font-medium">{task.assignee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-medium">{task.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time Logged</p>
                      <p className="font-medium">{task.loggedHours}h / {task.estimatedHours}h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckSquare2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-medium">{task.createdDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Add Comment */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Add Comment
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            {comment.isEdited && (
                              <Badge variant="outline" className="text-xs">edited</Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm leading-relaxed bg-muted p-3 rounded-md">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Task Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Time Progress</span>
                  <span>{Math.round((task.loggedHours / task.estimatedHours) * 100)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all" 
                    style={{ width: `${(task.loggedHours / task.estimatedHours) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Estimated</span>
                  <span className="text-sm font-medium">{task.estimatedHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Logged</span>
                  <span className="text-sm font-medium">{task.loggedHours}h</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm text-muted-foreground">Remaining</span>
                  <span className="text-sm font-medium">{task.estimatedHours - task.loggedHours}h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Info */}
          <Card>
            <CardHeader>
              <CardTitle>Task Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Reporter</span>
                <span className="text-sm font-medium">{task.reporter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm font-medium">{task.createdDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Updated</span>
                <span className="text-sm font-medium">{task.updatedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Project</span>
                <Link to="/projects/1" className="text-sm font-medium text-primary hover:underline">
                  {task.project}
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Log Time
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Assign to Me
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckSquare2 className="h-4 w-4 mr-2" />
                Mark Complete
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;