import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  BarChart3,
  Trash2,
  ExternalLink,
  Search,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Url {
  id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
  isActive: boolean;
}

const mockUrls: Url[] = [
  {
    id: "1",
    shortCode: "abc123",
    originalUrl: "https://example.com/very/long/path/to/page",
    clicks: 1234,
    createdAt: "2024-01-15",
    isActive: true,
  },
  {
    id: "2",
    shortCode: "xyz789",
    originalUrl: "https://another-example.com/article/title",
    clicks: 567,
    createdAt: "2024-01-14",
    isActive: true,
  },
  {
    id: "3",
    shortCode: "def456",
    originalUrl: "https://blog.example.com/post/amazing-content",
    clicks: 89,
    createdAt: "2024-01-13",
    isActive: false,
  },
];

const MyUrls = () => {
  const [urls] = useState<Url[]>(mockUrls);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUrls = urls.filter(
    (url) =>
      url.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      url.originalUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (shortCode: string) => {
    navigator.clipboard.writeText(`https://short.link/${shortCode}`);
    toast({
      title: "Copied!",
      description: "Short URL copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="font-sans text-4xl font-bold mb-2">My URLs</h1>
            <p className="text-muted-foreground">
              Manage and track all your shortened links
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by URL or alias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* URLs Grid */}
          {filteredUrls.length === 0 ? (
            <div className="text-center py-16 glass border border-border rounded-xl">
              <p className="text-muted-foreground">No URLs found</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredUrls.map((url) => (
                <div
                  key={url.id}
                  className="glass border border-border rounded-xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-lg text-primary">
                          short.link/{url.shortCode}
                        </span>
                        <Badge
                          variant={url.isActive ? "default" : "secondary"}
                          className={
                            url.isActive
                              ? "bg-primary/20 text-primary border-primary/30"
                              : ""
                          }
                        >
                          {url.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p
                        className="text-sm text-muted-foreground truncate"
                        title={url.originalUrl}
                      >
                        <ExternalLink className="inline h-3 w-3 mr-1" />
                        {url.originalUrl}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{url.clicks} clicks</span>
                        <span>Created {url.createdAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(url.shortCode)}
                        className="hover:bg-primary/10"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyUrls;
