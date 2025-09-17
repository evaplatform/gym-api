// src/i18n/translations/pt.ts
import { ErrorCode } from '../../errors/ErrorMessages';

export const errorMessages: Record<ErrorCode, string> = {
    [ErrorCode.GENERIC_ERROR]: 'Ocorreu um erro inesperado',
    [ErrorCode.UNAUTHORIZED]: 'Autenticação necessária',
    [ErrorCode.FORBIDDEN]: 'Você não tem permissão para realizar esta ação',
    [ErrorCode.NOT_FOUND]: 'O recurso solicitado não foi encontrado',

    [ErrorCode.FAILED_TO_DELETE_IMAGE]: 'Falha ao excluir a imagem',
    [ErrorCode.USER_NOT_FOUND]: 'Usuário não encontrado',
    [ErrorCode.INVALID_CREDENTIALS]: 'Nome de usuário ou senha inválidos',
    [ErrorCode.DUPLICATE_ENTRY]: 'Já existe um registro com essas informações',
    [ErrorCode.VALIDATION_ERROR]: 'Os dados fornecidos são inválidos',

    [ErrorCode.DATABASE_CONNECTION_ERROR]: 'Erro de conexão com o banco de dados',
    [ErrorCode.EXTERNAL_API_ERROR]: 'Erro ao conectar-se ao serviço externo',
    [ErrorCode.FILE_UPLOAD_ERROR]: 'Erro ao fazer upload do arquivo',

    // Traduções para erros de validação
    [ErrorCode.VALIDATION_REQUIRED]: '{field} é obrigatório',
    [ErrorCode.VALIDATION_MIN_LENGTH]: '{field} deve ter pelo menos {min} caracteres',
    [ErrorCode.VALIDATION_MAX_LENGTH]: '{field} não pode exceder {max} caracteres',
    [ErrorCode.VALIDATION_MIN_VALUE]: '{field} deve ser pelo menos {min}',
    [ErrorCode.VALIDATION_MAX_VALUE]: '{field} não pode exceder {max}',
    [ErrorCode.VALIDATION_PATTERN]: 'O formato de {field} é inválido',
    [ErrorCode.VALIDATION_EMAIL]: '{field} deve ser um endereço de email válido',
    [ErrorCode.VALIDATION_ENUM]: '{field} deve ser um dos seguintes valores: {values}',
    [ErrorCode.VALIDATION_UNIQUE]: '{field} já existe',
    [ErrorCode.VALIDATION_TYPE]: '{field} deve ser um {type} válido',
    [ErrorCode.VALIDATION_CUSTOM]: '{field} é inválido',
};