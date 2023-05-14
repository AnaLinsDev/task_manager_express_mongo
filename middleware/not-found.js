const EnumError = require("../enum/errors");

const notFound = (req, res) => res.status(404).send(EnumError.ROUTE_NOT_FOUND);

module.exports = notFound