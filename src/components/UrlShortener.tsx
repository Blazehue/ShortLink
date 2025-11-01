import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, Loader2, QrCode, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { isValidUrl } from "@/lib/utils";

interface ShortenedUrl {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
}

const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [showCustomAlias, setShowCustomAlias] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ShortenedUrl | null>(null);
  const [copied, setCopied] = useState(false);
  const [urlError, setUrlError] = useState("");

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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const shortCode = customAlias || Math.random().toString(36).substring(2, 8);
    const mockResult: ShortenedUrl = {
      shortCode,
      originalUrl: url,
      shortUrl: `short.link/${shortCode}`,
    };

    setResult(mockResult);
    setIsLoading(false);
    
    toast({
      title: "Success!",
      description: "Your URL has been shortened",
      className: "bg-success text-success-foreground",
    });
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(`https://${result.shortUrl}`);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Short URL copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isUrlValid = url && isValidUrl(url);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="glass border border-border rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-base font-sans">
              Enter your long URL
            </Label>
            <div className="relative">
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/very/long/path"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                className={`h-14 text-lg font-sans pr-10 ${
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
            {urlError && (
              <p className="text-sm text-destructive">{urlError}</p>
            )}
            {url && !urlError && (
              <p className="text-sm text-muted-foreground">
                {url.length} characters
              </p>
            )}
          </div>

          <div className="space-y-4">
            <Button
              variant="ghost"
              onClick={() => setShowCustomAlias(!showCustomAlias)}
              className="text-primary hover:text-primary/80 p-0 h-auto font-sans"
            >
              {showCustomAlias ? "Hide" : "Customize"} short URL
            </Button>

            {showCustomAlias && (
              <div className="space-y-2 animate-in slide-in-from-bottom-4">
                <Label htmlFor="alias" className="text-sm font-sans">
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
                <p className="text-xs text-muted-foreground">
                  3-20 alphanumeric characters
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={handleShorten}
            disabled={!isUrlValid || isLoading}
            className="w-full h-14 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all active:scale-95"
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

      {result && (
        <div className="glass border border-primary/50 rounded-2xl p-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-success">
              <Check className="h-5 w-5" />
              <span className="font-sans font-medium">Successfully shortened!</span>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-sans">Original URL</p>
              <p className="text-sm truncate" title={result.originalUrl}>
                {result.originalUrl}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-sans">Short URL</p>
              <div 
                className="bg-muted/50 px-4 py-3 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors group"
                onClick={() => window.open(result.originalUrl, '_blank')}
                title="Click to visit the original URL"
              >
                <p className="font-mono text-2xl text-primary break-all group-hover:underline">
                  {result.shortUrl}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Click the short URL to visit the original link
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleCopy}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
              <Button 
                variant="secondary" 
                className="flex-1"
                onClick={() => window.open(result.originalUrl, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Link
              </Button>
              <Button variant="secondary" className="flex-1">
                <QrCode className="mr-2 h-4 w-4" />
                QR Code
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
