require("dotenv").config();
var dirRaiz = process.env.NODE_ENV === "development" ? "src" : "build/src";
var extensão = process.env.NODE_ENV === "development" ? "ts" : "js";
module.exports = {
    type: process.env.TYPEORM_TYPE,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    logging: ["info"],
    synchronize: true,
    entities: ["".concat(dirRaiz, "/entidades/*.").concat(extensão)],
};
//# sourceMappingURL=ormconfig.js.map