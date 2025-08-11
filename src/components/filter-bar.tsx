import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

interface FilterBarProps {
  types: string[]
  selectedTypes: string[]
  onTypeChange: (types: string[]) => void
}

export function FilterBar({ types, selectedTypes, onTypeChange }: FilterBarProps) {
  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter((t) => t !== type))
    } else {
      onTypeChange([...selectedTypes, type])
    }
  }

  const clearFilters = () => {
    onTypeChange([])
  }

  return (
    <div className="mb-8 p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">Filtrar por tipo</h3>
        {selectedTypes.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar filtros
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {types.map((type) => {
          const isSelected = selectedTypes.includes(type)
          return (
            <Button
              key={type}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => toggleType(type)}
              className={`transition-all duration-200 ${
                isSelected
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                  : "hover:bg-rose-50 hover:border-rose-300 dark:hover:bg-rose-950"
              }`}
            >
              {type}
              {isSelected && (
                <Badge variant="secondary" className="ml-2 bg-white/20">
                  {selectedTypes.filter((t) => t === type).length}
                </Badge>
              )}
            </Button>
          )
        })}
      </div>

      {selectedTypes.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <p className="text-sm text-muted-foreground">Mostrando productos de tipo: {selectedTypes.join(", ")}</p>
        </div>
      )}
    </div>
  )
}
