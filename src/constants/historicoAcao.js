const HISTORICO_ACAO = Object.freeze({
    CRIADO: 'Criado',
    ASSUMIDO: 'Assumido',
    STATUS_ALTERADO: 'Status alterado',
    PRIORIDADE_ALTERADA: 'Prioridade alterada',
    COMENTARIO_ADICIONADO: 'Comentário adicionado',
    RESOLVIDO: 'Resolvido',
    FECHADO: 'Fechado'
});

export const HISTORICO_ACAO_VALUES = Object.freeze(Object.values(HISTORICO_ACAO));

export default HISTORICO_ACAO;