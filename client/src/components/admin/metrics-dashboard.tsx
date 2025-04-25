import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, Line, CartesianGrid } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricsDashboardProps {
  visitorData?: any;
  isLoading?: boolean;
}

export function MetricsDashboard({ visitorData, isLoading = false }: MetricsDashboardProps) {
  // Sample data para visualización (a reemplazar con datos reales cuando estén disponibles)
  const [data, setData] = useState([
    { name: 'Lun', visitors: 400, pageViews: 800 },
    { name: 'Mar', visitors: 380, pageViews: 750 },
    { name: 'Mie', visitors: 510, pageViews: 920 },
    { name: 'Jue', visitors: 420, pageViews: 850 },
    { name: 'Vie', visitors: 530, pageViews: 980 },
    { name: 'Sab', visitors: 620, pageViews: 1100 },
    { name: 'Dom', visitors: 750, pageViews: 1250 },
  ]);

  // Cuando tengamos datos reales, los actualizamos aquí
  useEffect(() => {
    if (visitorData) {
      setData(visitorData);
    }
  }, [visitorData]);

  // Métricas de resumen calculadas
  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
  const totalPageViews = data.reduce((sum, item) => sum + item.pageViews, 0);
  const averageVisitorsPerDay = Math.round(totalVisitors / data.length);
  const conversionRate = Math.round((totalVisitors / totalPageViews) * 100);

  // Cambios porcentuales (para visualización)
  const visitorsChange = 12.5; // Ejemplo: 12.5% más que el período anterior
  const pageViewsChange = 8.3; // Ejemplo: 8.3% más que el período anterior
  const bounceRateChange = -3.2; // Ejemplo: 3.2% menos que el período anterior
  const avgSessionChange = 5.6; // Ejemplo: 5.6% más que el período anterior

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total de visitantes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Visitantes
            </CardTitle>
            <div className={`text-xs font-medium ${visitorsChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {visitorsChange > 0 ? <ArrowUpRight className="h-3 w-3 inline mr-1" /> : <ArrowDownRight className="h-3 w-3 inline mr-1" />}
              {Math.abs(visitorsChange)}%
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisitors}</div>
            <p className="text-xs text-muted-foreground">
              Últimos 7 días
            </p>
          </CardContent>
        </Card>

        {/* Total de páginas vistas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Páginas Vistas
            </CardTitle>
            <div className={`text-xs font-medium ${pageViewsChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {pageViewsChange > 0 ? <ArrowUpRight className="h-3 w-3 inline mr-1" /> : <ArrowDownRight className="h-3 w-3 inline mr-1" />}
              {Math.abs(pageViewsChange)}%
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPageViews}</div>
            <p className="text-xs text-muted-foreground">
              Últimos 7 días
            </p>
          </CardContent>
        </Card>

        {/* Tasa de rebote */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasa de Rebote
            </CardTitle>
            <div className={`text-xs font-medium ${bounceRateChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
              {bounceRateChange < 0 ? <ArrowDownRight className="h-3 w-3 inline mr-1" /> : <ArrowUpRight className="h-3 w-3 inline mr-1" />}
              {Math.abs(bounceRateChange)}%
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-xs text-muted-foreground">
              Usuarios que abandonan inmediatamente
            </p>
          </CardContent>
        </Card>

        {/* Duración media */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Duración Media
            </CardTitle>
            <div className={`text-xs font-medium ${avgSessionChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {avgSessionChange > 0 ? <ArrowUpRight className="h-3 w-3 inline mr-1" /> : <ArrowDownRight className="h-3 w-3 inline mr-1" />}
              {Math.abs(avgSessionChange)}%
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 13s</div>
            <p className="text-xs text-muted-foreground">
              Tiempo promedio por sesión
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visitors">
        <div className="flex justify-between items-start">
          <TabsList>
            <TabsTrigger value="visitors">Visitantes</TabsTrigger>
            <TabsTrigger value="pageviews">Páginas vistas</TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">
            Últimos 7 días
          </div>
        </div>
        
        <TabsContent value="visitors" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de visitantes</CardTitle>
              <CardDescription>
                Visitantes únicos por día
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="#a72a2a" 
                      name="Visitantes"
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pageviews" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de páginas vistas</CardTitle>
              <CardDescription>
                Total de páginas vistas por día
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="pageViews" 
                      fill="#a72a2a" 
                      name="Páginas vistas"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}