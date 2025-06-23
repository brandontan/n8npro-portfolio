import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Star, MapPin, DollarSign, Users, Eye, Heart, Plus, List, LayoutGrid } from "lucide-react";

// Mock data for demonstration
const mockTalent = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior n8n Automation Specialist",
    location: "San Francisco, CA",
    rate: "$85/hr",
    availability: "Available",
    isPro: true,
    rating: 4.9,
    projects: 47,
    avatar: "/placeholder.svg",
    portfolio: [
      {
        id: 1,
        title: "E-commerce Order Processing",
        image: "/placeholder.svg",
        views: 1247,
        likes: 89,
        tags: ["E-commerce", "API Integration", "Workflow Automation"]
      },
      {
        id: 2,
        title: "Customer Support Bot",
        image: "/placeholder.svg",
        views: 892,
        likes: 67,
        tags: ["Chatbot", "AI", "Customer Service"]
      }
    ],
    skills: ["n8n", "API Integration", "Workflow Design", "JavaScript", "Python"]
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "n8n Workflow Architect",
    location: "Austin, TX",
    rate: "$95/hr",
    availability: "Available",
    isPro: true,
    rating: 4.8,
    projects: 32,
    avatar: "/placeholder.svg",
    portfolio: [
      {
        id: 3,
        title: "Data Pipeline Automation",
        image: "/placeholder.svg",
        views: 1567,
        likes: 134,
        tags: ["Data Pipeline", "ETL", "Big Data"]
      }
    ],
    skills: ["n8n", "Data Engineering", "SQL", "AWS", "Docker"]
  },
  {
    id: 3,
    name: "Emma Thompson",
    title: "n8n Integration Expert",
    location: "Remote",
    rate: "$75/hr",
    availability: "Available",
    isPro: false,
    rating: 4.7,
    projects: 28,
    avatar: "/placeholder.svg",
    portfolio: [
      {
        id: 4,
        title: "Marketing Automation Suite",
        image: "/placeholder.svg",
        views: 743,
        likes: 56,
        tags: ["Marketing", "CRM", "Email Automation"]
      }
    ],
    skills: ["n8n", "Marketing Automation", "HubSpot", "Mailchimp", "Zapier"]
  }
];

export const TalentMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBudget, setFilterBudget] = useState("any");
  const [filterLocation, setFilterLocation] = useState("any");
  const [filterAvailability, setFilterAvailability] = useState("any");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const filteredTalent = mockTalent.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesBudget = !filterBudget || filterBudget === "any" || talent.rate.includes(filterBudget);
    const matchesLocation = !filterLocation || filterLocation === "any" || talent.location.includes(filterLocation);
    const matchesAvailability = !filterAvailability || filterAvailability === "any" || talent.availability === filterAvailability;
    
    return matchesSearch && matchesBudget && matchesLocation && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Dynamic background from Hero */}
      <div className="absolute inset-0 fluid-gradient"></div>
      <div className="absolute top-20 left-20 w-72 h-72 liquid-blob liquid-morph"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 liquid-blob liquid-morph" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 liquid-blob liquid-morph" style={{ animationDelay: '4s' }}></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse block">
              Discover Top n8n Talent
            </span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with world-class automation specialists ready to transform your workflows.
          </p>
        </header>

        {/* Filters and Controls */}
        <div className="mb-8 p-4 glass-card rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search by name, skill, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 w-full glass-card focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap justify-center">
              <Select value={filterBudget} onValueChange={setFilterBudget}>
                <SelectTrigger className="w-full sm:w-36 glass-card">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Budget</SelectItem>
                  <SelectItem value="$50">$50/hr+</SelectItem>
                  <SelectItem value="$75">$75/hr+</SelectItem>
                  <SelectItem value="$100">$100/hr+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-full sm:w-40 glass-card">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Location</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="Austin">Austin</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                <SelectTrigger className="w-full sm:w-36 glass-card">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Busy">Busy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')} className="glass-card hover:glass-button">
                <LayoutGrid className="w-5 h-5" />
              </Button>
              <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')} className="glass-card hover:glass-button">
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count and CTA */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-foreground">
            All Talent ({filteredTalent.length} found)
          </h2>
          <Button className="glass-button text-white group">
            <Plus className="-ml-1 mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
            Post a Job
          </Button>
        </div>

        {/* Talent Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid gap-8 md:grid-cols-2 lg:grid-cols-3" 
          : "space-y-4"}>
          {filteredTalent.map((talent) => (
            <TalentCard key={talent.id} talent={talent} viewMode={viewMode} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TalentCard = ({ talent, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="glass-card w-full p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center space-x-6">
          <Avatar className="w-16 h-16 border-2 border-white/50">
            <AvatarImage src={talent.avatar} />
            <AvatarFallback>{talent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-foreground">{talent.name}</h3>
                <p className="text-sm text-muted-foreground">{talent.title}</p>
              </div>
              <div className="flex items-center space-x-3">
                {talent.isPro && (
                  <Badge variant="secondary" className="glass-card text-sm px-3 py-1 animate-pulse-glow">PRO</Badge>
                )}
                 <Badge variant={talent.availability === "Available" ? "default" : "secondary"} className="glass-card text-sm px-3 py-1">{talent.availability}</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{talent.rating}</span>
              </div>
              <span>•</span>
              <span>{talent.projects} projects</span>
              <span>•</span>
              <span>{talent.location}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold text-green-400">{talent.rate}</div>
            <Button size="sm" className="mt-2 glass-button text-white group">View Profile</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group glass-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-32 bg-slate-900/50">
        {/* Placeholder for a banner image */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>
      <div className="flex justify-center -mt-12">
        <Avatar className="w-24 h-24 border-4 border-background/50">
          <AvatarImage src={talent.avatar} alt={talent.name} />
          <AvatarFallback>{talent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </div>

      <div className="p-6 text-center">
        <div className="flex justify-center items-center gap-2">
          <h3 className="text-xl font-bold text-foreground">{talent.name}</h3>
          {talent.isPro && (
            <Badge variant="secondary" className="glass-card text-xs px-2 py-1 animate-pulse-glow">PRO</Badge>
          )}
        </div>
        <p className="text-primary mt-1">{talent.title}</p>
        <p className="text-sm text-muted-foreground mt-2">{talent.location}</p>

        <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground mt-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-semibold">{talent.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="font-semibold">{talent.projects} projects</span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {talent.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="glass-card text-xs">{skill}</Badge>
          ))}
          {talent.skills.length > 4 && (
            <Badge variant="outline" className="glass-card text-xs">+{talent.skills.length - 4} more</Badge>
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button className="flex-1 glass-button text-white group">View Profile</Button>
          <Button variant="outline" className="flex-1 glass-card hover:glass-button group">Contact</Button>
        </div>
      </div>
    </div>
  )
}; 