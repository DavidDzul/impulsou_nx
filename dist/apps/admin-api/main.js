/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = exports.appModules = void 0;
const tslib_1 = __webpack_require__(3);
const apollo_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(6);
const path_1 = __webpack_require__(7);
const default_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(9);
const models_1 = __webpack_require__(10);
const config_1 = __webpack_require__(17);
const auth_module_1 = __webpack_require__(18);
exports.appModules = [auth_module_1.AuthModule];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => {
                    return {
                        type: configService.get('DB_TYPE'),
                        host: configService.get('DB_HOST'),
                        port: configService.get('DB_PORT'),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_DATABASE'),
                        supportBigNumbers: true,
                        bigNumberStrings: false,
                        autoLoadEntities: false,
                        entities: [...models_1.typeOrmEntities],
                        synchronize: configService.get('DB_SYNC'),
                        legacySpatialSupport: false,
                        debug: false,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            ...exports.appModules,
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                useFactory: () => ({
                    autoSchemaFile: (0, path_1.join)(process.cwd(), 'schemas/admin-schema.gql'),
                    playground: false,
                    plugins: [(0, default_1.ApolloServerPluginLandingPageLocalDefault)()],
                    path: '/graphql/admin',
                    include: [...exports.appModules],
                }),
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@apollo/server/plugin/landingPage/default");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(11), exports);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeOrmEntities = void 0;
const tslib_1 = __webpack_require__(3);
const user_entity_1 = __webpack_require__(12);
const admin_entity_1 = __webpack_require__(15);
exports.typeOrmEntities = [user_entity_1.User, admin_entity_1.Admin];
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(12), exports);
tslib_1.__exportStar(__webpack_require__(15), exports);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(13);
const graphql_1 = __webpack_require__(6);
const bcrypt = tslib_1.__importStar(__webpack_require__(14));
let User = class User {
    async hashPassword() {
        if (this.password && !this.password.startsWith('$2b$10$')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
};
exports.User = User;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "active", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
exports.User = User = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('users')
], User);


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Admin = void 0;
const tslib_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(13);
const graphql_1 = __webpack_require__(6);
const bcrypt = tslib_1.__importStar(__webpack_require__(14));
let Admin = class Admin {
    async hashPassword() {
        if (this.password && !this.password.startsWith('$2b$10$')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
};
exports.Admin = Admin;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Admin.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], Admin.prototype, "active", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Admin.prototype, "hashPassword", null);
exports.Admin = Admin = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('admins')
], Admin);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Token = void 0;
const tslib_1 = __webpack_require__(3);
// NestJS Modules
const graphql_1 = __webpack_require__(6);
let Token = class Token {
};
exports.Token = Token;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "token", void 0);
exports.Token = Token = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Token);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(3);
const services_1 = __webpack_require__(19);
const common_1 = __webpack_require__(5);
const auth_resolver_1 = __webpack_require__(39);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_1.AuthDbModule, services_1.AdminDbModule],
        providers: [auth_resolver_1.AuthResolver, services_1.LocalStrategy, services_1.JwtStrategy],
    })
], AuthModule);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ServicesModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicesModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(9);
let ServicesModule = ServicesModule_1 = class ServicesModule {
    static forRootAsync(options) {
        return {
            module: ServicesModule_1,
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    useFactory: options.useFactory || undefined,
                    useClass: options.useClass || undefined,
                    useExisting: options.useExisting || undefined,
                    inject: options.inject || [],
                }),
                ...(options.imports || []),
            ],
            providers: [],
            exports: [typeorm_1.TypeOrmModule],
        };
    }
    static forFeature(entities) {
        return {
            module: ServicesModule_1,
            imports: [typeorm_1.TypeOrmModule.forFeature(entities)],
            exports: [typeorm_1.TypeOrmModule],
        };
    }
};
exports.ServicesModule = ServicesModule;
exports.ServicesModule = ServicesModule = ServicesModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        exports: [],
    })
], ServicesModule);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthDbModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const auth_db_service_1 = __webpack_require__(23);
const jwt_1 = __webpack_require__(29);
const config_1 = __webpack_require__(17);
const strategies_1 = __webpack_require__(30);
const passport_1 = __webpack_require__(32);
const admin_db_1 = __webpack_require__(24);
let AuthDbModule = class AuthDbModule {
};
exports.AuthDbModule = AuthDbModule;
exports.AuthDbModule = AuthDbModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => {
                    return {
                        secret: configService.get('JWT_SECRET_KEY'),
                        signOptions: {
                            expiresIn: configService.get('JWT_EXPIRATION_TIME'),
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            passport_1.PassportModule,
            admin_db_1.AdminDbModule,
        ],
        providers: [auth_db_service_1.AuthDbService, strategies_1.LocalStrategy, strategies_1.JwtStrategy],
        exports: [auth_db_service_1.AuthDbService, jwt_1.JwtModule],
    })
], AuthDbModule);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthDbService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthDbService = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const admin_db_1 = __webpack_require__(24);
const bcrypt = tslib_1.__importStar(__webpack_require__(14));
const jwt_1 = __webpack_require__(29);
let AuthDbService = AuthDbService_1 = class AuthDbService {
    constructor(adminDbService, jwtService) {
        this.adminDbService = adminDbService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthDbService_1.name);
    }
    async validateAdmin(email, pass) {
        try {
            const user = await this.adminDbService.findOne({
                where: { email },
                select: ['id', 'email', 'password', 'active'],
            });
            const passOk = await bcrypt.compare(pass, user.password);
            if (user && passOk) {
                this.logger.log(`User with email: ${email} validated.`);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...result } = user;
                return result;
            }
            this.logger.log(`User with email: ${email} fail validation.`);
            return null;
        }
        catch (e) {
            this.logger.log(`User with email: ${email} fail validation.`);
            return null;
        }
    }
    async login(admin) {
        const payload = {
            email: admin.email,
            id: admin.id,
        };
        return this.jwtService.sign(payload);
    }
};
exports.AuthDbService = AuthDbService;
exports.AuthDbService = AuthDbService = AuthDbService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof admin_db_1.AdminDbService !== "undefined" && admin_db_1.AdminDbService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthDbService);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminDbModule = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
const services_module_1 = __webpack_require__(20);
const admin_db_service_1 = __webpack_require__(26);
let AdminDbModule = class AdminDbModule {
};
exports.AdminDbModule = AdminDbModule;
exports.AdminDbModule = AdminDbModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_module_1.ServicesModule.forFeature([models_1.Admin])],
        providers: [admin_db_service_1.AdminDbService],
        exports: [admin_db_service_1.AdminDbService],
    })
], AdminDbModule);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminDbService = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
const abstract_1 = __webpack_require__(27);
let AdminDbService = class AdminDbService extends (0, abstract_1.Resource)(models_1.Admin) {
};
exports.AdminDbService = AdminDbService;
exports.AdminDbService = AdminDbService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AdminDbService);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(28), exports);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Resource = exports.BaseClass = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(9);
const typeorm_2 = __webpack_require__(13);
class BaseClass {
}
exports.BaseClass = BaseClass;
tslib_1.__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)({ unsigned: true }),
    tslib_1.__metadata("design:type", Number)
], BaseClass.prototype, "id", void 0);
function Resource(model) {
    var _a;
    class ResourceHost {
        constructor() {
            this.logger = new common_1.Logger(`${model.name} Service`);
        }
        create(entity) {
            const value = this.repository.create(entity);
            return this.repository.save(value);
        }
        createSeveral(entities) {
            const value = this.repository.create(entities);
            return this.repository.save(value);
        }
        insertSeveral(entities) {
            const value = this.repository.create(entities);
            return this.repository.insert(value);
        }
        async updateSeveral(entities) {
            const ids = entities.map((map) => map?.id || 0);
            const findOptions = {
                where: { id: (0, typeorm_2.In)(ids) },
            };
            const data = await this.repository.find(findOptions);
            if (entities.length !== data.length) {
                throw new common_1.NotFoundException({
                    status: 404,
                    message: 'Labels not found',
                });
            }
            return this.repository.save(entities);
        }
        remove(entity) {
            return this.repository.remove(entity);
        }
        removeBy(options) {
            return this.repository.delete(options);
        }
        findAll(options) {
            return this.repository.find(options);
        }
        findOne(options, throwError = true) {
            if (throwError) {
                return this.repository.findOneOrFail(options);
            }
            return this.repository.findOne(options);
        }
        update(updateEntity, entity) {
            const createdEntity = this.repository.create(updateEntity);
            Object.keys(updateEntity).forEach((key) => {
                entity[key] = createdEntity[key];
            });
            return this.repository.save(entity);
        }
        count(options) {
            return this.repository.count(options);
        }
    }
    tslib_1.__decorate([
        (0, typeorm_1.InjectRepository)(model),
        tslib_1.__metadata("design:type", typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object)
    ], ResourceHost.prototype, "repository", void 0);
    return ResourceHost;
}
exports.Resource = Resource;


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(31), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(17);
const passport_1 = __webpack_require__(32);
const passport_jwt_1 = __webpack_require__(33);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
        this.configService = configService;
    }
    async validate(payload) {
        return {
            id: payload.id,
            email: payload.email,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtStrategy);


/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__(3);
const passport_local_1 = __webpack_require__(35);
const passport_1 = __webpack_require__(32);
const common_1 = __webpack_require__(5);
const auth_db_service_1 = __webpack_require__(23);
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authDbService) {
        super();
        this.authDbService = authDbService;
    }
    async validate(username, password) {
        const admin = await this.authDbService.validateAdmin(username, password);
        if (!admin) {
            throw new common_1.UnauthorizedException();
        }
        return admin;
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_db_service_1.AuthDbService !== "undefined" && auth_db_service_1.AuthDbService) === "function" ? _a : Object])
], LocalStrategy);


/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersDbModule = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
const services_module_1 = __webpack_require__(20);
const users_db_service_1 = __webpack_require__(38);
let UsersDbModule = class UsersDbModule {
};
exports.UsersDbModule = UsersDbModule;
exports.UsersDbModule = UsersDbModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_module_1.ServicesModule.forFeature([models_1.User])],
        providers: [users_db_service_1.UsersDbService],
        exports: [users_db_service_1.UsersDbService],
    })
], UsersDbModule);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersDbService = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
const abstract_1 = __webpack_require__(27);
let UsersDbService = class UsersDbService extends (0, abstract_1.Resource)(models_1.User) {
};
exports.UsersDbService = UsersDbService;
exports.UsersDbService = UsersDbService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UsersDbService);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthResolver_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolver = void 0;
const tslib_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(6);
const services_1 = __webpack_require__(19);
const common_1 = __webpack_require__(5);
const models_1 = __webpack_require__(10);
const guards_1 = __webpack_require__(40);
const decorators_1 = __webpack_require__(43);
let AuthResolver = AuthResolver_1 = class AuthResolver {
    constructor(authDbService, adminDbService) {
        this.authDbService = authDbService;
        this.adminDbService = adminDbService;
        this.logger = new common_1.Logger(AuthResolver_1.name);
    }
    profile(user) {
        this.logger.log(`Admin with email: ${user.email} connected.`);
        return this.adminDbService.findOne({ where: { id: user.id } });
    }
    adminTest() {
        return this.adminDbService.findOne({ where: { id: 1 } });
    }
    async login(email, password) {
        const admin = await this.authDbService.validateAdmin(email, password);
        if (!admin) {
            throw new common_1.UnauthorizedException({
                status: 401,
                message: 'El correo y/o contraseña es erronea. Verifique e intente nuevamente.',
            });
        }
        if (!admin.active) {
            throw new common_1.UnauthorizedException({
                status: 401,
                message: 'El usuario se encuentra inactivo. Contacte al administrador para mas información.',
            });
        }
        this.logger.log(`User with email: ${email} logged in.`);
        const token = { token: await this.authDbService.login(admin) };
        return token;
    }
};
exports.AuthResolver = AuthResolver;
tslib_1.__decorate([
    (0, graphql_1.Query)(() => models_1.Admin),
    (0, common_1.UseGuards)(guards_1.GqlAuthGuard),
    tslib_1.__param(0, (0, decorators_1.CurrentUser)('user')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof models_1.Admin !== "undefined" && models_1.Admin) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthResolver.prototype, "profile", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => models_1.Admin),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AuthResolver.prototype, "adminTest", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.Token),
    tslib_1.__param(0, (0, graphql_1.Args)('email')),
    tslib_1.__param(1, (0, graphql_1.Args)('password')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
exports.AuthResolver = AuthResolver = AuthResolver_1 = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => models_1.Admin),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.AuthDbService !== "undefined" && services_1.AuthDbService) === "function" ? _a : Object, typeof (_b = typeof services_1.AdminDbService !== "undefined" && services_1.AdminDbService) === "function" ? _b : Object])
], AuthResolver);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(41), exports);
tslib_1.__exportStar(__webpack_require__(42), exports);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(3);
// NestJS Modules
const common_1 = __webpack_require__(5);
const passport_1 = __webpack_require__(32);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GqlAuthGuard = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const passport_1 = __webpack_require__(32);
const graphql_1 = __webpack_require__(6);
let GqlAuthGuard = class GqlAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
};
exports.GqlAuthGuard = GqlAuthGuard;
exports.GqlAuthGuard = GqlAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], GqlAuthGuard);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(44), exports);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
// NestJS Modules
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(6);
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(5);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const port = process.env.PORT || 4001;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();

})();

/******/ })()
;