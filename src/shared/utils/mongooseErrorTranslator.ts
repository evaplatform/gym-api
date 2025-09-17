import { ErrorCode } from "@/errors/ErrorMessages";
import { i18n } from "@/i18n";


// Mapear padrões de mensagens do Mongoose para códigos de erro
const ERROR_PATTERNS = [
  { regex: /Path `(.+)` is required/i, code: ErrorCode.VALIDATION_REQUIRED },
  { regex: /Path `(.+)` \(`.*`\) is shorter than the minimum allowed length \((\d+)\)/i, code: ErrorCode.VALIDATION_MIN_LENGTH },
  { regex: /Path `(.+)` \(`.*`\) is longer than the maximum allowed length \((\d+)\)/i, code: ErrorCode.VALIDATION_MAX_LENGTH },
  { regex: /Path `(.+)` \((\d+)\) is less than minimum allowed value \((\d+)\)/i, code: ErrorCode.VALIDATION_MIN_VALUE },
  { regex: /Path `(.+)` \((\d+)\) is more than maximum allowed value \((\d+)\)/i, code: ErrorCode.VALIDATION_MAX_VALUE },
  { regex: /Path `(.+)` is invalid \((.+)\)/i, code: ErrorCode.VALIDATION_PATTERN },
  { regex: /Path `(.+)` is not a valid email/i, code: ErrorCode.VALIDATION_EMAIL },
  { regex: /`(.+)` is not a valid enum value for path `(.+)`/i, code: ErrorCode.VALIDATION_ENUM },
  { regex: /E11000 duplicate key error.+index: (.+)_1/i, code: ErrorCode.VALIDATION_UNIQUE },
  { regex: /Cast to (\w+) failed for value "(.+)" at path "(.+)"/i, code: ErrorCode.VALIDATION_TYPE },
];

// Função para traduzir uma mensagem de erro do Mongoose
export function translateMongooseError(errorMessage: string, fieldDisplayName?: string): { code: ErrorCode, message: string, params?: Record<string, any> } {
  // Procurar um padrão correspondente
  for (const pattern of ERROR_PATTERNS) {
    const match = errorMessage.match(pattern.regex);
    
    if (match) {
      let params: Record<string, any> = {};
      
      switch (pattern.code) {
        case ErrorCode.VALIDATION_REQUIRED:
          params = { field: fieldDisplayName || match[1] };
          break;
          
        case ErrorCode.VALIDATION_MIN_LENGTH:
          params = { field: fieldDisplayName || match[1], min: match[2] };
          break;
          
        case ErrorCode.VALIDATION_MAX_LENGTH:
          params = { field: fieldDisplayName || match[1], max: match[2] };
          break;
          
        case ErrorCode.VALIDATION_MIN_VALUE:
          params = { field: fieldDisplayName || match[1], value: match[2], min: match[3] };
          break;
          
        case ErrorCode.VALIDATION_MAX_VALUE:
          params = { field: fieldDisplayName || match[1], value: match[2], max: match[3] };
          break;
          
        case ErrorCode.VALIDATION_PATTERN:
          params = { field: fieldDisplayName || match[1], value: match[2] };
          break;
          
        case ErrorCode.VALIDATION_EMAIL:
          params = { field: fieldDisplayName || match[1] };
          break;
          
        case ErrorCode.VALIDATION_ENUM:
          params = { value: match[1], field: fieldDisplayName || match[2] };
          break;
          
        case ErrorCode.VALIDATION_UNIQUE:
          params = { field: fieldDisplayName || match[1] };
          break;
          
        case ErrorCode.VALIDATION_TYPE:
          params = { type: match[1], value: match[2], field: fieldDisplayName || match[3] };
          break;
      }
      
      // Obter a mensagem traduzida
      let message = i18n.translate(pattern.code);
      
      // Substituir os parâmetros na mensagem
      Object.entries(params).forEach(([key, value]) => {
        message = message.replace(new RegExp(`{${key}}`, 'g'), value);
      });
      
      return { code: pattern.code, message, params };
    }
  }
  
  // Se não encontrar um padrão, retornar erro genérico
  return { 
    code: ErrorCode.VALIDATION_CUSTOM, 
    message: i18n.translate(ErrorCode.VALIDATION_CUSTOM).replace('{field}', fieldDisplayName || 'Campo')
  };
}

// Função para obter nomes amigáveis dos campos
export function getFieldDisplayName(field: string): string {
  // Mapeamento de nomes de campos para versões amigáveis
  const fieldDisplayNames: Record<string, string> = {
    'name': i18n.getLanguage() === 'pt' ? 'Nome' : 'Name',
    'email': 'E-mail',
    'password': i18n.getLanguage() === 'pt' ? 'Senha' : 'Password',
    'username': i18n.getLanguage() === 'pt' ? 'Nome de usuário' : 'Username',
    'phone': i18n.getLanguage() === 'pt' ? 'Telefone' : 'Phone',
    'address': i18n.getLanguage() === 'pt' ? 'Endereço' : 'Address',
    'birthDate': i18n.getLanguage() === 'pt' ? 'Data de nascimento' : 'Birth Date',
    // Adicione outros campos conforme necessário
  };
  
  return fieldDisplayNames[field] || field;
}