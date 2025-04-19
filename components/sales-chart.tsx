"use client"

import { useEffect, useRef } from "react"

export function SalesChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configuración del canvas para alta resolución
    const devicePixelRatio = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * devicePixelRatio
    canvas.height = canvas.offsetHeight * devicePixelRatio
    ctx.scale(devicePixelRatio, devicePixelRatio)

    // Datos de ventas semanales
    const data = [4200, 5100, 4800, 6300, 5600, 7100, 6500]
    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

    // Dimensiones y márgenes
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    // Escala para el eje Y
    const maxValue = Math.max(...data) * 1.1
    const yScale = (value: number) => chartHeight - (value / maxValue) * chartHeight

    // Escala para el eje X
    const barWidth = (chartWidth / data.length) * 0.7
    const barSpacing = chartWidth / data.length

    // Dibujar ejes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0" // Color gris claro
    ctx.moveTo(margin.left, margin.top)
    ctx.lineTo(margin.left, height - margin.bottom)
    ctx.lineTo(width - margin.right, height - margin.bottom)
    ctx.stroke()

    // Dibujar líneas horizontales de referencia
    const numLines = 5
    ctx.textAlign = "right"
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#64748b" // Color texto

    for (let i = 0; i <= numLines; i++) {
      const y = margin.top + (chartHeight / numLines) * i
      const value = Math.round(maxValue - (maxValue / numLines) * i)

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0" // Color gris claro
      ctx.moveTo(margin.left, y)
      ctx.lineTo(width - margin.right, y)
      ctx.stroke()

      ctx.fillText(`$${value}`, margin.left - 5, y + 3)
    }

    // Dibujar barras y etiquetas
    ctx.textAlign = "center"

    data.forEach((value, index) => {
      const x = margin.left + barSpacing * index + barSpacing / 2 - barWidth / 2
      const y = margin.top + yScale(value)
      const barHeight = chartHeight - yScale(value)

      // Gradiente para las barras
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.8)") // Verde esmeralda
      gradient.addColorStop(1, "rgba(16, 185, 129, 0.4)")

      // Dibujar barra
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0])
      ctx.fill()

      // Etiqueta del día
      ctx.fillStyle = "#64748b"
      ctx.fillText(days[index], x + barWidth / 2, height - margin.bottom + 15)

      // Valor sobre la barra
      ctx.fillStyle = "#334155"
      ctx.font = "bold 10px sans-serif"
      ctx.fillText(`$${value}`, x + barWidth / 2, y - 5)
    })
  }, [])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
