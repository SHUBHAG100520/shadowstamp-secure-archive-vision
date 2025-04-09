
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import { BarChart as BarChartIcon, LineChart as LineChartIcon } from 'lucide-react';

// Demo data for embedded vs extracted statistics
const monthlyData = [
  { name: 'Jan', embedded: 4, extracted: 2, robustness: 80 },
  { name: 'Feb', embedded: 6, extracted: 3, robustness: 75 },
  { name: 'Mar', embedded: 8, extracted: 5, robustness: 82 },
  { name: 'Apr', embedded: 10, extracted: 7, robustness: 85 },
  { name: 'May', embedded: 15, extracted: 12, robustness: 90 },
  { name: 'Jun', embedded: 18, extracted: 14, robustness: 88 },
];

const algorithmData = [
  { name: 'DCT', robustness: 75, imperceptibility: 80, capacity: 60 },
  { name: 'DWT', robustness: 85, imperceptibility: 70, capacity: 65 },
  { name: 'SVD', robustness: 70, imperceptibility: 90, capacity: 55 },
  { name: 'DFT', robustness: 65, imperceptibility: 85, capacity: 70 },
];

interface StatisticsGraphProps {
  algorithm: string;
}

export default function StatisticsGraph({ algorithm }: StatisticsGraphProps) {
  const [graphType, setGraphType] = useState<'bar' | 'line'>('bar');
  const [dataView, setDataView] = useState<'monthly' | 'algorithm'>('monthly');
  
  return (
    <Card className="bg-white/5 border-white/10 mt-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white text-lg">Watermark Statistics</CardTitle>
        <div className="flex gap-2">
          <div className="flex bg-white/10 rounded-md p-1">
            <Button 
              variant="ghost" 
              size="sm"
              className={`h-8 px-2 ${graphType === 'bar' ? 'bg-white/20' : ''}`}
              onClick={() => setGraphType('bar')}
            >
              <BarChartIcon className="h-4 w-4 mr-1" />
              Bar
            </Button>
            <Button
              variant="ghost" 
              size="sm"
              className={`h-8 px-2 ${graphType === 'line' ? 'bg-white/20' : ''}`}
              onClick={() => setGraphType('line')}
            >
              <LineChartIcon className="h-4 w-4 mr-1" />
              Line
            </Button>
          </div>
          <div className="flex bg-white/10 rounded-md p-1">
            <Button 
              variant="ghost" 
              size="sm"
              className={`h-8 px-2 ${dataView === 'monthly' ? 'bg-white/20' : ''}`}
              onClick={() => setDataView('monthly')}
            >
              Monthly
            </Button>
            <Button
              variant="ghost" 
              size="sm"
              className={`h-8 px-2 ${dataView === 'algorithm' ? 'bg-white/20' : ''}`}
              onClick={() => setDataView('algorithm')}
            >
              Algorithms
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            {graphType === 'bar' ? (
              <BarChart
                data={dataView === 'monthly' ? monthlyData : algorithmData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip 
                  contentStyle={{ background: '#222', border: '1px solid #444', borderRadius: '4px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                {dataView === 'monthly' ? (
                  <>
                    <Bar dataKey="embedded" name="Embedded" fill="#8884d8" />
                    <Bar dataKey="extracted" name="Extracted" fill="#82ca9d" />
                  </>
                ) : (
                  <>
                    <Bar dataKey="robustness" name="Robustness" fill="#8884d8" />
                    <Bar dataKey="imperceptibility" name="Imperceptibility" fill="#82ca9d" />
                    <Bar dataKey="capacity" name="Capacity" fill="#ffc658" />
                  </>
                )}
              </BarChart>
            ) : (
              <LineChart
                data={dataView === 'monthly' ? monthlyData : algorithmData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip 
                  contentStyle={{ background: '#222', border: '1px solid #444', borderRadius: '4px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                {dataView === 'monthly' ? (
                  <>
                    <Line type="monotone" dataKey="embedded" name="Embedded" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="extracted" name="Extracted" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="robustness" name="Robustness" stroke="#ffc658" />
                  </>
                ) : (
                  <>
                    <Line type="monotone" dataKey="robustness" name="Robustness" stroke="#8884d8" />
                    <Line type="monotone" dataKey="imperceptibility" name="Imperceptibility" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="capacity" name="Capacity" stroke="#ffc658" />
                  </>
                )}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-3 bg-black/20 border border-white/10 rounded-md">
          <h4 className="text-white font-medium mb-2">Algorithm Performance Metrics</h4>
          <p className="text-sm text-white/70">
            {algorithm === 'dct' 
              ? 'DCT provides excellent imperceptibility with minimal visual artifacts while maintaining good extraction rates.'
              : 'DWT offers superior robustness against attacks and transformations with higher watermark recovery rates.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
