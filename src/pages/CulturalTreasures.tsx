import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Music, 
  Palette, 
  BookOpen, 
  Utensils, 
  Calendar,
  Star,
  MapPin,
  Users,
  Heart
} from "lucide-react";

const CulturalTreasures = () => {
  const treasureCategories = [
    {
      title: "Ancient Temples",
      description: "Magnificent Dravidian architecture spanning over 2000 years",
      icon: <Building2 className="h-8 w-8 text-primary" />,
      highlights: ["Meenakshi Temple", "Brihadeeswarar Temple", "Shore Temple", "Ranganathaswamy Temple"],
      color: "from-primary to-primary-glow"
    },
    {
      title: "Classical Arts",
      description: "Bharatanatyam, Carnatic music, and traditional performing arts",
      icon: <Music className="h-8 w-8 text-secondary" />,
      highlights: ["Bharatanatyam Dance", "Carnatic Music", "Nadaswaram", "Thevaram Hymns"],
      color: "from-secondary to-secondary/80"
    },
    {
      title: "Literature & Poetry",
      description: "Rich literary tradition from Sangam era to modern times",
      icon: <BookOpen className="h-8 w-8 text-accent" />,
      highlights: ["Thirukkural", "Silappathikaram", "Sangam Literature", "Modern Tamil Poetry"],
      color: "from-accent to-coral"
    },
    {
      title: "Traditional Arts",
      description: "Handicrafts, sculptures, and traditional art forms",
      icon: <Palette className="h-8 w-8 text-terracotta" />,
      highlights: ["Bronze Sculptures", "Tanjore Paintings", "Kanchipuram Silk", "Pottery"],
      color: "from-terracotta to-bronze"
    },
    {
      title: "Culinary Heritage",
      description: "Diverse flavors from Chettinad spices to temple prasadam",
      icon: <Utensils className="h-8 w-8 text-sage" />,
      highlights: ["Chettinad Cuisine", "Temple Food", "Filter Coffee", "Traditional Sweets"],
      color: "from-sage to-sage/80"
    },
    {
      title: "Festivals & Traditions",
      description: "Vibrant celebrations that connect communities across time",
      icon: <Calendar className="h-8 w-8 text-coral" />,
      highlights: ["Pongal", "Navaratri", "Karthigai Deepam", "Temple Festivals"],
      color: "from-coral to-accent"
    }
  ];

  const famousPersonalities = [
    { name: "A.P.J. Abdul Kalam", field: "Science & Leadership", period: "1931-2015" },
    { name: "Rukmani Devi Arundale", field: "Bharatanatyam Revival", period: "1904-1986" },
    { name: "M.S. Subbulakshmi", field: "Carnatic Music", period: "1916-2004" },
    { name: "Thiruvalluvar", field: "Philosophy & Ethics", period: "Ancient Era" },
    { name: "Kamal Haasan", field: "Cinema & Arts", period: "1954-Present" },
    { name: "C.V. Raman", field: "Physics & Nobel Prize", period: "1888-1970" }
  ];

  const worldHeritageSites = [
    {
      name: "Great Living Chola Temples",
      location: "Thanjavur, Gangaikonda Cholapuram, Darasuram",
      year: "Inscribed 1987-2004",
      significance: "Masterpieces of Chola architecture and art"
    },
    {
      name: "Group of Monuments at Mahabalipuram",
      location: "Mahabalipuram (Mamallapuram)",
      year: "Inscribed 1984",
      significance: "7th-8th century rock-cut temples and sculptures"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Cultural Treasures of{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Tamil Nadu
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Journey through millennia of artistic excellence, spiritual wisdom, and cultural richness 
            that defines the soul of Tamil Nadu
          </p>
        </div>

        {/* Cultural Categories Grid */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Pillars of Heritage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treasureCategories.map((category, index) => (
              <Card 
                key={index} 
                className="hover:shadow-temple hover:-translate-y-2 transition-all duration-300 group overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-muted p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="font-medium text-foreground mb-2">Key Highlights:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.highlights.map((highlight, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary" 
                          className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* UNESCO World Heritage Sites */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            UNESCO World Heritage Sites
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {worldHeritageSites.map((site, index) => (
              <Card key={index} className="hover:shadow-glow transition-all duration-300 border-l-4 border-primary">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-primary">
                        {site.name}
                      </CardTitle>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{site.location}</span>
                      </div>
                      <Badge variant="outline" className="mb-3">
                        {site.year}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {site.significance}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Famous Personalities */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Cultural Icons & Luminaries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {famousPersonalities.map((person, index) => (
              <Card key={index} className="hover:shadow-soft hover:scale-105 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-primary to-secondary w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{person.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {person.field}
                  </CardDescription>
                  <Badge variant="outline" className="w-fit mx-auto">
                    {person.period}
                  </Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Cultural Values */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-none">
            <CardContent className="py-16 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-8">
                  <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-full">
                    <Heart className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Tamil Cultural Values
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  "யாதும் ஊரே யாவரும் கேளிர்" - Every place is our home and all people are our kin. 
                  This ancient Tamil wisdom embodies the inclusive spirit that has defined Tamil culture 
                  for over two millennia.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">அறம் (Aram)</h3>
                    <p className="text-muted-foreground">Righteousness & Virtue</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-secondary">பொருள் (Porul)</h3>
                    <p className="text-muted-foreground">Material Prosperity</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-accent">இன்பம் (Inbam)</h3>
                    <p className="text-muted-foreground">Pleasure & Happiness</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary via-secondary to-accent p-8 rounded-2xl text-white">
            <h2 className="text-3xl font-bold mb-4">
              Explore More Cultural Wonders
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Discover the districts where these treasures come alive
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-xl"
            >
              Explore Districts
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CulturalTreasures;