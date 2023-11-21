"use strict";
// pagination.ts
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
exports.paginate = void 0;
const paginate = (repository, page, perPage, whereClause) => __awaiter(void 0, void 0, void 0, function* () {
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    const data = yield repository.find({
        where: whereClause || {},
        skip: startIndex,
        take: perPage,
    });
    const total = yield repository.count({
        where: whereClause || {},
    });
    return {
        page,
        per_page: perPage,
        total,
        data,
    };
});
exports.paginate = paginate;
//# sourceMappingURL=pagination.js.map