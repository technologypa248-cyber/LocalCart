'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Category } from '@/lib/definitions';
import { Button } from '../ui/button';

type FilterSidebarProps = {
  categories: Category[];
};

export function FilterSidebar({ categories }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: 'category' | 'sort', value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.replace(pathname);
  };
  
  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'newest';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-semibold">Category</Label>
          <RadioGroup 
            value={currentCategory} 
            onValueChange={(value) => handleFilterChange('category', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="cat-all" />
              <Label htmlFor="cat-all">All</Label>
            </div>
            {categories.map((category) => (
              <div key={category.slug} className="flex items-center space-x-2">
                <RadioGroupItem value={category.slug} id={`cat-${category.slug}`} />
                <Label htmlFor={`cat-${category.slug}`}>{category.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sort" className="text-base font-semibold">Sort by</Label>
          <Select value={currentSort} onValueChange={(value) => handleFilterChange('sort', value)}>
            <SelectTrigger id="sort" className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(searchParams.has('category') || searchParams.has('sort') || searchParams.has('query')) && (
            <Button variant="ghost" className="w-full" onClick={clearFilters}>
                Clear All Filters
            </Button>
        )}
      </CardContent>
    </Card>
  );
}
