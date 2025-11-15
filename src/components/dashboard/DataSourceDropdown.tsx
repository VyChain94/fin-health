import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Copy, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export interface DataSource {
  id: string;
  name: string;
  url: string;
}

interface DataSourceDropdownProps {
  sectionName: string;
  dataSources: DataSource[];
  onAddSource: (source: Omit<DataSource, "id">) => void;
  onRemoveSource: (id: string) => void;
}

const DataSourceDropdown = ({
  sectionName,
  dataSources,
  onAddSource,
  onRemoveSource,
}: DataSourceDropdownProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceUrl, setNewSourceUrl] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddSource = () => {
    if (newSourceName.trim() && newSourceUrl.trim()) {
      onAddSource({ name: newSourceName, url: newSourceUrl });
      setNewSourceName("");
      setNewSourceUrl("");
      setIsAddDialogOpen(false);
    }
  };

  const handleCopyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{sectionName} Sources</Label>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Source
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Data Source</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="source-name">Name</Label>
                <Input
                  id="source-name"
                  placeholder="e.g., Bank Account"
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source-url">URL</Label>
                <Input
                  id="source-url"
                  type="url"
                  placeholder="https://..."
                  value={newSourceUrl}
                  onChange={(e) => setNewSourceUrl(e.target.value)}
                />
              </div>
              <Button onClick={handleAddSource} className="w-full">
                Add Source
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {dataSources.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">No data sources added yet</p>
      ) : (
        <div className="space-y-2">
          {dataSources.map((source) => (
            <Card key={source.id} className="p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="font-medium text-sm">{source.name}</p>
                  <p className="text-xs text-muted-foreground truncate font-mono">
                    {source.url}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleCopyUrl(source.url, source.id)}
                  >
                    {copiedId === source.id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onRemoveSource(source.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataSourceDropdown;
