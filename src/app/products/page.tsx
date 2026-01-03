import { ProductGrid } from '@/components/products/product-grid';
import { FilterSidebar } from '@/components/products/filter-sidebar';
import { getProducts, getCategories } from '@/lib/api/products';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    category?: string;
    sort?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const category = searchParams?.category || 'all';
  const sort = searchParams?.sort || 'newest';
  const currentPage = Number(searchParams?.page) || 1;

  const { products, totalPages } = await getProducts({
    query,
    category,
    sort,
    page: currentPage,
  });
  const categories = await getCategories();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/products?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <FilterSidebar categories={categories} />
        </aside>
        <main className="md:col-span-3">
          {products.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 py-20 text-muted-foreground">
              No products found.
            </div>
          ) : (
            <>
              <ProductGrid products={products} />
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            href={createPageURL(currentPage - 1)}
                          />
                        </PaginationItem>
                      )}
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href={createPageURL(i + 1)}
                            isActive={currentPage === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext
                            href={createPageURL(currentPage + 1)}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
