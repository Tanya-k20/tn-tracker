import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, Users, Globe } from "lucide-react";

const About = () => {
  const culturalHighlights = [
    "Ancient Temples", "Classical Dance", "Traditional Music", "Cuisine", 
    "Literature", "Architecture", "Festivals", "Arts & Crafts"
  ];

  const projectFeatures = [
    {
      title: "Comprehensive District Data",
      description: "Detailed information about all 38 districts including demographics, geography, and cultural significance.",
      icon: <MapPin className="h-6 w-6 text-primary" />
    },
    {
      title: "Cultural Heritage",
      description: "Explore the rich tradition of Tamil Nadu from ancient Sangam literature to modern achievements.",
      icon: <Heart className="h-6 w-6 text-accent" />
    },
    {
      title: "Community Driven",
      description: "Built for the people by the people, helping preserve and share Tamil Nadu's heritage.",
      icon: <Users className="h-6 w-6 text-secondary" />
    },
    {
      title: "Global Accessibility",
      description: "Making Tamil Nadu's beauty and culture accessible to people around the world.",
      icon: <Globe className="h-6 w-6 text-terracotta" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Tamil Nadu State Tracker
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A digital platform celebrating the rich heritage, diverse culture, and natural beauty 
            of Tamil Nadu - the land of temples, classical arts, and timeless traditions.
          </p>
        </div>

        {/* Tamil Nadu Overview */}
        <section className="mb-16">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                தமிழ்நாடு - The Land of Tamils
              </CardTitle>
              <CardDescription className="text-center text-lg">
                A state where ancient wisdom meets modern progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Tamil Nadu, located in the southern tip of India, is a state renowned for its 
                ancient Dravidian culture, magnificent temples, classical arts, and rich literary heritage. 
                From the bustling metropolis of Chennai to the serene hill stations of the Nilgiris, 
                from the sacred temples of Madurai to the pristine beaches of Rameswaram, 
                Tamil Nadu offers a tapestry of experiences that span millennia.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Cultural Heritage</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Home to the world's oldest living language, Tamil Nadu has preserved its cultural 
                    identity through centuries. The state boasts UNESCO World Heritage Sites, 
                    ancient temples with stunning Dravidian architecture, and a thriving tradition 
                    of classical music, dance, and literature.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Modern Achievements</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    While deeply rooted in tradition, Tamil Nadu is also a leader in education, 
                    industry, and technology. The state contributes significantly to India's economy 
                    through its thriving automotive, textile, and IT industries, while maintaining 
                    high literacy rates and progressive social policies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cultural Highlights */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Cultural Treasures
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {culturalHighlights.map((item, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {item}
              </Badge>
            ))}
          </div>
        </section>

        {/* Project Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-muted p-3 rounded-lg">
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
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-none">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Join Our Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Help us preserve and share the incredible heritage of Tamil Nadu. 
                Together, we can ensure that future generations appreciate and understand 
                the beauty of our culture and traditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <p className="text-lg font-medium text-foreground">
                  Ready to explore? Connect to Supabase to get started!
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;