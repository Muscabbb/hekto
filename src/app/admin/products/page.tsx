"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import {
  GenderEnum,
  SeasonEnum,
  UsageEnum,
  productSchema,
  type Gender,
  type Season,
  type Usage,
} from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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

// ProductFormData interface is now defined using Zod schema above

const CATEGORIES = [
  "Apparel",
  "Accessories",
  "Footwear",
  "Personal Care",
  "Free Items",
  "Sporting Goods",
  "Home",
];

const SUBCATEGORIES = [
  "Topwear",
  "Bottomwear",
  "Watches",
  "Socks",
  "Shoes",
  "Belts",
  "Wallets",
  "Sunglasses",
  "Bags",
  "Ties",
  "Accessory Gift Set",
  "Fragrance",
  "Jewellery",
  "Lips",
  "Saree",
  "Lounge Pants",
  "Sandals",
  "Shrug",
  "Loungewear and Nightwear",
  "Wallets",
  "Apparel Set",
  "Headwear",
  "Innerwear Vests",
  "Skirts",
  "Dress",
  "Leggings",
  "Dupatta",
  "Capris",
  "Lip Gloss",
  "Bath and Body",
  "Makeup",
  "Free Gifts",
  "Nail",
  "Hair",
  "Skin",
  "Skin Care",
  "Eyes",
  "Beauty Accessories",
  "Water Bottle",
  "Laptop Bag",
  "Sports Sandals",
  "Flip Flops",
  "Clothing Set",
  "Robe",
  "Sweaters",
  "Waistcoat",
  "Kurtas",
  "Kurta Sets",
  "Tshirts",
  "Casual Shoes",
  "Sports Shoes",
  "Formal Shoes",
  "Flats",
  "Heels",
  "Flip Flops",
];

const ARTICLE_TYPES = [
  "Shirts",
  "Jeans",
  "Watches",
  "Sports Shoes",
  "Tshirts",
  "Socks",
  "Casual Shoes",
  "Belts",
  "Flip Flops",
  "Formal Shoes",
  "Backpacks",
  "Tops",
  "Handbags",
  "Kurtas",
  "Sunglasses",
  "Waistcoat",
  "Wallets",
  "Lounge Pants",
  "Sandals",
  "Shorts",
  "Trousers",
  "Kurta Sets",
  "Heels",
  "Laptop Bag",
  "Sports Sandals",
  "Flats",
  "Ring",
  "Tracksuits",
  "Swimwear",
  "Shoe Accessories",
  "Fragrance",
  "Sweaters",
  "Jackets",
  "Ties",
  "Accessory Gift Set",
  "Caps",
  "Nightdress",
  "Juttis",
  "Clutches",
  "Shrug",
  "Ballerinas",
  "Dupatta",
  "Capris",
  "Lip Gloss",
  "Bath and Body",
  "Makeup",
  "Saree",
  "Jewellery",
  "Nail",
  "Hair",
  "Skin",
  "Eyes",
  "Beauty Accessories",
  "Water Bottle",
  "Clothing Set",
  "Robe",
  "Leggings",
  "Skirts",
  "Dress",
  "Innerwear Vests",
  "Headwear",
  "Apparel Set",
  "Free Gifts",
  "Loungewear and Nightwear",
  "Lips",
  "Skin Care",
];

// Arrays for UI components (derived from enums)
const GENDERS = GenderEnum.options;
const SEASONS = SeasonEnum.options;
const USAGE = UsageEnum.options;

type ProductFormData = z.infer<typeof productSchema> & { id?: number };

export default function ProductsManagement() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductsType | null>(
    null
  );
  const [imagePreview, setImagePreview] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [formData, setFormData] = useState<ProductFormData>({
    price: 0,
    articleType: "",
    baseColour: "",
    gender: "Men",
    image: "",
    masterCategory: "",
    productDisplayName: "",
    season: "Fall",
    subCategory: "",
    usage: "Casual",
    year: new Date().getFullYear().toString(),
  });

  // State for custom categories
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [customSubCategories, setCustomSubCategories] = useState<string[]>([]);
  const [customArticleTypes, setCustomArticleTypes] = useState<string[]>([]);

  // State for combobox open/close
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [openArticleType, setOpenArticleType] = useState(false);

  // Helper functions to get all categories (predefined + custom)
  const getAllCategories = () => [...CATEGORIES, ...customCategories];
  const getAllSubCategories = () => [...SUBCATEGORIES, ...customSubCategories];
  const getAllArticleTypes = () => [...ARTICLE_TYPES, ...customArticleTypes];

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

  // Helper functions for handling category selection and adding new ones
  const handleCategorySelect = (value: string) => {
    if (value && !getAllCategories().includes(value)) {
      setCustomCategories([...customCategories, value]);
      toast.success("New category added!");
    }
    setFormData({ ...formData, masterCategory: value });
    setOpenCategory(false);
  };

  const handleSubCategorySelect = (value: string) => {
    if (value && !getAllSubCategories().includes(value)) {
      setCustomSubCategories([...customSubCategories, value]);
      toast.success("New subcategory added!");
    }
    setFormData({ ...formData, subCategory: value });
    setOpenSubCategory(false);
  };

  const handleArticleTypeSelect = (value: string) => {
    if (value && !getAllArticleTypes().includes(value)) {
      setCustomArticleTypes([...customArticleTypes, value]);
      toast.success("New article type added!");
    }
    setFormData({ ...formData, articleType: value });
    setOpenArticleType(false);
  };

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, image: url });
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    try {
      // Validate form data with Zod
      const validatedData = productSchema.parse({
        ...formData,
        price: Number(formData.price),
      });

      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : "/api/admin/products";

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
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
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setValidationErrors(errors);
        toast.error("Please fix the validation errors");
      } else {
        console.error("Error saving product:", error);
        toast.error("Failed to save product");
      }
    }
  };

  const handleEdit = (product: ProductsType) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      price: product.price,
      articleType: product.articleType,
      baseColour: product.baseColour,
      gender: product.gender as Gender,
      image: product.image,
      masterCategory: product.masterCategory,
      productDisplayName: product.productDisplayName,
      season: product.season as Season,
      subCategory: product.subCategory,
      usage: product.usage as Usage,
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
      gender: "Men",
      image: "",
      masterCategory: "",
      productDisplayName: "",
      season: "Fall",
      subCategory: "",
      usage: "Casual",
      year: new Date().getFullYear().toString(),
    });
    setEditingProduct(null);
    setImagePreview("");
    setValidationErrors({});
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
                      className={`w-full ${
                        validationErrors.productDisplayName
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      required
                    />
                    {validationErrors.productDisplayName && (
                      <p className="text-sm text-red-500">
                        {validationErrors.productDisplayName}
                      </p>
                    )}
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
                      className={`w-full ${
                        validationErrors.price
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      required
                    />
                    {validationErrors.price && (
                      <p className="text-sm text-red-500">
                        {validationErrors.price}
                      </p>
                    )}
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
                    <Popover open={openCategory} onOpenChange={setOpenCategory}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCategory}
                          className={`w-full justify-between ${
                            validationErrors.masterCategory
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                        >
                          {formData.masterCategory ||
                            "Select or type category..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search or type new category..."
                            value={formData.masterCategory}
                            onValueChange={(value) =>
                              setFormData({
                                ...formData,
                                masterCategory: value,
                              })
                            }
                          />
                          <CommandEmpty>
                            <div className="p-2">
                              <Button
                                className="w-full"
                                onClick={() =>
                                  handleCategorySelect(formData.masterCategory)
                                }
                                disabled={!formData.masterCategory?.trim()}
                              >
                                Add {formData.masterCategory}
                              </Button>
                            </div>
                          </CommandEmpty>
                          <CommandGroup>
                            {getAllCategories().map((category) => (
                              <CommandItem
                                key={category}
                                value={category}
                                onSelect={() => handleCategorySelect(category)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.masterCategory === category
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {category}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {validationErrors.masterCategory && (
                      <p className="text-sm text-red-500">
                        {validationErrors.masterCategory}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="subCategory"
                      className="text-sm font-medium"
                    >
                      Sub Category
                    </Label>
                    <Popover
                      open={openSubCategory}
                      onOpenChange={setOpenSubCategory}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openSubCategory}
                          className={`w-full justify-between ${
                            validationErrors.subCategory
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                        >
                          {formData.subCategory ||
                            "Select or type subcategory..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search or type new subcategory..."
                            value={formData.subCategory}
                            onValueChange={(value) =>
                              setFormData({ ...formData, subCategory: value })
                            }
                          />
                          <CommandEmpty>
                            <div className="p-2">
                              <Button
                                className="w-full"
                                onClick={() =>
                                  handleSubCategorySelect(formData.subCategory)
                                }
                                disabled={!formData.subCategory?.trim()}
                              >
                                Add {formData.subCategory}
                              </Button>
                            </div>
                          </CommandEmpty>
                          <CommandGroup>
                            {getAllSubCategories().map((subCategory) => (
                              <CommandItem
                                key={subCategory}
                                value={subCategory}
                                onSelect={() =>
                                  handleSubCategorySelect(subCategory)
                                }
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.subCategory === subCategory
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {subCategory}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {validationErrors.subCategory && (
                      <p className="text-sm text-red-500">
                        {validationErrors.subCategory}
                      </p>
                    )}
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
                      onValueChange={(value: Gender) =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger
                        className={`w-full ${
                          validationErrors.gender
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      >
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
                    {validationErrors.gender && (
                      <p className="text-sm text-red-500">
                        {validationErrors.gender}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="articleType"
                      className="text-sm font-medium"
                    >
                      Article Type
                    </Label>
                    <Popover
                      open={openArticleType}
                      onOpenChange={setOpenArticleType}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openArticleType}
                          className={`w-full justify-between ${
                            validationErrors.articleType
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                        >
                          {formData.articleType ||
                            "Select or type article type..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search or type new article type..."
                            value={formData.articleType}
                            onValueChange={(value) =>
                              setFormData({ ...formData, articleType: value })
                            }
                          />
                          <CommandEmpty>
                            <div className="p-2">
                              <Button
                                className="w-full"
                                onClick={() =>
                                  handleArticleTypeSelect(formData.articleType)
                                }
                                disabled={!formData.articleType?.trim()}
                              >
                                Add {formData.articleType}
                              </Button>
                            </div>
                          </CommandEmpty>
                          <CommandGroup>
                            {getAllArticleTypes().map((articleType) => (
                              <CommandItem
                                key={articleType}
                                value={articleType}
                                onSelect={() =>
                                  handleArticleTypeSelect(articleType)
                                }
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.articleType === articleType
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {articleType}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {validationErrors.articleType && (
                      <p className="text-sm text-red-500">
                        {validationErrors.articleType}
                      </p>
                    )}
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
                      className={`w-full ${
                        validationErrors.baseColour
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      required
                    />
                    {validationErrors.baseColour && (
                      <p className="text-sm text-red-500">
                        {validationErrors.baseColour}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="season" className="text-sm font-medium">
                      Season
                    </Label>
                    <Select
                      value={formData.season}
                      onValueChange={(value: Season) =>
                        setFormData({ ...formData, season: value })
                      }
                    >
                      <SelectTrigger
                        className={`w-full ${
                          validationErrors.season
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      >
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
                    {validationErrors.season && (
                      <p className="text-sm text-red-500">
                        {validationErrors.season}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usage" className="text-sm font-medium">
                      Usage
                    </Label>
                    <Select
                      value={formData.usage}
                      onValueChange={(value: Usage) =>
                        setFormData({ ...formData, usage: value })
                      }
                    >
                      <SelectTrigger
                        className={`w-full ${
                          validationErrors.usage
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      >
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
                    {validationErrors.usage && (
                      <p className="text-sm text-red-500">
                        {validationErrors.usage}
                      </p>
                    )}
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
                    className={`w-full ${
                      validationErrors.year
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    required
                  />
                  {validationErrors.year && (
                    <p className="text-sm text-red-500">
                      {validationErrors.year}
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Product Image</Label>
                  <div
                    className={`flex flex-col items-center space-y-4 p-4 border-2 border-dashed rounded-lg ${
                      validationErrors.image
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
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
                          unoptimized={true}
                          className="rounded-lg object-cover border"
                        />
                      </div>
                    )}
                  </div>
                  {validationErrors.image && (
                    <p className="text-sm text-red-500">
                      {validationErrors.image}
                    </p>
                  )}
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
