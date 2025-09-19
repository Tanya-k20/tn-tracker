import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, GraduationCap, Wheat, ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/tamil-nadu-hero.jpg";

const Landing = () => {
  const stats = [
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: "38 Districts",
      description: "Comprehensive coverage",
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "72+ Million",
      description: "Population",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-accent" />,
      title: "80.1%",
      description: "Literacy Rate",
    },
    {
      icon: <Wheat className="h-8 w-8 text-terracotta" />,
      title: "130,060 km²",
      description: "Total Area",
    },
  ];

  const features = [
    {
      title: "District Explorer",
      description: "Detailed information about all 38 districts including demographics, culture, and economy.",
      icon: <MapPin className="h-6 w-6" />,
    },
    {
      title: "Tourist Destinations",
      description: "Discover ancient temples, hill stations, beaches, and cultural sites across Tamil Nadu.",
      icon: <Star className="h-6 w-6" />,
    },
    {
      title: "Weather & Climate",
      description: "Real-time weather data and historical climate information for each district.",
      icon: <Users className="h-6 w-6" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Discover the Heritage of{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Tamil Nadu
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore districts, culture, tourist destinations, and comprehensive state information 
            all in one beautiful platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all" asChild>
              <Link to="/signup">
                Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tamil Nadu at a Glance
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Rich in culture, diverse in geography, and progressive in development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <CardTitle className="text-2xl">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{stat.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Every Corner
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From ancient temples to modern cities, discover what makes each district unique
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Explore Tamil Nadu?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of explorers discovering the rich heritage and beauty of Tamil Nadu
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
            asChild
          >
            <Link to="/signup">
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;