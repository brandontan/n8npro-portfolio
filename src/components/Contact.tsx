
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, Clock, DollarSign, CheckCircle, AlertCircle } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";

export const Contact = () => {
  const { submitForm, isSubmitting, submitStatus, resetStatus } = useContactForm();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: '',
    project_details: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm(formData);
    if (success) {
      setFormData({ name: '', email: '', project_type: '', project_details: '' });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (submitStatus !== 'idle') {
      resetStatus();
    }
  };
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@n8nautomation.dev",
      action: "mailto:hello@n8nautomation.dev"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      action: null
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
      price: "$125/hr",
      description: "For ongoing development and maintenance"
    },
    {
      icon: DollarSign,
      title: "Project Rate",
      price: "$2,500+",
      description: "Fixed-price for complete automation solutions"
    }
  ];

  return (
    <section className="py-20 bg-muted/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Get In Touch</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Automate Your Business?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how n8n automation can transform your workflows and 
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input 
                        placeholder="Your full name" 
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input 
                        type="email" 
                        placeholder="your.email@company.com" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Type</label>
                    <Input 
                      placeholder="e.g., CRM automation, inventory management" 
                      value={formData.project_type}
                      onChange={(e) => handleInputChange('project_type', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Details</label>
                    <Textarea 
                      placeholder="Tell me about your automation needs, current pain points, and expected outcomes..."
                      className="min-h-32"
                      value={formData.project_details}
                      onChange={(e) => handleInputChange('project_details', e.target.value)}
                      required
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                      <CheckCircle className="h-5 w-5" />
                      <span>Message sent successfully! I'll get back to you within 24 hours.</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <span>Failed to send message. Please try again or email me directly.</span>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Pricing */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
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
            </Card>

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
