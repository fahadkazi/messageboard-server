"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Message_1 = require("../entities/Message");
let MessageResolver = class MessageResolver {
    async messages() {
        return Message_1.Message.find();
    }
    message(_id) {
        return Message_1.Message.findOne(_id);
    }
    async createMessage(text) {
        return Message_1.Message.create({ text }).save();
    }
    async updateMessage(_id, text) {
        const msg = await Message_1.Message.findOne(_id);
        if (!msg) {
            return null;
        }
        if (typeof text !== 'undefined') {
            await Message_1.Message.update({ _id }, { text });
        }
        return msg;
    }
    async deleteMessage(_id) {
        await Message_1.Message.delete(_id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Message_1.Message]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "messages", null);
__decorate([
    (0, type_graphql_1.Query)(() => Message_1.Message, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('_id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "message", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Message_1.Message),
    __param(0, (0, type_graphql_1.Arg)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Message_1.Message, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('_id', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "updateMessage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('_id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "deleteMessage", null);
MessageResolver = __decorate([
    (0, type_graphql_1.InputType)(),
    (0, type_graphql_1.Resolver)(Message_1.Message)
], MessageResolver);
exports.MessageResolver = MessageResolver;
//# sourceMappingURL=message.js.map