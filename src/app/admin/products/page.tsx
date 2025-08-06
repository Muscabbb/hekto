"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { ProductsType } from "@/types/productsType";
import { TableSkeleton } from "@/components/ui/loading";
import { UploadButton } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";

interface ProductFormData {
  id?: number;
  price: number;
  articleType: string;
  baseColour: string;
  gender: string;
  image: string;
  masterCategory: string;
  productDisplayName: string;
  season: string;
  subCategory: string;
  usage: string;
  year: string;
}

const CATEGORIES = [
  "Apparel",
  "Accessories",
  "Footwear",
  "Personal Care",
  "Free Items",
  "Sporting Goods",
  "Home",
];

const GENDERS = ["Men", "Women", "Boys", "Girls", "Unisex"];
const SEASONS = ["Summer", "Winter", "Spring", "Fall"];
const USAGE = ["Casual", "Formal", "Sports", "Ethnic", "Party"];

export default function ProductsManagement() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductsType | null>(
    null
  );
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState<ProductFormData>({
    price: 0,
    articleType: "",
    baseColour: "",
    gender: "",
    image: "",
    masterCategory: "",
    productDisplayName: "",
    season: "",
    subCategory: "",
    usage: "",
    year: new Date().getFullYear().toString(),
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, image: url });
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
      };

      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : "/api/admin/products";

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        toast.success(
          editingProduct
            ? "Product updated successfully"
            : "Product created successfully"
        );
        setIsDialogOpen(false);
        resetForm();
        fetchProducts();
      } else {
        throw new Error("Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  const handleEdit = (product: ProductsType) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      price: product.price,
      articleType: product.articleType,
      baseColour: product.baseColour,
      gender: product.gender,
      image: product.image,
      masterCategory: product.masterCategory,
      productDisplayName: product.productDisplayName,
      season: product.season,
      subCategory: product.subCategory,
      usage: product.usage,
      year: product.year,
    });
    setImagePreview(product.image);
    setIsDialogOpen(true);
  };

  const handleDelete = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const resetForm = () => {
    setFormData({
      price: 0,
      articleType: "",
      baseColour: "",
      gender: "",
      image: "",
      masterCategory: "",
      productDisplayName: "",
      season: "",
      subCategory: "",
      usage: "",
      year: new Date().getFullYear().toString(),
    });
    setEditingProduct(null);
    setImagePreview("");
  };

  const filteredProducts = products.filter(
    (product) =>
      product.productDisplayName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.masterCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Products Management
            </h1>
            <p className="text-gray-600">Manage your product catalog</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={resetForm}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="fixed right-0 top-0 h-full w-auto min-w-[500px] max-w-[600px] rounded-none border-l data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-semibold">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 p-4">
                {/* Product Name and Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="productDisplayName"
                      className="text-sm font-medium"
                    >
                      Product Name
                    </Label>
                    <Input
                      id="productDisplayName"
                      value={formData.productDisplayName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productDisplayName: e.target.value,
                        })
                      }
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                {/* Category and Sub Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="masterCategory"
                      className="text-sm font-medium"
                    >
                      Category
                    </Label>
                    <Select
                      value={formData.masterCategory}
                      onValueChange={(value) =>
                        setFormData({ ...formData, masterCategory: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="subCategory"
                      className="text-sm font-medium"
                    >
                      Sub Category
                    </Label>
                    <Input
                      id="subCategory"
                      value={formData.subCategory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subCategory: e.target.value,
                        })
                      }
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                {/* Gender and Article Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-medium">
                      Gender
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {GENDERS.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="articleType"
                      className="text-sm font-medium"
                    >
                      Article Type
                    </Label>
                    <Input
                      id="articleType"
                      value={formData.articleType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          articleType: e.target.value,
                        })
                      }
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                {/* Color, Season, and Usage */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="baseColour" className="text-sm font-medium">
                      Color
                    </Label>
                    <Input
                      id="baseColour"
                      value={formData.baseColour}
                      onChange={(e) =>
                        setFormData({ ...formData, baseColour: e.target.value })
                      }
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="season" className="text-sm font-medium">
                      Season
                    </Label>
                    <Select
                      value={formData.season}
                      onValueChange={(value) =>
                        setFormData({ ...formData, season: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        {SEASONS.map((season) => (
                          <SelectItem key={season} value={season}>
                            {season}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usage" className="text-sm font-medium">
                      Usage
                    </Label>
                    <Select
                      value={formData.usage}
                      onValueChange={(value) =>
                        setFormData({ ...formData, usage: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select usage" />
                      </SelectTrigger>
                      <SelectContent>
                        {USAGE.map((usage) => (
                          <SelectItem key={usage} value={usage}>
                            {usage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-sm font-medium">
                    Year
                  </Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Product Image</Label>
                  <div className="flex flex-col items-center space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res[0]) {
                          handleImageUpload(res[0].url);
                          toast.success("Image uploaded successfully!");
                        }
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`Upload failed: ${error.message}`);
                      }}
                    />
                    {imagePreview && (
                      <div className="mt-4">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={120}
                          height={120}
                          className="rounded-lg object-cover border"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-center space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="px-6"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="px-6 bg-blue-600 hover:bg-blue-700"
                  >
                    {editingProduct ? "Update" : "Create"} Product
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full">
              <TableSkeleton rows={8} />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products found.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square relative">
                  <Image
                    src={product.image || "/placeholder.jpg"}
                    alt={product.productDisplayName}
                    fill
                    unoptimized={true}
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {product.productDisplayName}
                  </h3>
                  <p className="text-lg font-bold text-blue-600 mb-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {product.masterCategory} • {product.gender}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(product)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                      className="flex-1"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
