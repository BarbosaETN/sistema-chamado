const STATUS = Object.freeze({
    ABERTO: "ABERTO",
    EM_ANDAMENTO: "EM ANDAMENTO",
    AGUARDANDO: "AGUARDANDO",
    RESOLVIDO: "RESOLVIDO",
    FECHADO: "FECHADO"
});

export const STATUS_VALUES = Object.freeze(Object.values(STATUS));

export default STATUS;