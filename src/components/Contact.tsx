import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Clock, DollarSign, CheckCircle, AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { useContactForm } from "@/hooks/useContactForm";

export const Contact = () => {
  const { submitForm, isSubmitting, error, success, dismissSuccess, dismissError } = useContactForm();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: '',
    project_details: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.project_details) {
      return;
    }

    // Set message to project_details if not provided
    const submissionData = {
      ...formData,
      message: formData.message || formData.project_details
    };

    const success = await submitForm(submissionData);
    
    if (success) {
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        project_type: '',
        project_details: '',
        message: ''
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "brandon@aiflows.help",
      action: "mailto:brandon@aiflows.help"
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
      action: null
    }
  ];

  const pricing = [
    {
      icon: Calendar,
      title: "Consultation",
      price: "Free",
      description: "30-min discovery call to discuss your automation needs"
    },
    {
      icon: DollarSign,
      title: "Hourly Rate",
      price: "$30/hr",
      description: "For ongoing development and maintenance"
    },
    {
      icon: DollarSign,
      title: "Project Rate",
      price: "Custom",
      description: "Fixed-price for complete AI-powered automation solutions"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Get In Touch</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Automate Your Business?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how intelligent automation can transform your workflows and 
            save you hours of manual work every week.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {success && (
                  <div className="flex items-center justify-between gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Message sent successfully! Brandon will get in touch with you ASAP.</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={dismissSuccess}
                      className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-500/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {error && (
                  <div className="flex items-start justify-between gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 mt-0.5" />
                      <div className="space-y-1">
                        <p>Failed to send message. Please try again or email directly.</p>
                        <p className="text-sm opacity-75">{error}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={dismissError}
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-500/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name *</label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name" 
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <Input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@company.com" 
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Type</label>
                    <Input 
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleInputChange}
                      placeholder="e.g., CRM automation, inventory management" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Details *</label>
                    <Textarea 
                      name="project_details"
                      value={formData.project_details}
                      onChange={handleInputChange}
                      placeholder="Tell me about your automation needs, current pain points, and expected outcomes..."
                      className="min-h-32"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Pricing */}
          <div className="space-y-6">
            {/* Contact Information - Hidden until domain confirmed */}
            {/* <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      {info.action ? (
                        <a href={info.action} className="font-medium hover:text-primary transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <div className="font-medium">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card> */}

            {/* Pricing */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Investment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pricing.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{item.title}</span>
                        <span className="font-bold text-primary">{item.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
