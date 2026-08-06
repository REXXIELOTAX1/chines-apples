'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save } from 'lucide-react';

interface WarrantySection {
  id: string;
  section_key: string;
  title: string;
  content: string;
  display_order: number;
}

export default function AdminWarrantyPage() {
  const [sections, setSections] = useState<WarrantySection[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      const { data, error } = await supabase
        .from('warranty_content')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error) setSections(data || []);
      setLoading(false);
    };
    fetchSections();
  }, []);

  const handleChange = (id: string, field: 'title' | 'content', value: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = async (section: WarrantySection) => {
    setSavingId(section.id);
    const { error } = await supabase
      .from('warranty_content')
      .update({ title: section.title, content: section.content, updated_at: new Date().toISOString() })
      .eq('id', section.id);
    setSavingId(null);
    if (error) alert('Failed to save: ' + error.message);
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-brand-black p-6 md:p-10">
      <h1 className="text-white font-syne text-2xl font-bold mb-6">
        Edit Warranty Content
      </h1>

      <div className="space-y-6 max-w-3xl">
        {sections.map((section) => (
          <div key={section.id} className="bg-brand-card border border-brand-border rounded-xl p-5">
            <label className="text-gray-400 text-sm mb-1 block">Title</label>
            <input
              type="text"
              value={section.title}
              onChange={(e) => handleChange(section.id, 'title', e.target.value)}
              className="w-full bg-brand-black border border-brand-border rounded-lg px-3 py-2 text-white mb-4"
            />

            <label className="text-gray-400 text-sm mb-1 block">Content</label>
            <textarea
              value={section.content}
              onChange={(e) => handleChange(section.id, 'content', e.target.value)}
              rows={4}
              className="w-full bg-brand-black border border-brand-border rounded-lg px-3 py-2 text-white mb-4"
            />

            <button
              onClick={() => handleSave(section)}
              disabled={savingId === section.id}
              className="flex items-center gap-2 bg-brand-green text-black font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
            >
              <Save size={16} />
              {savingId === section.id ? 'Saving...' : 'Save'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}