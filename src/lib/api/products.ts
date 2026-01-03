import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import dbConnect from '@/lib/db-connect';
import ProductModel, { type IProduct } from '@/models/product';
import CategoryModel, { type ICategory } from '@/models/category';

export async function getProducts({
  query,
  category,
  sort,
  page = 1,
  limit = 9,
}: {
  query?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  noStore();
  await dbConnect();

  try {
    const filter: any = { isVisible: true };
    if (query) {
      filter.name = { $regex: query, $options: 'i' };
    }
    if (category && category !== 'all') {
      const categoryDoc = await CategoryModel.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    let sortOption: any = {};
    switch (sort) {
      case 'price-asc':
        sortOption = { price: 1 };
        break;
      case 'price-desc':
        sortOption = { price: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    const products = await ProductModel.find(filter)
      .populate<{ category: ICategory }>('category')
      .sort(sortOption)
      .limit(limit)
      .skip(limit * (page - 1))
      .lean();

    const count = await ProductModel.countDocuments(filter);

    return {
      products: JSON.parse(JSON.stringify(products)),
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: [], totalPages: 0 };
  }
}

export async function getProductBySlug(slug: string) {
  noStore();
  await dbConnect();

  try {
    const product = await ProductModel.findOne({ slug, isVisible: true })
      .populate<{ category: ICategory }>('category')
      .lean();
    if (!product) {
      return null;
    }
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error('Failed to fetch product by slug:', error);
    return null;
  }
}

export async function getCategories() {
  noStore();
  await dbConnect();

  try {
    const categories = await CategoryModel.find({}).sort({ name: 1 }).lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}
