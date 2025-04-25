import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Datos simulados para las métricas
const generateVisitsData = () => {
  const now = new Date();
  const data = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generar número entre 50 y 300 con tendencia creciente
    const baseVisits = 50 + Math.floor(Math.random() * 100);
    const trendFactor = 1 + (i / 30) * 0.5; // Factor que aumenta con el tiempo
    const visits = Math.floor(baseVisits * trendFactor);
    
    data.push({
      date: date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      visits: visits,
      uniqueVisitors: Math.floor(visits * 0.7),
    });
  }
  
  return data;
};

// Datos simulados para fuentes de tráfico
const trafficSourcesData = [
  { name: 'Directo', value: 35 },
  { name: 'Redes Sociales', value: 45 },
  { name: 'Búsquedas', value: 15 },
  { name: 'Referencias', value: 5 },
];

// Datos simulados para dispositivos
const devicesData = [
  { name: 'Móvil', value: 65 },
  { name: 'Desktop', value: 30 },
  { name: 'Tablet', value: 5 },
];

// Colores para las gráficas
const colors = {
  primary: 'rgb(167, 42, 42)',
  secondary: 'rgba(167, 42, 42, 0.7)',
  tertiary: 'rgba(167, 42, 42, 0.4)',
  grid: '#e5e7eb',
};

export function MetricsDashboard() {
  const [visitsData] = useState(generateVisitsData);
  const [timeRange, setTimeRange] = useState('30d');
  
  // Calcular totales
  const totalVisits = visitsData.reduce((sum, item) => sum + item.visits, 0);
  const totalUniqueVisitors = visitsData.reduce((sum, item) => sum + item.uniqueVisitors, 0);
  
  // Calcular aumento porcentual
  const firstWeekVisits = visitsData.slice(0, 7).reduce((sum, item) => sum + item.visits, 0);
  const lastWeekVisits = visitsData.slice(-7).reduce((sum, item) => sum + item.visits, 0);
  const growthRate = ((lastWeekVisits - firstWeekVisits) / firstWeekVisits) * 100;
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="30d" value={timeRange} onValueChange={setTimeRange} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Analíticas del Sitio</h2>
          <TabsList>
            <TabsTrigger value="7d">7 días</TabsTrigger>
            <TabsTrigger value="15d">15 días</TabsTrigger>
            <TabsTrigger value="30d">30 días</TabsTrigger>
          </TabsList>
        </div>
        
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Visitas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVisits.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className={growthRate >= 0 ? "text-green-500" : "text-red-500"}>
                  {growthRate >= 0 ? "+" : ""}{growthRate.toFixed(1)}%
                </span>{" "}
                desde hace un mes
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUniqueVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {(totalUniqueVisitors / totalVisits * 100).toFixed(1)}% del total de visitas
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Promedio Diario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(totalVisits / visitsData.length).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Visitas por día
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Chart */}
        <TabsContent value="7d" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visitas (Últimos 7 días)</CardTitle>
              <CardDescription>
                Análisis de visitas al sitio web en la última semana
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitsData.slice(-7)}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorUniqueVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colors.secondary} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="visits"
                      stroke={colors.primary}
                      fillOpacity={1}
                      fill="url(#colorVisits)"
                      name="Visitas Totales"
                    />
                    <Area
                      type="monotone"
                      dataKey="uniqueVisitors"
                      stroke={colors.secondary}
                      fillOpacity={1}
                      fill="url(#colorUniqueVisitors)"
                      name="Visitantes Únicos"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="15d" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visitas (Últimos 15 días)</CardTitle>
              <CardDescription>
                Análisis de visitas al sitio web en las últimas dos semanas
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitsData.slice(-15)}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorUniqueVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colors.secondary} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="visits"
                      stroke={colors.primary}
                      fillOpacity={1}
                      fill="url(#colorVisits)"
                      name="Visitas Totales"
                    />
                    <Area
                      type="monotone"
                      dataKey="uniqueVisitors"
                      stroke={colors.secondary}
                      fillOpacity={1}
                      fill="url(#colorUniqueVisitors)"
                      name="Visitantes Únicos"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="30d" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visitas (Últimos 30 días)</CardTitle>
              <CardDescription>
                Análisis de visitas al sitio web en el último mes
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitsData}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorUniqueVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colors.secondary} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="visits"
                      stroke={colors.primary}
                      fillOpacity={1}
                      fill="url(#colorVisits)"
                      name="Visitas Totales"
                    />
                    <Area
                      type="monotone"
                      dataKey="uniqueVisitors"
                      stroke={colors.secondary}
                      fillOpacity={1}
                      fill="url(#colorUniqueVisitors)"
                      name="Visitantes Únicos"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Traffic Sources and Devices */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fuentes de Tráfico</CardTitle>
            <CardDescription>
              De dónde vienen los visitantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficSourcesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Porcentaje" fill={colors.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Dispositivos</CardTitle>
            <CardDescription>
              Tipos de dispositivos utilizados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={devicesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Porcentaje" fill={colors.secondary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}