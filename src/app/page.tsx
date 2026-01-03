import { ProductGrid } from "@/components/products/product-grid";
import { FilterSidebar } from "@/components/products/filter-sidebar";
import { getProducts, getCategories } from "@/lib/data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    category?: string;
    sort?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const category = searchParams?.category || "all";
  const sort = searchParams?.sort || "newest";
  const currentPage = Number(searchParams?.page) || 1;
  
  const { products, totalPages } = await getProducts({ query, category, sort, page: currentPage });
  const categories = await getCategories();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (category && category !== 'all') params.set('category', category);
    if (sort && sort !== 'newest') params.set('sort', sort);
    params.set('page', pageNumber.toString());
    return `/?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <FilterSidebar categories={categories} />
        </aside>
        <main className="lg:col-span-3">
          {products.length === 0 ? (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No products found.
            </div>
          ) : (
            <>
              <ProductGrid products={products} />
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href={createPageURL(currentPage - 1)}
                          aria-disabled={currentPage <= 1}
                          tabIndex={currentPage <= 1 ? -1 : undefined}
                          className={
                            currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                          }
                        />
                      </PaginationItem>
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

                      <PaginationItem>
                        <PaginationNext
                          href={createPageURL(currentPage + 1)}
                           aria-disabled={currentPage >= totalPages}
                          tabIndex={currentPage >= totalPages ? -1 : undefined}
                          className={
                            currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined
                          }
                        />
                      </PaginationItem>
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
