import { Skeleton } from "./ui/skeleton";

export function FeaturedRecipeHeroSkeleton() {
    return (
      <section className="py-12">
        <div className="container-custom">
          <h3 className="text-lg font-medium text-center mb-8 uppercase tracking-wide">
            <Skeleton className="h-6 w-1/3 mx-auto" />
          </h3>
  
          <div className="w-full">
            <div className="flex items-center overflow-hidden">
              <div className="flex w-full space-x-4 items-center">
                <Skeleton className="h-[400px] w-1/2 rounded-xl" />
                <div className="flex flex-col space-y-3 w-[250px] flex-shrink-0 justify-start">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-3/4" />
                </div>
              </div>
            </div>
          </div>
  
          <div className="flex justify-center mt-6">
            <Skeleton className="h-10 w-10 rounded-full mr-2" />
            <Skeleton className="h-10 w-10 rounded-full ml-2" />
          </div>
        </div>
      </section>
    );
  }