import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Terminal } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const DEFAULT_CODE = `function calcularJurosCompostos(capital, taxa, tempo) {
  // taxa em decimal (ex: 0.1 para 10%)
  // tempo em anos
  const montante = capital * Math.pow((1 + taxa), tempo);
  return montante.toFixed(2);
}

// Simulando um investimento
const resultado = calcularJurosCompostos(1000, 0.1, 5);
console.log("R$ 1000 investidos a 10% a.a por 5 anos:");
console.log("Montante Final: R$ " + resultado);`;

export function CodeLab() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    
    // Simulating code execution delay
    setTimeout(() => {
      try {
        // Safe-ish eval for demonstration purposes (in a real app, use Web Workers or a backend sandbox)
        const logs: string[] = [];
        const originalLog = console.log;
        
        // Override console.log
        console.log = (...args) => {
          logs.push(args.join(' '));
        };

        // Execute
        // eslint-disable-next-line no-new-func
        const fn = new Function(code);
        fn();

        // Restore console.log
        console.log = originalLog;
        
        setOutput(logs.join('\n') || 'Executado com sucesso (sem output).');
      } catch (err: any) {
        setOutput(`Erro de Execução: ${err.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 500);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e1e] border-l border-border p-4 text-white overflow-hidden">
      <div className="mb-4 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-500" />
            Code Lab
          </h2>
          <p className="text-gray-400 text-xs mt-1">Ambiente de Execução JavaScript</p>
        </div>
        <Button 
          onClick={runCode} 
          disabled={isRunning}
          size="sm" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
        >
          <Play className="w-4 h-4" />
          {isRunning ? 'Executando...' : 'Run'}
        </Button>
      </div>

      <div className="flex flex-col gap-4 flex-1 min-h-0">
        <Card className="flex-1 bg-[#252526] border-[#333] rounded-md overflow-hidden flex flex-col">
          <CardHeader className="py-2 px-4 border-b border-[#333] bg-[#2d2d2d]">
            <CardTitle className="text-xs font-mono text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              script.js
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 relative">
            <Textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full min-h-full resize-none bg-transparent border-0 font-mono text-sm text-[#d4d4d4] focus-visible:ring-0 p-4 leading-relaxed"
              spellCheck={false}
            />
          </CardContent>
        </Card>

        <Card className="h-1/3 bg-[#1e1e1e] border-[#333] rounded-md overflow-hidden flex flex-col shrink-0">
          <CardHeader className="py-2 px-4 border-b border-[#333] bg-[#2d2d2d]">
            <CardTitle className="text-xs font-mono text-gray-400">Console</CardTitle>
          </CardHeader>
          <CardContent className="p-4 overflow-y-auto">
            {output ? (
              <pre className={`font-mono text-sm whitespace-pre-wrap ${output.includes('Erro') ? 'text-red-400' : 'text-emerald-400'}`}>
                {output}
              </pre>
            ) : (
              <span className="font-mono text-sm text-gray-600 italic">
                Pronto. Aguardando execução...
              </span>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
