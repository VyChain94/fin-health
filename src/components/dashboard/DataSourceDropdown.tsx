import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Link as LinkIcon, Copy, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  onUpdateSource?: (id: string, updates: Omit<DataSource, "id">) => void;
}

const DataSourceDropdown = ({
  sectionName,
  dataSources,
  onAddSource,
  onRemoveSource,
  onUpdateSource,
}: DataSourceDropdownProps) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<DataSource | null>(null);
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceUrl, setNewSourceUrl] = useState("");

  const handleAddSource = () => {
    if (newSourceName.trim() && newSourceUrl.trim()) {
      onAddSource({ name: newSourceName, url: newSourceUrl });
      setNewSourceName("");
      setNewSourceUrl("");
      setIsAddDialogOpen(false);
    }
  };

  const handleEditSource = () => {
    if (editingSource && newSourceName.trim() && newSourceUrl.trim()) {
      if (onUpdateSource) {
        onUpdateSource(editingSource.id, { name: newSourceName, url: newSourceUrl });
      } else {
        // Fallback to remove + add if no update function provided
        onRemoveSource(editingSource.id);
        onAddSource({ name: newSourceName, url: newSourceUrl });
      }
      setNewSourceName("");
      setNewSourceUrl("");
      setEditingSource(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleCopyUrl = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: `${name} URL copied to clipboard`,
    });
  };

  const openEditDialog = (source: DataSource) => {
    setEditingSource(source);
    setNewSourceName(source.name);
    setNewSourceUrl(source.url);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" className="gap-2">
            <LinkIcon className="h-4 w-4" />
            Data Sources
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64 bg-background">
          <div className="px-2 py-1.5 text-sm font-semibold">
            {sectionName} Sources
          </div>
          <DropdownMenuSeparator />
          
          {dataSources.length === 0 ? (
            <div className="px-2 py-6 text-center text-sm text-muted-foreground">
              No data sources added yet
            </div>
          ) : (
            dataSources.map((source) => (
              <div key={source.id} className="px-2 py-2 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm truncate">{source.name}</span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleCopyUrl(source.url, source.name)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => openEditDialog(source)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => onRemoveSource(source.id)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </div>
                <Input
                  value={source.url}
                  readOnly
                  className="text-xs h-7"
                  onClick={(e) => e.currentTarget.select()}
                />
              </div>
            ))
          )}
          
          <DropdownMenuSeparator />
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Source
              </DropdownMenuItem>
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
                    placeholder="e.g., Fidelity Account"
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
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Data Source</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-source-name">Name</Label>
              <Input
                id="edit-source-name"
                placeholder="e.g., Fidelity Account"
                value={newSourceName}
                onChange={(e) => setNewSourceName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-source-url">URL</Label>
              <Input
                id="edit-source-url"
                type="url"
                placeholder="https://..."
                value={newSourceUrl}
                onChange={(e) => setNewSourceUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleEditSource} className="w-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataSourceDropdown;
