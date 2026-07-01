const STATUS = Object.freeze({
    ABERTO: "Aberto",
    EM_ANDAMENTO: "Em andamento",
    AGUARDANDO: "Aguardando",
    RESOLVIDO: "Resolvido",
    FECHADO: "Fechado"
});

export const STATUS_VALUES = Object.freeze(Object.values(STATUS));

export default STATUS;