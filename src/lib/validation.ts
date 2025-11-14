import { z } from 'zod';

// Schema for conhecimento-previo submission
export const ConhecimentoPrevioSchema = z.object({
  estudouEstatistica: z.enum(['Sim', 'Não', 'Alguns assuntos'], {
    message: 'Valor deve ser Sim, Não ou Alguns assuntos'
  }),
  onde: z.enum(['Trabalho', 'Educação', 'Hobby', 'Família'], {
    message: 'Valor deve ser Trabalho, Educação, Hobby ou Família'
  })
});

// Request wrapper schema
export const ApiRequestSchema = z.object({
  data: z.record(z.string(), z.unknown()).optional(),
  meta: z.object({
    version: z.number().optional(),
    reason: z.string().optional(),
    source: z.string().optional(),
  }).optional()
});

// For direct body validation (backward compatibility)
export const ConhecimentoPrevioDirectSchema = ConhecimentoPrevioSchema;

export type ConhecimentoPrevioType = z.infer<typeof ConhecimentoPrevioSchema>;
export type ApiRequestType = z.infer<typeof ApiRequestSchema>;