import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function UserStoryBuilder() {
  const [role, setRole] = useState('usuário');
  const [action, setAction] = useState('fazer login com o Google');
  const [benefit, setBenefit] = useState('não precisar memorizar mais uma senha');
  const [acceptance, setAcceptance] = useState('- O botão deve estar visível na tela de login\n- Deve usar OAuth2\n- Se falhar, mostrar mensagem de erro clara');

  return (
    <div className="flex flex-col h-full w-full bg-background border-l border-border p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">User Story Builder</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Estruturação e Critérios de Aceite
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">A História</CardTitle>
            <CardDescription>Defina quem, o que e o porquê.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Como um(a)... (Who)</Label>
              <Input 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ex: usuário do aplicativo"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Eu quero... (What)</Label>
              <Input 
                value={action}
                onChange={(e) => setAction(e.target.value)}
                placeholder="Ex: receber notificações push"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Para que... (Why)</Label>
              <Input 
                value={benefit}
                onChange={(e) => setBenefit(e.target.value)}
                placeholder="Ex: eu não perca as mensagens importantes"
                className="bg-background/50"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Critérios de Aceite</CardTitle>
            <CardDescription>O que define que esta história está "Pronta"?</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={acceptance}
              onChange={(e) => setAcceptance(e.target.value)}
              className="min-h-[120px] font-mono text-sm bg-background/50 resize-none"
              placeholder="- Dado que... Quando... Então..."
            />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm bg-primary/5 border-primary/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-primary">Preview Final</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-md bg-background border border-border">
              <p className="text-lg font-medium leading-relaxed">
                <span className="text-muted-foreground">Como um(a) </span>
                <span className="text-foreground underline decoration-primary/50 underline-offset-4">{role || '...'}</span>
                <span className="text-muted-foreground">, eu quero </span>
                <span className="text-foreground underline decoration-primary/50 underline-offset-4">{action || '...'}</span>
                <span className="text-muted-foreground"> para que </span>
                <span className="text-foreground underline decoration-primary/50 underline-offset-4">{benefit || '...'}</span>.
              </p>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Critérios de Aceite</h4>
              <div className="p-4 rounded-md bg-background border border-border">
                <pre className="font-mono text-sm whitespace-pre-wrap text-foreground">
                  {acceptance || 'Nenhum critério definido.'}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
