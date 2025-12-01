"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Plus, Edit, Trash } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    inStock: true,
    featured: false,
    category: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch("/api/product");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create product");

      await fetchProducts();
      setOpen(false);
      setForm({
        name: "",
        price: "",
        description: "",
        image: "",
        inStock: true,
        featured: false,
        category: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error creating product");
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploading(false);
    setForm((prev) => ({ ...prev, image: data.url }));
  }

  // ✅ Delete Product
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/product/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  }

  if (loading) return <div className="p-6">Loading products...</div>;

  return (
    <div className="p-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold mb-3 sm:mb-0">Products</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={18} /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
              <div>
                <Label>Image</Label>
                <Input type="file" onChange={handleFileUpload} />
                {uploading ? (
                  <p className="text-sm text-gray-500 mt-1">Uploading...</p>
                ) : (
                  form.image && (
                    <img
                      src={form.image}
                      alt="preview"
                      className="mt-2 h-20 rounded"
                    />
                  )
                )}
              </div>
              <Button type="submit" className="w-full mt-3">
                Save Product
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Product Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product.id}
              className="shadow-md hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{product.name}</span>
                  <span className="text-sm text-gray-500">
                    ${product.price}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center text-sm text-gray-600">
                <div>
                  <p>{product.category}</p>
                  <p className="text-xs text-gray-400">
                    Added: {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
