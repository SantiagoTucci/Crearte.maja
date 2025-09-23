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
    <div className="mb-6 px-5 py-3.5 mt-4 bg-white/80 backdrop-blur-md rounded-2xl border border-sand-200 shadow-lg">
      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-4">
        <Filter className="h-5 w-5 text-brown-600" />
        <h3 className="font-semibold text-brown-700 text-lg">Filtrar por tipo</h3>

        {selectedTypes.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto text-brown-600 hover:text-white hover:bg-gradient-to-r hover:from-brown-600 hover:to-sand-600 rounded-full px-4 py-1 shadow-sm transition-all duration-200"
          >
            <X className="h-4 w-4 mr-1" />
            Restablecer
          </Button>
        )}
      </div>

      {/* Botones */}
      <div className="flex flex-wrap gap-2">
        {types.map((type) => {
          const isSelected = selectedTypes.includes(type)
          return (
            <Button
              key={type}
              size="sm"
              onClick={() => toggleType(type)}
              className={`rounded-full px-5 py-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 
                ${
                  isSelected
                    ? "bg-gradient-to-r from-brown-700 to-sand-600 hover:from-brown-600 hover:to-sand-500 text-white"
                    : "bg-gradient-to-r from-brown-400 to-sand-400 hover:from-brown-500 hover:to-sand-500 text-white"
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
        <div className="mt-3 pt-1.5 border-t border-sand-200">
          <p className="text-sm text-brown-600">
            Productos seleccionados: <span className="font-medium text-brown-700">{selectedTypes.join(", ")}</span>
          </p>
        </div>
      )}
    </div>
  )
}
