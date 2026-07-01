function errorHandler(error, req, res, next) {
  if (error.statusCode) {
    return res.status(error.statusCode).json({ 
        erro: error.message 
    });
  }
  console.error(error);

  return res.status(500).json({
     erro: "Erro interno do servidor."
 });
}
export default errorHandler;
