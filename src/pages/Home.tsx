import UrlShortener from "@/components/UrlShortener";
import { Zap, Shield, BarChart3, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Popup Animation */}
      <section className="relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

        {/* Content with Popup Effect */}
        <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
          <div className="text-center space-y-6 mb-12 animate-in zoom-in-95 fade-in duration-700">
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Shorten Your Links,
              <span className="text-primary block mt-2">Amplify Your Reach</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
              Create short, memorable links with powerful analytics and custom aliases.
              Track every click and optimize your marketing campaigns.
            </p>
            {!isAuthenticated && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-lg"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-8 text-lg"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
              </div>
            )}
          </div>

          <div className="animate-in zoom-in-95 fade-in duration-700" style={{ animationDelay: "150ms" }}>
            <UrlShortener />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="container mx-auto px-4 py-16">

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass border border-border rounded-2xl p-8 text-center space-y-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 animate-in zoom-in-95 fade-in" style={{ animationDelay: "300ms" }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-sans text-xl font-semibold">Lightning Fast</h3>
            <p className="text-muted-foreground leading-relaxed">
              Create short links instantly with our optimized infrastructure
            </p>
          </div>

          <div className="glass border border-border rounded-2xl p-8 text-center space-y-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 animate-in zoom-in-95 fade-in" style={{ animationDelay: "450ms" }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-sans text-xl font-semibold">Detailed Analytics</h3>
            <p className="text-muted-foreground leading-relaxed">
              Track clicks, locations, devices, and referrers in real-time
            </p>
          </div>

          <div className="glass border border-border rounded-2xl p-8 text-center space-y-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 animate-in zoom-in-95 fade-in" style={{ animationDelay: "600ms" }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-sans text-xl font-semibold">Secure & Reliable</h3>
            <p className="text-muted-foreground leading-relaxed">
              Enterprise-grade security with 99.9% uptime guarantee
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
