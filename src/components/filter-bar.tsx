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
    <div className="mb-6 p-5 bg-white/80 backdrop-blur-md rounded-2xl border border-sand-200 shadow-lg">
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
            Limpiar filtros
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

      <div className="relative overflow-hidden bg-gradient-to-r from-sand-600 to-sand-700 rounded-xl px-6 py-2 shadow-md animate-fade-in hover:shadow-lg transition-all duration-300 hover:scale-[1.01] mt-6">
        <div className="absolute inset-0 bg-gradient-to-r from-sand-600/80 to-sand-700/80"></div>
        <div className="relative z-10 flex items-center justify-between text-white">
          
          <div className="flex items-center gap-2">
            <div className="bg-white/20 rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <span className="text-white/90 text-sm font-medium uppercase tracking-wider">
              Oferta Mayorista
            </span>
          </div>

          <p className="text-center text-sm sm:text-base font-medium flex-1">
            Llevando <span className="font-bold">5 unidades</span> de la misma pieza tenés un{" "}
            <span className="font-bold">30% de descuento</span>
          </p>
        </div>
      </div>

      {/* Lista de filtros activos */}
      {selectedTypes.length > 0 && (
        <div className="mt-4 pt-3 border-t border-sand-200">
          <p className="text-sm text-brown-600">
            Productos seleccionados: <span className="font-medium text-brown-700">{selectedTypes.join(", ")}</span>
          </p>
        </div>
      )}
    </div>
  )
}
