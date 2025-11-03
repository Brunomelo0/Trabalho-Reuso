const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "ID inválido. Deve ser um número inteiro." });
    }
    next();
  };
  
  module.exports = validateId;  