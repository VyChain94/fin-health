import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface DataSource {
  id: string;
  name: string;
  url: string;
}

interface DataSourcesBySection {
  income: DataSource[];
  expenses: DataSource[];
  assets: DataSource[];
  liabilities: DataSource[];
}

type SectionName = keyof DataSourcesBySection;

export function useDataSources() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dataSources, setDataSources] = useState<DataSourcesBySection>({
    income: [],
    expenses: [],
    assets: [],
    liabilities: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch all data sources for the user
  const fetchDataSources = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_data_sources')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      // Group by section
      const grouped: DataSourcesBySection = {
        income: [],
        expenses: [],
        assets: [],
        liabilities: [],
      };

      data?.forEach((source) => {
        const section = source.section as SectionName;
        if (grouped[section]) {
          grouped[section].push({
            id: source.id,
            name: source.name,
            url: source.url,
          });
        }
      });

      setDataSources(grouped);
    } catch (error) {
      console.error('Error fetching data sources:', error);
      toast({
        title: 'Error',
        description: 'Failed to load data sources',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchDataSources();
  }, [fetchDataSources]);

  // Add a new data source (immediately saves to database)
  const addDataSource = useCallback(
    async (section: SectionName, source: Omit<DataSource, 'id'>) => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_data_sources')
          .insert({
            user_id: user.id,
            section,
            name: source.name,
            url: source.url,
          })
          .select()
          .single();

        if (error) throw error;

        // Update local state
        setDataSources((prev) => ({
          ...prev,
          [section]: [
            ...prev[section],
            { id: data.id, name: data.name, url: data.url },
          ],
        }));

        toast({
          title: 'Saved',
          description: 'Data source added successfully',
        });
      } catch (error) {
        console.error('Error adding data source:', error);
        toast({
          title: 'Error',
          description: 'Failed to add data source',
          variant: 'destructive',
        });
      }
    },
    [user, toast]
  );

  // Remove a data source (immediately deletes from database)
  const removeDataSource = useCallback(
    async (section: SectionName, id: string) => {
      if (!user) return;

      try {
        const { error } = await supabase
          .from('user_data_sources')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;

        // Update local state
        setDataSources((prev) => ({
          ...prev,
          [section]: prev[section].filter((s) => s.id !== id),
        }));

        toast({
          title: 'Removed',
          description: 'Data source removed successfully',
        });
      } catch (error) {
        console.error('Error removing data source:', error);
        toast({
          title: 'Error',
          description: 'Failed to remove data source',
          variant: 'destructive',
        });
      }
    },
    [user, toast]
  );

  // Update a data source (immediately updates in database)
  const updateDataSource = useCallback(
    async (section: SectionName, id: string, updates: Omit<DataSource, 'id'>) => {
      if (!user) return;

      try {
        const { error } = await supabase
          .from('user_data_sources')
          .update({
            name: updates.name,
            url: updates.url,
          })
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;

        // Update local state
        setDataSources((prev) => ({
          ...prev,
          [section]: prev[section].map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        }));

        toast({
          title: 'Updated',
          description: 'Data source updated successfully',
        });
      } catch (error) {
        console.error('Error updating data source:', error);
        toast({
          title: 'Error',
          description: 'Failed to update data source',
          variant: 'destructive',
        });
      }
    },
    [user, toast]
  );

  return {
    dataSources,
    loading,
    addDataSource,
    removeDataSource,
    updateDataSource,
    refreshDataSources: fetchDataSources,
  };
}
