import { Button } from "@/components/ui/button";
import { categoryTable } from "@/db/schema";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <div className="rounded-3xl bg-gray-100 p-6">
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className="rounded-full bg-gray-100 text-xs font-semibold hover:text-violet-900"
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
