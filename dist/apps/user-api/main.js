/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = exports.PsicoModules = void 0;
const tslib_1 = __webpack_require__(4);
const apollo_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
const path_1 = __webpack_require__(7);
const default_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(9);
const models_1 = __webpack_require__(10);
const config_1 = __webpack_require__(32);
const auth_module_1 = __webpack_require__(33);
exports.PsicoModules = [auth_module_1.AuthModule];
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
            ...exports.PsicoModules,
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                useFactory: () => ({
                    autoSchemaFile: (0, path_1.join)(process.cwd(), 'schemas/user-schema.gql'),
                    playground: false,
                    plugins: [(0, default_1.ApolloServerPluginLandingPageLocalDefault)()],
                    path: '/graphql/user',
                    include: [...exports.PsicoModules],
                }),
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

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
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(11), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeOrmEntities = void 0;
const tslib_1 = __webpack_require__(4);
const user_entity_1 = __webpack_require__(12);
const admin_entity_1 = __webpack_require__(16);
const generation_entity_1 = __webpack_require__(17);
const attendance_entity_1 = __webpack_require__(18);
const photo_entity_1 = __webpack_require__(20);
const user_certificate_entity_1 = __webpack_require__(21);
const autorization_entity_1 = __webpack_require__(22);
const calendar_entity_1 = __webpack_require__(23);
const user_details_entity_1 = __webpack_require__(24);
exports.typeOrmEntities = [
    user_entity_1.User,
    admin_entity_1.Admin,
    generation_entity_1.Generation,
    attendance_entity_1.Attendance,
    photo_entity_1.Photo,
    user_certificate_entity_1.UserCertificate,
    autorization_entity_1.Autorization,
    calendar_entity_1.Calendar,
    user_details_entity_1.UserDetails,
];
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(12), exports);
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(15), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(18), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = exports.RoleUser = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(13);
const graphql_1 = __webpack_require__(6);
const bcrypt = tslib_1.__importStar(__webpack_require__(14));
const campus_entity_1 = __webpack_require__(15);
const _1 = __webpack_require__(11);
var RoleUser;
(function (RoleUser) {
    RoleUser["STUDENT"] = "STUDENT";
    RoleUser["GRADUATE"] = "GRADUATE";
    RoleUser["BUSSINES"] = "BUSINESS";
})(RoleUser || (exports.RoleUser = RoleUser = {}));
(0, graphql_1.registerEnumType)(RoleUser, {
    name: 'RoleUser',
});
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
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "enrollment", void 0);
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
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "active", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: campus_entity_1.CampusEnum }),
    (0, graphql_1.Field)(() => campus_entity_1.CampusEnum),
    tslib_1.__metadata("design:type", typeof (_a = typeof campus_entity_1.CampusEnum !== "undefined" && campus_entity_1.CampusEnum) === "function" ? _a : Object)
], User.prototype, "campus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unsigned: true, nullable: true }),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "generationId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: RoleUser }),
    (0, graphql_1.Field)(() => RoleUser),
    tslib_1.__metadata("design:type", String)
], User.prototype, "role", void 0);
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
    (0, typeorm_1.ManyToOne)(() => _1.Generation, (generation) => generation.users),
    (0, graphql_1.Field)(() => _1.Generation),
    tslib_1.__metadata("design:type", typeof (_b = typeof _1.Generation !== "undefined" && _1.Generation) === "function" ? _b : Object)
], User.prototype, "generation", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Attendance, (att) => att.user),
    (0, graphql_1.Field)(() => _1.Attendance, { nullable: true }),
    tslib_1.__metadata("design:type", typeof (_c = typeof _1.Attendance !== "undefined" && _1.Attendance) === "function" ? _c : Object)
], User.prototype, "attendances", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Photo, (photo) => photo.user),
    (0, graphql_1.Field)(() => [_1.Photo], { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "photos", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => _1.UserCertificate, (document) => document.user),
    (0, graphql_1.Field)(() => [_1.UserCertificate], { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "document", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Autorization, (autorization) => autorization.user),
    (0, graphql_1.Field)(() => [_1.Autorization], { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "autorization", void 0);
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
exports.CampusEnum = void 0;
const graphql_1 = __webpack_require__(6);
var CampusEnum;
(function (CampusEnum) {
    CampusEnum["MERIDA"] = "MERIDA";
    CampusEnum["VALLADOLID"] = "VALLADOLID";
    CampusEnum["TIZIMIN"] = "TIZIMIN";
    CampusEnum["OXKUTZCAB"] = "OXKUTZCAB";
})(CampusEnum || (exports.CampusEnum = CampusEnum = {}));
(0, graphql_1.registerEnumType)(CampusEnum, {
    name: 'CampusEnum',
});


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Admin = exports.RoleEnum = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(13);
const graphql_1 = __webpack_require__(6);
const bcrypt = tslib_1.__importStar(__webpack_require__(14));
const campus_entity_1 = __webpack_require__(15);
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["ADMIN"] = "ADMIN";
    RoleEnum["PSICOL"] = "PSICOL";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
(0, graphql_1.registerEnumType)(RoleEnum, {
    name: 'RoleEnum',
});
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
    (0, typeorm_1.Column)({ type: 'enum', enum: RoleEnum, nullable: true }),
    (0, graphql_1.Field)(() => RoleEnum, {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "role", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: campus_entity_1.CampusEnum }),
    (0, graphql_1.Field)(() => campus_entity_1.CampusEnum),
    tslib_1.__metadata("design:type", typeof (_a = typeof campus_entity_1.CampusEnum !== "undefined" && campus_entity_1.CampusEnum) === "function" ? _a : Object)
], Admin.prototype, "campus", void 0);
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
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Generation = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(13);
const graphql_1 = __webpack_require__(6);
const campus_entity_1 = __webpack_require__(15);
const _1 = __webpack_require__(11);
let Generation = class Generation {
};
exports.Generation = Generation;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Generation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Generation.prototype, "entryName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: campus_entity_1.CampusEnum }),
    (0, graphql_1.Field)(() => campus_entity_1.CampusEnum),
    tslib_1.__metadata("design:type", typeof (_a = typeof campus_entity_1.CampusEnum !== "undefined" && campus_entity_1.CampusEnum) === "function" ? _a : Object)
], Generation.prototype, "campus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], Generation.prototype, "inProgress", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Generation.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Generation.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => _1.User, (user) => user.generation),
    (0, graphql_1.Field)(() => [_1.User]),
    tslib_1.__metadata("design:type", Array)
], Generation.prototype, "users", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Calendar, (map) => map.generation),
    (0, graphql_1.Field)(() => [_1.Calendar]),
    tslib_1.__metadata("design:type", Array)
], Generation.prototype, "calendar", void 0);
exports.Generation = Generation = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('generations')
], Generation);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Attendance = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(13);
const graphql_1 = __webpack_require__(6);
const raeason_attendance_entity_1 = __webpack_require__(19);
const _1 = __webpack_require__(11);
let Attendance = class Attendance {
};
exports.Attendance = Attendance;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Attendance.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Attendance.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Attendance.prototype, "checkIn", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Attendance.prototype, "checkOut", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Attendance.prototype, "recordDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], Attendance.prototype, "delay", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], Attendance.prototype, "justifiedDelay", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], Attendance.prototype, "justifiedAbsence", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: raeason_attendance_entity_1.ReasonEmun, nullable: true }),
    (0, graphql_1.Field)(() => raeason_attendance_entity_1.ReasonEmun, { nullable: true }),
    tslib_1.__metadata("design:type", typeof (_a = typeof raeason_attendance_entity_1.ReasonEmun !== "undefined" && raeason_attendance_entity_1.ReasonEmun) === "function" ? _a : Object)
], Attendance.prototype, "reason", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: '10000', nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Attendance.prototype, "descripcion", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Attendance.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Attendance.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, (user) => user.attendances),
    (0, graphql_1.Field)(() => _1.User),
    tslib_1.__metadata("design:type", typeof (_b = typeof _1.User !== "undefined" && _1.User) === "function" ? _b : Object)
], Attendance.prototype, "user", void 0);
exports.Attendance = Attendance = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('attendance')
], Attendance);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReasonEmun = void 0;
const graphql_1 = __webpack_require__(6);
var ReasonEmun;
(function (ReasonEmun) {
    ReasonEmun["ACADEMIC"] = "ACADEMIC";
    ReasonEmun["PERSONAL"] = "PERSONAL";
    ReasonEmun["OTHER"] = "OTHER";
})(ReasonEmun || (exports.ReasonEmun = ReasonEmun = {}));
(0, graphql_1.registerEnumType)(ReasonEmun, {
    name: 'ReasonEmun',
});


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Photo = void 0;
const tslib_1 = __webpack_require__(4);
// NestJS Modules
const graphql_1 = __webpack_require__(6);
// Third-Party Libraries
const typeorm_1 = __webpack_require__(13);
// Entities
const _1 = __webpack_require__(11);
let Photo = class Photo {
};
exports.Photo = Photo;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "url", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], Photo.prototype, "admin", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, (user) => user.photos),
    tslib_1.__metadata("design:type", typeof (_a = typeof _1.User !== "undefined" && _1.User) === "function" ? _a : Object)
], Photo.prototype, "user", void 0);
exports.Photo = Photo = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('images')
], Photo);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCertificate = void 0;
const tslib_1 = __webpack_require__(4);
// NestJS Modules
const graphql_1 = __webpack_require__(6);
// Third-Party Libraries
const typeorm_1 = __webpack_require__(13);
// Entities
const _1 = __webpack_require__(11);
let UserCertificate = class UserCertificate {
};
exports.UserCertificate = UserCertificate;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], UserCertificate.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserCertificate.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], UserCertificate.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserCertificate.prototype, "url", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserCertificate.prototype, "fileId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserCertificate.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserCertificate.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserCertificate.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, (user) => user.document),
    tslib_1.__metadata("design:type", typeof (_a = typeof _1.User !== "undefined" && _1.User) === "function" ? _a : Object)
], UserCertificate.prototype, "user", void 0);
exports.UserCertificate = UserCertificate = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('user_certificate')
], UserCertificate);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Autorization = exports.CauseEmun = exports.StatusAutorizationEmun = void 0;
const tslib_1 = __webpack_require__(4);
// NestJS Modules
const graphql_1 = __webpack_require__(6);
// Third-Party Libraries
const typeorm_1 = __webpack_require__(13);
// Entities
const _1 = __webpack_require__(11);
var StatusAutorizationEmun;
(function (StatusAutorizationEmun) {
    StatusAutorizationEmun["ACTIVE"] = "ACTIVE";
    StatusAutorizationEmun["SUSPENDED"] = "SUSPENDED";
    StatusAutorizationEmun["GRADUATE"] = "GRADUATE";
    StatusAutorizationEmun["DETAINED"] = "DETAINED";
})(StatusAutorizationEmun || (exports.StatusAutorizationEmun = StatusAutorizationEmun = {}));
(0, graphql_1.registerEnumType)(StatusAutorizationEmun, {
    name: 'StatusAutorizationEmun',
});
var CauseEmun;
(function (CauseEmun) {
    CauseEmun["FAULTS"] = "FAULTS";
    CauseEmun["NOTCONSTANCY"] = "NOTCONSTANCY";
    CauseEmun["PROVGRADES"] = "PROVGRADES";
    CauseEmun["ORIGRADES"] = "ORIGRADES";
    CauseEmun["LOWAVERAGE"] = "LOWAVERAGE";
    CauseEmun["EXTRAORDINARY"] = "EXTRAORDINARY";
    CauseEmun["PERSONALSCHOOL"] = "PERSONALSCHOOL";
    CauseEmun["VOCATIONALSCHOOL"] = "VOCATIONALSCHOOL";
    CauseEmun["MISSING"] = "MISSING";
    CauseEmun["BREAKRULES"] = "BREAKRULES";
    CauseEmun["OTHER"] = "OTHER";
})(CauseEmun || (exports.CauseEmun = CauseEmun = {}));
(0, graphql_1.registerEnumType)(CauseEmun, {
    name: 'CauseEmun',
});
let Autorization = class Autorization {
};
exports.Autorization = Autorization;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Autorization.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Autorization.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: StatusAutorizationEmun }),
    (0, graphql_1.Field)(() => StatusAutorizationEmun),
    tslib_1.__metadata("design:type", String)
], Autorization.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Autorization.prototype, "percentage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], Autorization.prototype, "previousPayment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Autorization.prototype, "numberMonths", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Autorization.prototype, "previousMonths", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CauseEmun, nullable: true }),
    (0, graphql_1.Field)(() => CauseEmun, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], Autorization.prototype, "cause", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: '10000', nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Autorization.prototype, "otherCause", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Autorization.prototype, "date", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Autorization.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Autorization.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, (user) => user.autorization),
    (0, graphql_1.Field)(() => _1.User),
    tslib_1.__metadata("design:type", typeof (_a = typeof _1.User !== "undefined" && _1.User) === "function" ? _a : Object)
], Autorization.prototype, "user", void 0);
exports.Autorization = Autorization = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('autorization')
], Autorization);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Calendar = void 0;
const tslib_1 = __webpack_require__(4);
// NestJS Modules
const graphql_1 = __webpack_require__(6);
// Third-Party Libraries
const typeorm_1 = __webpack_require__(13);
// Entities
const _1 = __webpack_require__(11);
const campus_entity_1 = __webpack_require__(15);
let Calendar = class Calendar {
};
exports.Calendar = Calendar;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ unsigned: true }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Calendar.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Calendar.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unsigned: true }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Calendar.prototype, "generationId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Calendar.prototype, "date", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: campus_entity_1.CampusEnum }),
    (0, graphql_1.Field)(() => campus_entity_1.CampusEnum),
    tslib_1.__metadata("design:type", typeof (_a = typeof campus_entity_1.CampusEnum !== "undefined" && campus_entity_1.CampusEnum) === "function" ? _a : Object)
], Calendar.prototype, "campus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Calendar.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Calendar.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Generation, (generation) => generation.calendar),
    (0, graphql_1.Field)(() => _1.Generation),
    tslib_1.__metadata("design:type", typeof (_b = typeof _1.Generation !== "undefined" && _1.Generation) === "function" ? _b : Object)
], Calendar.prototype, "generation", void 0);
exports.Calendar = Calendar = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('calendar')
], Calendar);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserDetails = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(13);
const graphql_1 = __webpack_require__(6);
let UserDetails = class UserDetails {
};
exports.UserDetails = UserDetails;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], UserDetails.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], UserDetails.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], UserDetails.prototype, "amountSupport", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], UserDetails.prototype, "discount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserDetails.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], UserDetails.prototype, "updatedAt", void 0);
exports.UserDetails = UserDetails = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('user_details')
], UserDetails);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Token = void 0;
const tslib_1 = __webpack_require__(4);
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
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuccessMessage = void 0;
const tslib_1 = __webpack_require__(4);
// NestJS Modules
const graphql_1 = __webpack_require__(6);
let SuccessMessage = class SuccessMessage {
};
exports.SuccessMessage = SuccessMessage;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], SuccessMessage.prototype, "message", void 0);
exports.SuccessMessage = SuccessMessage = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], SuccessMessage);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InternalServerError = exports.BadRequestError = exports.NotFoundError = void 0;
var NotFoundError;
(function (NotFoundError) {
    NotFoundError["USER"] = "El usuario no ha sido encontrado.";
    NotFoundError["GENERATION"] = "La generaci\u00F3n no ha sido encontrada. Intente m\u00E1s tarde.";
    NotFoundError["ATTENDANCE"] = "El registro de asistencia no ha sido encontrado. Intente m\u00E1s tarde.";
    NotFoundError["CALENDAR"] = "Error al crear una fecha en el calendario. Intente m\u00E1s tarde.";
})(NotFoundError || (exports.NotFoundError = NotFoundError = {}));
var BadRequestError;
(function (BadRequestError) {
    BadRequestError["EMAIL_USED"] = "El correo electr\u00F3nico ya se encuentra utilizado. Intente con uno diferente.";
    BadRequestError["ENROLLMENT_USED"] = "La matr\u00EDcula ya se encuentra utilizada. Intente con uno diferente.";
})(BadRequestError || (exports.BadRequestError = BadRequestError = {}));
var InternalServerError;
(function (InternalServerError) {
    InternalServerError["SERVER"] = "Error de servidor. Intente mas tarde.";
})(InternalServerError || (exports.InternalServerError = InternalServerError = {}));


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generatePrefix = void 0;
const generatePrefix = () => {
    const date = Date.now().toString();
    return date.substr(date.length - 5);
};
exports.generatePrefix = generatePrefix;


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(31), exports);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const services_1 = __webpack_require__(34);
const common_1 = __webpack_require__(1);
const auth_resolver_1 = __webpack_require__(72);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_1.AuthDbModule, services_1.UsersDbModule],
        providers: [auth_resolver_1.AuthResolver, services_1.LocalStrategy, services_1.JwtStrategy],
    })
], AuthModule);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(35), exports);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(44), exports);
tslib_1.__exportStar(__webpack_require__(39), exports);
tslib_1.__exportStar(__webpack_require__(54), exports);
tslib_1.__exportStar(__webpack_require__(57), exports);
tslib_1.__exportStar(__webpack_require__(60), exports);
tslib_1.__exportStar(__webpack_require__(63), exports);
tslib_1.__exportStar(__webpack_require__(66), exports);
tslib_1.__exportStar(__webpack_require__(69), exports);


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ServicesModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicesModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
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
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);
tslib_1.__exportStar(__webpack_require__(48), exports);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthDbModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_db_service_1 = __webpack_require__(38);
const jwt_1 = __webpack_require__(47);
const config_1 = __webpack_require__(32);
const strategies_1 = __webpack_require__(48);
const passport_1 = __webpack_require__(50);
const admin_db_1 = __webpack_require__(39);
const users_db_1 = __webpack_require__(44);
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
            users_db_1.UsersDbModule,
        ],
        providers: [auth_db_service_1.AuthDbService, strategies_1.LocalStrategy],
        exports: [auth_db_service_1.AuthDbService, jwt_1.JwtModule, strategies_1.LocalStrategy],
    })
], AuthDbModule);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthDbService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthDbService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const admin_db_1 = __webpack_require__(39);
const users_db_1 = __webpack_require__(44);
const bcrypt = tslib_1.__importStar(__webpack_require__(14));
const jwt_1 = __webpack_require__(47);
let AuthDbService = AuthDbService_1 = class AuthDbService {
    constructor(adminDbService, jwtService, usersDbService) {
        this.adminDbService = adminDbService;
        this.jwtService = jwtService;
        this.usersDbService = usersDbService;
        this.logger = new common_1.Logger(AuthDbService_1.name);
    }
    async validateAdmin(email, pass) {
        try {
            const admin = await this.adminDbService.findOne({
                where: { email },
                select: ['id', 'email', 'password', 'active', 'campus'],
            });
            const passOk = await bcrypt.compare(pass, admin.password);
            if (admin && passOk) {
                this.logger.log(`Admin with email: ${email} validated.`);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...result } = admin;
                return result;
            }
            this.logger.log(`Admin with email: ${email} fail validation.`);
            return null;
        }
        catch (e) {
            this.logger.log(`Admin with email: ${email} fail validation.`);
            return null;
        }
    }
    async validateUser(email, pass) {
        try {
            const user = await this.usersDbService.findOne({
                where: { email },
                select: ['id', 'email', 'password', 'active', 'role', 'campus'],
            });
            const passOk = await bcrypt.compare(pass, user.password);
            if (user && passOk) {
                this.logger.log(`User with email: ${user.email} validated.`);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...result } = user;
                return result;
            }
            this.logger.log(`User with email: ${user.email} fail validation.`);
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
            campus: admin.campus,
        };
        return this.jwtService.sign(payload);
    }
    async loginUser(user) {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            campus: user.campus,
        };
        return this.jwtService.sign(payload);
    }
};
exports.AuthDbService = AuthDbService;
exports.AuthDbService = AuthDbService = AuthDbService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof admin_db_1.AdminDbService !== "undefined" && admin_db_1.AdminDbService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof users_db_1.UsersDbService !== "undefined" && users_db_1.UsersDbService) === "function" ? _c : Object])
], AuthDbService);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(41), exports);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminDbModule = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const services_module_1 = __webpack_require__(35);
const admin_db_service_1 = __webpack_require__(41);
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
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminDbService = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const abstract_1 = __webpack_require__(42);
let AdminDbService = class AdminDbService extends (0, abstract_1.Resource)(models_1.Admin) {
};
exports.AdminDbService = AdminDbService;
exports.AdminDbService = AdminDbService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AdminDbService);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(43), exports);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Resource = exports.BaseClass = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
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
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(45), exports);
tslib_1.__exportStar(__webpack_require__(46), exports);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersDbModule = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const services_module_1 = __webpack_require__(35);
const users_db_service_1 = __webpack_require__(46);
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
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersDbService = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const abstract_1 = __webpack_require__(42);
let UsersDbService = class UsersDbService extends (0, abstract_1.Resource)(models_1.User) {
    async usersAttendance(campus, generation, startOfDay, endOfDay) {
        const users = await this.repository
            .createQueryBuilder('user')
            .innerJoin('attendance', 'att', 'user.id = att.userId')
            .where('user.campus = :campus', { campus })
            .andWhere('user.generationId = :generation', { generation })
            .andWhere('(att.checkIn BETWEEN :startOfDay AND :endOfDay)', {
            startOfDay,
            endOfDay,
        })
            .getMany();
        return users;
    }
};
exports.UsersDbService = UsersDbService;
exports.UsersDbService = UsersDbService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UsersDbService);


/***/ }),
/* 47 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(49), exports);
tslib_1.__exportStar(__webpack_require__(52), exports);


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(32);
const passport_1 = __webpack_require__(50);
const passport_jwt_1 = __webpack_require__(51);
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
            campus: payload.campus,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtStrategy);


/***/ }),
/* 50 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 51 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__(4);
const passport_local_1 = __webpack_require__(53);
const passport_1 = __webpack_require__(50);
const common_1 = __webpack_require__(1);
const auth_db_service_1 = __webpack_require__(38);
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authDbService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
        this.authDbService = authDbService;
    }
    // async validate(email: string, password: string): Promise<Partial<Admin>> {
    //   return await this.authDbService.validateAdmin(email, password);
    // }
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
/* 53 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(55), exports);
tslib_1.__exportStar(__webpack_require__(56), exports);


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerationDbModule = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const services_module_1 = __webpack_require__(35);
const generation_db_service_1 = __webpack_require__(56);
let GenerationDbModule = class GenerationDbModule {
};
exports.GenerationDbModule = GenerationDbModule;
exports.GenerationDbModule = GenerationDbModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_module_1.ServicesModule.forFeature([models_1.Generation])],
        providers: [generation_db_service_1.GenerationDbService],
        exports: [generation_db_service_1.GenerationDbService],
    })
], GenerationDbModule);


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerationDbService = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const abstract_1 = __webpack_require__(42);
let GenerationDbService = class GenerationDbService extends (0, abstract_1.Resource)(models_1.Generation) {
};
exports.GenerationDbService = GenerationDbService;
exports.GenerationDbService = GenerationDbService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], GenerationDbService);


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(58), exports);
tslib_1.__exportStar(__webpack_require__(59), exports);


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttendanceDbModule = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const services_module_1 = __webpack_require__(35);
const attendance_db_service_1 = __webpack_require__(59);
let AttendanceDbModule = class AttendanceDbModule {
};
exports.AttendanceDbModule = AttendanceDbModule;
exports.AttendanceDbModule = AttendanceDbModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_module_1.ServicesModule.forFeature([models_1.Attendance])],
        providers: [attendance_db_service_1.AttendanceDbService],
        exports: [attendance_db_service_1.AttendanceDbService],
    })
], AttendanceDbModule);


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttendanceDbService = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const abstract_1 = __webpack_require__(42);
let AttendanceDbService = class AttendanceDbService extends (0, abstract_1.Resource)(models_1.Attendance) {
    async getAttendanceByDate(campus, generation, searchDate) {
        const result = await this.repository
            .createQueryBuilder('att')
            .innerJoin('users', 'user', 'user.id = att.userId')
            .where('user.campus = :campus', { campus })
            .andWhere('user.generationId = :generation', { generation })
            .andWhere('att.recordDate = :searchDate', { searchDate })
            // .andWhere('(att.checkIn BETWEEN :startOfDay AND :endOfDay)', {
            //   startOfDay,
            //   endOfDay,
            // })
            .getMany();
        return result;
    }
};
exports.AttendanceDbService = AttendanceDbService;
exports.AttendanceDbService = AttendanceDbService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AttendanceDbService);


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(61), exports);
tslib_1.__exportStar(__webpack_require__(62), exports);


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhotosDbModule = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const services_module_1 = __webpack_require__(35);
const photo_db_service_1 = __webpack_require__(62);
let PhotosDbModule = class PhotosDbModule {
};
exports.PhotosDbModule = PhotosDbModule;
exports.PhotosDbModule = PhotosDbModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_module_1.ServicesModule.forFeature([models_1.Photo])],
        providers: [photo_db_service_1.PhotosDbService],
        exports: [photo_db_service_1.PhotosDbService],
    })
], PhotosDbModule);


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhotosDbService = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const abstract_1 = __webpack_require__(42);
let PhotosDbService = class PhotosDbService extends (0, abstract_1.Resource)(models_1.Photo) {
};
exports.PhotosDbService = PhotosDbService;
exports.PhotosDbService = PhotosDbService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PhotosDbService);


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(64), exports);
tslib_1.__exportStar(__webpack_require__(65), exports);


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCertificateDbModule = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const services_module_1 = __webpack_require__(35);
const user_certificate_db_service_1 = __webpack_require__(65);
let UserCertificateDbModule = class UserCertificateDbModule {
};
exports.UserCertificateDbModule = UserCertificateDbModule;
exports.UserCertificateDbModule = UserCertificateDbModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_module_1.ServicesModule.forFeature([models_1.UserCertificate])],
        providers: [user_certificate_db_service_1.UserCertificateDbService],
        exports: [user_certificate_db_service_1.UserCertificateDbService],
    })
], UserCertificateDbModule);


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCertificateDbService = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const abstract_1 = __webpack_require__(42);
let UserCertificateDbService = class UserCertificateDbService extends (0, abstract_1.Resource)(models_1.UserCertificate) {
};
exports.UserCertificateDbService = UserCertificateDbService;
exports.UserCertificateDbService = UserCertificateDbService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UserCertificateDbService);


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(67), exports);
tslib_1.__exportStar(__webpack_require__(68), exports);


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutorizationDbModule = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const services_module_1 = __webpack_require__(35);
const autorization_db_service_1 = __webpack_require__(68);
let AutorizationDbModule = class AutorizationDbModule {
};
exports.AutorizationDbModule = AutorizationDbModule;
exports.AutorizationDbModule = AutorizationDbModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_module_1.ServicesModule.forFeature([models_1.Autorization])],
        providers: [autorization_db_service_1.AutorizationDbService],
        exports: [autorization_db_service_1.AutorizationDbService],
    })
], AutorizationDbModule);


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutorizationDbService = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const abstract_1 = __webpack_require__(42);
let AutorizationDbService = class AutorizationDbService extends (0, abstract_1.Resource)(models_1.Autorization) {
};
exports.AutorizationDbService = AutorizationDbService;
exports.AutorizationDbService = AutorizationDbService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AutorizationDbService);


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(70), exports);
tslib_1.__exportStar(__webpack_require__(71), exports);


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalendarDbModule = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const services_module_1 = __webpack_require__(35);
const calendar_db_service_1 = __webpack_require__(71);
let CalendarDbModule = class CalendarDbModule {
};
exports.CalendarDbModule = CalendarDbModule;
exports.CalendarDbModule = CalendarDbModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_module_1.ServicesModule.forFeature([models_1.Calendar])],
        providers: [calendar_db_service_1.CalendarDbService],
        exports: [calendar_db_service_1.CalendarDbService],
    })
], CalendarDbModule);


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalendarDbService = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const abstract_1 = __webpack_require__(42);
let CalendarDbService = class CalendarDbService extends (0, abstract_1.Resource)(models_1.Calendar) {
};
exports.CalendarDbService = CalendarDbService;
exports.CalendarDbService = CalendarDbService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], CalendarDbService);


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthResolver_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolver = void 0;
const tslib_1 = __webpack_require__(4);
const graphql_1 = __webpack_require__(6);
const services_1 = __webpack_require__(34);
const common_1 = __webpack_require__(1);
const models_1 = __webpack_require__(10);
const shared_1 = __webpack_require__(73);
const shared_2 = __webpack_require__(73);
let AuthResolver = AuthResolver_1 = class AuthResolver {
    constructor(authDbService, usersDbService) {
        this.authDbService = authDbService;
        this.usersDbService = usersDbService;
        this.logger = new common_1.Logger(AuthResolver_1.name);
    }
    profile(user) {
        this.logger.log(`Admin with email: ${user.email} connected.`);
        return this.usersDbService.findOne({ where: { id: user.id } });
    }
    async login(email, password) {
        const user = await this.authDbService.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException({
                status: 401,
                message: 'El correo y/o contraseña es erronea. Verifique e intente nuevamente.',
            });
        }
        if (!user.active) {
            throw new common_1.UnauthorizedException({
                status: 401,
                message: 'El usuario se encuentra inactivo. Contacte al administrador para mas información.',
            });
        }
        this.logger.log(`User with email: ${email} logged in.`);
        const token = { token: await this.authDbService.loginUser(user) };
        return token;
    }
};
exports.AuthResolver = AuthResolver;
tslib_1.__decorate([
    (0, graphql_1.Query)(() => models_1.Admin),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, shared_2.CurrentUser)('user')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof models_1.Admin !== "undefined" && models_1.Admin) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthResolver.prototype, "profile", null);
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
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.AuthDbService !== "undefined" && services_1.AuthDbService) === "function" ? _a : Object, typeof (_b = typeof services_1.UsersDbService !== "undefined" && services_1.UsersDbService) === "function" ? _b : Object])
], AuthResolver);


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(74), exports);
tslib_1.__exportStar(__webpack_require__(76), exports);
tslib_1.__exportStar(__webpack_require__(80), exports);
tslib_1.__exportStar(__webpack_require__(82), exports);


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(75), exports);


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
// NestJS Modules
const common_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(77), exports);
tslib_1.__exportStar(__webpack_require__(78), exports);
tslib_1.__exportStar(__webpack_require__(79), exports);


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(4);
// NestJS Modules
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(50);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GqlAuthGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(50);
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
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GqlUserGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let GqlUserGuard = class GqlUserGuard {
    async canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req.user.iframe === false;
    }
};
exports.GqlUserGuard = GqlUserGuard;
exports.GqlUserGuard = GqlUserGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], GqlUserGuard);


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(32);
const nestjs_s3_1 = __webpack_require__(81);
const services_1 = __webpack_require__(82);
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_s3_1.S3Module.forRootAsync({
                useFactory: (configService) => ({
                    config: {
                        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
                        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
                        region: configService.get('AWS_DEFAULT_REGION'),
                        s3ForcePathStyle: true,
                        signatureVersion: 'v4',
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [...services_1.services],
        exports: [...services_1.services],
    })
], SharedModule);


/***/ }),
/* 81 */
/***/ ((module) => {

module.exports = require("nestjs-s3");

/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.services = void 0;
const tslib_1 = __webpack_require__(4);
const s3_service_1 = __webpack_require__(83);
exports.services = [s3_service_1.S3Service];
tslib_1.__exportStar(__webpack_require__(83), exports);


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var S3Service_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.S3Service = void 0;
const tslib_1 = __webpack_require__(4);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(32);
const nestjs_s3_1 = __webpack_require__(81);
let S3Service = S3Service_1 = class S3Service {
    constructor(s3, configService) {
        this.s3 = s3;
        this.configService = configService;
        this.logger = new common_1.Logger(S3Service_1.name);
    }
    uploadRecordFile(file, userId) {
        const getExtension = file.filename.split('.').pop();
        const removeAccents = file.filename
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        const withoutExtension = removeAccents.replace(/\.[^.]*$/, '');
        const cleanName = withoutExtension.replace(/[\W]+/g, '');
        const fileName = `${(0, models_1.generatePrefix)()}_${cleanName}.${getExtension}`;
        return this.s3
            .upload({
            Key: `${userId}/records/${fileName}`,
            Bucket: this.configService.get('AWS_BUCKET'),
            Body: file.createReadStream(),
            ContentType: file.mimetype,
            Metadata: { 'Content-Type': file.mimetype },
        })
            .promise();
    }
    async uploadImageFile(file, userId) {
        return this.s3
            .upload({
            Key: `${userId}/images/${(0, models_1.generatePrefix)()}_${file.filename}`,
            Bucket: this.configService.get('AWS_BUCKET'),
            Body: file.createReadStream(),
            ContentType: file.mimetype,
            Metadata: { 'Content-Type': file.mimetype },
        })
            .promise();
    }
    getFile(url) {
        return this.s3
            .getObject({
            Bucket: this.configService.get('AWS_BUCKET'),
            Key: url,
        })
            .promise();
    }
    deleteFile(url) {
        return this.s3
            .deleteObject({
            Key: url,
            Bucket: this.configService.get('AWS_BUCKET'),
        })
            .promise();
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = S3Service_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, nestjs_s3_1.InjectS3)()),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof nestjs_s3_1.S3 !== "undefined" && nestjs_s3_1.S3) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], S3Service);


/***/ }),
/* 84 */
/***/ ((module) => {

module.exports = require("graphql-upload");

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const graphql_upload_1 = __webpack_require__(84);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.use((0, graphql_upload_1.graphqlUploadExpress)({ maxFileSize: 2000000000, maxFiles: 10 }));
    const port = process.env.PORT || 4002;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();

})();

/******/ })()
;