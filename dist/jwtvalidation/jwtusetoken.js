"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jwt_validation_1 = require("./jwt.validation");
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = yield (0, jwt_validation_1.ValidateToken)(token);
        console.log(tokenData);
        if (tokenData) {
            next();
        }
        else {
            res.status(409);
            res.send({ error: 'NOT ACCESS' });
        }
    }
    catch (e) {
        console.log(e);
        res.status(409);
        res.send({ error: 'ACCESS DENIED' });
    }
});
exports.checkAuth = checkAuth;
//# sourceMappingURL=jwtusetoken.js.map