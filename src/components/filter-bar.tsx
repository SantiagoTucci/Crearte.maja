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
    <div className="mb-8 p-5 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 shadow-lg">
      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-5">
        <Filter className="h-5 w-5 text-dusty-rose-600" />
        <h3 className="font-semibold text-dusty-rose-700 text-lg">Filtrar por tipo</h3>

        {selectedTypes.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto text-dusty-rose-600 hover:text-white hover:bg-gradient-to-r hover:from-blush-500 hover:to-dusty-rose-500 rounded-full px-4 py-1 shadow-sm transition-all duration-200"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Botones */}
      <div className="flex flex-wrap gap-3">
        {types.map((type) => {
          const isSelected = selectedTypes.includes(type)
          return (
            <Button
              key={type}
              size="sm"
              onClick={() => toggleType(type)}
              className={`rounded-full px-5 py-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 
                ${isSelected
                  ? "bg-gradient-to-r from-blush-700 to-dusty-rose-600 hover:from-blush-500 hover:to-dusty-rose-500 text-white"
                  : "bg-gradient-to-r from-blush-400 to-dusty-rose-400 hover:from-blush-500 hover:to-dusty-rose-500 text-white"
                }`}
            >
              {type}
              {isSelected && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-white/20 text-white text-xs rounded-full px-2"
                >
                  {selectedTypes.filter((t) => t === type).length}
                </Badge>
              )}
            </Button>
          )
        })}
      </div>

      {/* Lista de filtros activos */}
      {selectedTypes.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Productos seleccionados: <span className="font-medium text-dusty-rose-600">{selectedTypes.join(", ")}</span>
          </p>
        </div>
      )}
    </div>
  )
}
