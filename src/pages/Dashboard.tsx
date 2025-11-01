import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Check, 
  Copy, 
  Loader2, 
  QrCode, 
  ExternalLink, 
  Trash2,
  Download,
  X
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { isValidUrl } from "@/lib/utils";
import QRCode from "qrcode";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShortenedUrl {
  id: string;
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
  clicks: number;
}

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [showCustomAlias, setShowCustomAlias] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [urlError, setUrlError] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<ShortenedUrl | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Load saved URLs from localStorage
    const savedUrls = localStorage.getItem(`urls_${user?.email}`);
    if (savedUrls) {
      setUrls(JSON.parse(savedUrls));
    }
  }, [user]);

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (value && !isValidUrl(value)) {
      setUrlError("Please enter a valid URL");
    } else {
      setUrlError("");
    }
  };

  const handleShorten = async () => {
    if (!url || urlError) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const shortCode = customAlias || Math.random().toString(36).substring(2, 8);
    const newUrl: ShortenedUrl = {
      id: Date.now().toString(),
      shortCode,
      originalUrl: url,
      shortUrl: `short.link/${shortCode}`,
      createdAt: new Date(),
      clicks: Math.floor(Math.random() * 100),
    };

    const updatedUrls = [newUrl, ...urls];
    setUrls(updatedUrls);
    localStorage.setItem(`urls_${user?.email}`, JSON.stringify(updatedUrls));
    
    setUrl("");
    setCustomAlias("");
    setShowCustomAlias(false);
    setIsLoading(false);
    
    toast({
      title: "Success!",
      description: "Your URL has been shortened",
      className: "bg-success text-success-foreground",
    });
  };

  const handleCopy = (shortUrl: string, id: string) => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    setCopied(id);
    toast({
      title: "Copied!",
      description: "Short URL copied to clipboard",
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = (id: string) => {
    const updatedUrls = urls.filter(u => u.id !== id);
    setUrls(updatedUrls);
    localStorage.setItem(`urls_${user?.email}`, JSON.stringify(updatedUrls));
    toast({
      title: "Deleted",
      description: "URL has been removed",
    });
  };

  const generateQRCode = async (urlData: ShortenedUrl) => {
    try {
      const qrDataUrl = await QRCode.toDataURL(`https://${urlData.shortUrl}`, {
        width: 400,
        margin: 2,
        color: {
          dark: '#3b82f6',
          light: '#ffffff',
        },
      });
      setQrCodeUrl(qrDataUrl);
      setSelectedUrl(urlData);
      setQrDialogOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl && selectedUrl) {
      const link = document.createElement('a');
      link.download = `qr-${selectedUrl.shortCode}.png`;
      link.href = qrCodeUrl;
      link.click();
      toast({
        title: "Downloaded!",
        description: "QR code saved to your device",
      });
    }
  };

  const isUrlValid = url && isValidUrl(url);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="animate-in slide-in-from-top-4 duration-500">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Welcome back, <span className="text-primary">{user?.name}</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Manage your shortened URLs and track their performance
          </p>
        </div>

        {/* URL Shortener Form */}
        <div className="glass border border-border rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 fade-in duration-500">
          <h2 className="text-2xl font-semibold mb-6">Create Short URL</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-base">
                Enter your long URL
              </Label>
              <div className="relative">
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/very/long/path"
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className={`h-14 text-lg pr-10 ${
                    url
                      ? urlError
                        ? "border-destructive ring-2 ring-destructive/20"
                        : "border-success ring-2 ring-success/20"
                      : ""
                  }`}
                />
                {url && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {urlError ? (
                      <ExternalLink className="h-5 w-5 text-destructive" />
                    ) : (
                      <Check className="h-5 w-5 text-success" />
                    )}
                  </div>
                )}
              </div>
              {urlError && <p className="text-sm text-destructive">{urlError}</p>}
            </div>

            <div className="space-y-4">
              <Button
                variant="ghost"
                onClick={() => setShowCustomAlias(!showCustomAlias)}
                className="text-primary hover:text-primary/80 p-0 h-auto"
              >
                {showCustomAlias ? "Hide" : "Customize"} short URL
              </Button>

              {showCustomAlias && (
                <div className="space-y-2 animate-in slide-in-from-bottom-4">
                  <Label htmlFor="alias" className="text-sm">
                    Custom alias (optional)
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-mono">short.link/</span>
                    <Input
                      id="alias"
                      placeholder="my-link"
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={handleShorten}
              disabled={!isUrlValid || isLoading}
              className="w-full h-14 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Shortening...
                </>
              ) : (
                "Shorten URL"
              )}
            </Button>
          </div>
        </div>

        {/* URLs List */}
        <div className="animate-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-2xl font-semibold mb-4">Your URLs ({urls.length})</h2>
          
          {urls.length === 0 ? (
            <div className="glass border border-border rounded-2xl p-12 text-center">
              <p className="text-muted-foreground text-lg">
                No URLs yet. Create your first shortened link above!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {urls.map((urlData, index) => (
                <div
                  key={urlData.id}
                  className="glass border border-border rounded-xl p-6 hover:shadow-lg transition-all animate-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-mono text-xl text-primary font-semibold break-all">
                            {urlData.shortUrl}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate" title={urlData.originalUrl}>
                          {urlData.originalUrl}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{urlData.clicks} clicks</span>
                          <span>•</span>
                          <span>Created {new Date(urlData.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleCopy(urlData.shortUrl, urlData.id)}
                      >
                        {copied === urlData.id ? (
                          <>
                            <Check className="mr-1 h-3 w-3" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 h-3 w-3" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => generateQRCode(urlData)}
                      >
                        <QrCode className="mr-1 h-3 w-3" />
                        QR Code
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => window.open(urlData.originalUrl, '_blank')}
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Visit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(urlData.id)}
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
            <DialogDescription>
              Scan this QR code to access your short link
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            {qrCodeUrl && (
              <>
                <div className="bg-white p-4 rounded-lg">
                  <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
                </div>
                <div className="text-center">
                  <p className="font-mono text-lg text-primary font-semibold">
                    {selectedUrl?.shortUrl}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedUrl?.originalUrl}
                  </p>
                </div>
                <div className="flex gap-2 w-full">
                  <Button onClick={downloadQRCode} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => setQrDialogOpen(false)}
                    className="flex-1"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Close
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
