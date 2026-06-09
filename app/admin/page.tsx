'use client';

import { useState, useEffect } from 'react';
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Flame, Package, LogOut,
  Save, X, Image as ImageIcon, ArrowLeft
} from 'lucide-react';
import { supabase, Product, CATEGORIES, formatPrice, toNumber } from '@/lib/supabase';
import Link from 'next/link';

const ADMIN_PASSWORD = 'idealwaysdeliver';

type ProductForm = {
  name: string;
  category: string;
  price: string;
  image_url: string;
  description: string;
  is_featured: boolean;
  is_in_stock: boolean;
};

const emptyForm: ProductForm = {
  name: '',
  category: 'iPhones',
  price: '',
  image_url: '',
  description: '',
  is_featured: false,
  is_in_stock: true,
};

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthed) fetchProducts();
  }, [isAuthed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name,
      category: form.category as Product['category'],
      price: parseInt(form.price, 10),
      image_url: form.image_url,
      description: form.description || null,
      is_featured: form.is_featured,
      is_in_stock: form.is_in_stock,
    };

    if (editingId) {
      const { error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', editingId);
      if (!error) {
        setProducts(prev =>
          prev.map(p => (p.id === editingId ? { ...p, ...payload } : p))
        );
      }
    } else {
      const { data, error } = await supabase
        .from('products')
        .insert(payload)
        .select()
        .single();
      if (!error && data) {
        setProducts(prev => [data, ...prev]);
      }
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setSaving(false);
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: toNumber(product.price).toString(),
      image_url: product.image_url,
      description: product.description || '',
      is_featured: product.is_featured ?? false,
      is_in_stock: product.is_in_stock ?? true,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
    setDeleteConfirm(null);
  };

  const toggleFeatured = async (product: Product) => {
    const newVal = !(product.is_featured ?? false);
    const { error } = await supabase
      .from('products')
      .update({ is_featured: newVal })
      .eq('id', product.id);
    if (!error) {
      setProducts(prev =>
        prev.map(p => (p.id === product.id ? { ...p, is_featured: newVal } : p))
      );
    }
  };

  const toggleInStock = async (product: Product) => {
    const newVal = !(product.is_in_stock ?? true);
    const { error } = await supabase
      .from('products')
      .update({ is_in_stock: newVal })
      .eq('id', product.id);
    if (!error) {
      setProducts(prev =>
        prev.map(p => (p.id === product.id ? { ...p, is_in_stock: newVal } : p))
      );
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
        <div className="bg-brand-card border border-brand-border rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <Package className="w-12 h-12 text-brand-green mx-auto mb-3" />
            <h1 className="font-syne text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-1">Chine Apples Communication</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setPasswordError(''); }}
                placeholder="Enter admin password"
                className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-400 text-sm">{passwordError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-brand-green text-black font-bold py-3 rounded-lg hover:bg-brand-green-dark transition"
            >
              Login
            </button>
          </form>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-gray-400 hover:text-white mt-4 text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Admin Header */}
      <header className="bg-brand-dark border-b border-brand-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-brand-green" />
            <h1 className="font-syne text-xl font-bold text-white">Admin Panel</h1>
            <span className="bg-brand-green/10 text-brand-green text-xs px-2 py-0.5 rounded-full">
              {products.length} Products
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Store
            </Link>
            <button
              onClick={() => setIsAuthed(false)}
              className="text-gray-400 hover:text-red-400 flex items-center gap-1 text-sm transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Add Product Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-syne text-lg font-semibold text-white">All Products</h2>
          <button
            onClick={() => {
              setForm(emptyForm);
              setEditingId(null);
              setShowForm(true);
            }}
            className="bg-brand-green text-black font-bold px-5 py-2.5 rounded-lg hover:bg-brand-green-dark transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-brand-dark border border-brand-border rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-syne text-xl font-bold text-white">
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Product Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-brand-card border border-brand-border rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none"
                    placeholder="e.g. iPhone 16 Pro Max"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Category</label>
                    <select
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-brand-card border border-brand-border rounded-lg px-4 py-2.5 text-white focus:border-brand-green outline-none"
                    >
                      {CATEGORIES.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Price (₦)</label>
                    <input
                      type="number"
                      required
                      value={form.price}
                      onChange={e => setForm({ ...form, price: e.target.value })}
                      className="w-full bg-brand-card border border-brand-border rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none"
                      placeholder="e.g. 850000"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Image URL</label>
                  <div className="relative">
                    <input
                      type="url"
                      required
                      value={form.image_url}
                      onChange={e => setForm({ ...form, image_url: e.target.value })}
                      className="w-full bg-brand-card border border-brand-border rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none pr-10"
                      placeholder="https://res.cloudinary.com/..."
                    />
                    <ImageIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                  {form.image_url && (
                    <div className="mt-2 rounded-lg overflow-hidden h-32 bg-brand-card">
                      <img
                        src={form.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full bg-brand-card border border-brand-border rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none resize-none"
                    placeholder="Product description (optional)"
                  />
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_featured}
                      onChange={e => setForm({ ...form, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded border-brand-border accent-brand-green"
                    />
                    <span className="text-sm text-gray-300 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-red-400" /> HOT Badge
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_in_stock}
                      onChange={e => setForm({ ...form, is_in_stock: e.target.checked })}
                      className="w-4 h-4 rounded border-brand-border accent-brand-green"
                    />
                    <span className="text-sm text-gray-300 flex items-center gap-1">
                      <Package className="w-3 h-3 text-brand-green" /> In Stock
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-brand-green text-black font-bold py-3 rounded-lg hover:bg-brand-green-dark transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}
                    className="px-6 py-3 bg-brand-card border border-brand-border rounded-lg text-gray-300 hover:text-white transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-brand-dark border border-brand-border rounded-2xl p-6 w-full max-w-sm">
              <h3 className="font-syne text-lg font-bold text-white mb-2">Delete Product?</h3>
              <p className="text-gray-400 text-sm mb-6">
                This action cannot be undone. The product will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 bg-red-500 text-white font-bold py-2.5 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-brand-card border border-brand-border text-gray-300 py-2.5 rounded-lg hover:text-white transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        {loading ? (
          <div className="grid gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-brand-card rounded-xl h-20 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="font-syne text-xl font-semibold text-white mb-2">No Products Yet</h3>
            <p className="text-gray-400 mb-6">Add your first product to get started.</p>
            <button
              onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
              className="bg-brand-green text-black font-bold px-6 py-3 rounded-lg hover:bg-brand-green-dark transition"
            >
              <Plus className="w-5 h-5 inline mr-1" /> Add Product
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-brand-card border border-brand-border rounded-xl p-4 flex items-center gap-4 hover:border-brand-green/30 transition group"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-brand-dark">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-syne font-semibold text-white truncate">{product.name}</h4>
                    {product.is_featured && (
                      <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Flame className="w-3 h-3" /> HOT
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-brand-green font-bold text-sm">{formatPrice(product.price)}</span>
                    <span className="text-gray-500 text-xs">{product.category}</span>
                    <span className={`text-xs flex items-center gap-1 ${(product.is_in_stock ?? true) ? 'text-brand-green' : 'text-red-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${(product.is_in_stock ?? true) ? 'bg-brand-green' : 'bg-red-400'}`} />
                      {(product.is_in_stock ?? true) ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFeatured(product)}
                    className={`p-2 rounded-lg transition ${(product.is_featured ?? false) ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-brand-dark text-gray-500 hover:text-red-400'}`}
                    title={(product.is_featured ?? false) ? 'Remove HOT badge' : 'Add HOT badge'}
                  >
                    <Flame className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleInStock(product)}
                    className={`p-2 rounded-lg transition ${(product.is_in_stock ?? true) ? 'bg-brand-green/10 text-brand-green hover:bg-brand-green/20' : 'bg-brand-dark text-gray-500 hover:text-brand-green'}`}
                    title={(product.is_in_stock ?? true) ? 'Mark out of stock' : 'Mark in stock'}
                  >
                    {(product.is_in_stock ?? true) ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 rounded-lg bg-brand-dark text-gray-500 hover:text-brand-green transition"
                    title="Edit product"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(product.id)}
                    className="p-2 rounded-lg bg-brand-dark text-gray-500 hover:text-red-400 transition"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
