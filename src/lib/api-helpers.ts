import { NextResponse } from 'next/server';
import { ZodError, ZodType } from 'zod';

// Standard API response interfaces following compartilar patterns
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  code?: string;
  details?: ValidationError[];
  message?: string;
  meta?: {
    timestamp?: string;
    version?: number;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      hasMore: boolean;
    };
  };
}

/**
 * Standardized error response following compartilar patterns
 */
export function errorResponse(
  message: string,
  status = 400,
  code?: string,
  details?: ValidationError[]
): NextResponse<ApiResponse> {
  const response: ApiResponse = {
    error: message,
    code,
    details,
    meta: {
      timestamp: new Date().toISOString()
    }
  };

  return NextResponse.json(response, { status });
}

/**
 * Standardized success response following compartilar patterns
 */
export function successResponse<T>(
  data?: T,
  message?: string,
  status = 200,
  meta?: ApiResponse['meta']
): NextResponse<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    data,
    message,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  };

  return NextResponse.json(response, { status });
}

/**
 * Initialize Firebase for API routes
 * Not needed anymore - using client SDK directly
 */
export function initializeFirebase() {
  console.warn('initializeFirebase is deprecated - using client SDK');
  return {
    db: null,
    isAdminSDK: false
  };
}

/**
 * Validate request method
 */
export function validateMethod(request: Request, allowedMethods: string[]) {
  if (!allowedMethods.includes(request.method)) {
    return {
      valid: false,
      response: errorResponse(
        `Method ${request.method} not allowed`,
        405,
        'METHOD_NOT_ALLOWED'
      )
    };
  }
  return { valid: true };
}

/**
 * Validate request body with Zod schema
 */
export async function validateRequestBody<T>(
  request: Request,
  schema?: ZodType<T>
): Promise<{
  valid: boolean;
  body?: T;
  response?: NextResponse<ApiResponse>;
}> {
  try {
    const body = await request.json();

    if (schema) {
      try {
        const validatedBody = schema.parse(body);
        return { valid: true, body: validatedBody };
      } catch (error) {
        if (error instanceof ZodError) {
          const details = error.issues.map((err): ValidationError => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code
          }));

          return {
            valid: false,
            response: errorResponse(
              'Validation failed',
              400,
              'VALIDATION_ERROR',
              details
            )
          };
        }
        throw error;
      }
    }

    return { valid: true, body };
  } catch {
    return {
      valid: false,
      response: errorResponse(
        'Invalid JSON in request body',
        400,
        'INVALID_JSON'
      )
    };
  }
}

/**
 * Handle API errors with proper logging and response
 */
export function handleApiError(error: unknown, operation: string): NextResponse<ApiResponse> {
  console.error(`API Error in ${operation}:`, error);

  // Don't expose internal error details to client
  return errorResponse(
    'Internal server error',
    500,
    'INTERNAL_ERROR'
  );
}

/**
 * Extract client information from request headers
 */
export function extractClientInfo(request: Request) {
  return {
    ip: request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown'
  };
}