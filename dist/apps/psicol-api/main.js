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
exports.AppModule = exports.PsicoModules = void 0;
const tslib_1 = __webpack_require__(3);
const apollo_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(6);
const path_1 = __webpack_require__(7);
const default_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(9);
const models_1 = __webpack_require__(10);
const config_1 = __webpack_require__(32);
const auth_module_1 = __webpack_require__(33);
const users_module_1 = __webpack_require__(83);
const generation_module_1 = __webpack_require__(90);
const attendance_module_1 = __webpack_require__(95);
const photos_module_1 = __webpack_require__(101);
const files_module_1 = __webpack_require__(104);
const user_certificate_module_1 = __webpack_require__(107);
const autorization_module_1 = __webpack_require__(110);
const calendar_module_1 = __webpack_require__(115);
exports.PsicoModules = [
    auth_module_1.AuthModule,
    users_module_1.UsersModule,
    generation_module_1.GenerationModule,
    attendance_module_1.AttendanceModule,
    photos_module_1.PhotosModule,
    files_module_1.FilesModule,
    user_certificate_module_1.UserCertificateModule,
    autorization_module_1.AutorizationModule,
    calendar_module_1.CalendarModule,
];
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
                    autoSchemaFile: (0, path_1.join)(process.cwd(), 'schemas/psicol-schema.gql'),
                    playground: false,
                    plugins: [(0, default_1.ApolloServerPluginLandingPageLocalDefault)()],
                    path: '/graphql/psicol',
                    include: [...exports.PsicoModules],
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
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeOrmEntities = void 0;
const tslib_1 = __webpack_require__(3);
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
const tslib_1 = __webpack_require__(3);
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
const tslib_1 = __webpack_require__(3);
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
const tslib_1 = __webpack_require__(3);
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
const tslib_1 = __webpack_require__(3);
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
const tslib_1 = __webpack_require__(3);
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
const tslib_1 = __webpack_require__(3);
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
const tslib_1 = __webpack_require__(3);
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
const tslib_1 = __webpack_require__(3);
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
const tslib_1 = __webpack_require__(3);
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
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuccessMessage = void 0;
const tslib_1 = __webpack_require__(3);
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
const tslib_1 = __webpack_require__(3);
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
const tslib_1 = __webpack_require__(3);
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
const tslib_1 = __webpack_require__(3);
const services_1 = __webpack_require__(34);
const common_1 = __webpack_require__(5);
const auth_resolver_1 = __webpack_require__(72);
const jwt_1 = __webpack_require__(44);
const config_1 = __webpack_require__(32);
const passport_1 = __webpack_require__(47);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
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
            services_1.AuthDbModule,
            services_1.AdminDbModule,
        ],
        providers: [auth_resolver_1.AuthResolver, services_1.LocalStrategy, services_1.JwtStrategy],
        exports: [jwt_1.JwtModule],
    })
], AuthModule);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(35), exports);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(51), exports);
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
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);
tslib_1.__exportStar(__webpack_require__(45), exports);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthDbModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const auth_db_service_1 = __webpack_require__(38);
const jwt_1 = __webpack_require__(44);
const config_1 = __webpack_require__(32);
const strategies_1 = __webpack_require__(45);
const passport_1 = __webpack_require__(47);
const admin_db_1 = __webpack_require__(39);
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
        providers: [auth_db_service_1.AuthDbService, strategies_1.LocalStrategy],
        exports: [auth_db_service_1.AuthDbService, jwt_1.JwtModule, strategies_1.LocalStrategy],
    })
], AuthDbModule);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthDbService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthDbService = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const admin_db_1 = __webpack_require__(39);
const bcrypt = tslib_1.__importStar(__webpack_require__(14));
const jwt_1 = __webpack_require__(44);
let AuthDbService = AuthDbService_1 = class AuthDbService {
    constructor(adminDbService, jwtService) {
        this.adminDbService = adminDbService;
        this.jwtService = jwtService;
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
    async login(admin) {
        const payload = {
            email: admin.email,
            id: admin.id,
            campus: admin.campus,
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
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(41), exports);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminDbModule = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(43), exports);


/***/ }),
/* 43 */
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
/* 44 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(46), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(32);
const passport_1 = __webpack_require__(47);
const passport_jwt_1 = __webpack_require__(48);
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
/* 47 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 48 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__(3);
const passport_local_1 = __webpack_require__(50);
const passport_1 = __webpack_require__(47);
const common_1 = __webpack_require__(5);
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
/* 50 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(52), exports);
tslib_1.__exportStar(__webpack_require__(53), exports);


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersDbModule = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
const services_module_1 = __webpack_require__(35);
const users_db_service_1 = __webpack_require__(53);
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
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersDbService = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(55), exports);
tslib_1.__exportStar(__webpack_require__(56), exports);


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerationDbModule = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(58), exports);
tslib_1.__exportStar(__webpack_require__(59), exports);


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttendanceDbModule = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(61), exports);
tslib_1.__exportStar(__webpack_require__(62), exports);


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhotosDbModule = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(64), exports);
tslib_1.__exportStar(__webpack_require__(65), exports);


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCertificateDbModule = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(67), exports);
tslib_1.__exportStar(__webpack_require__(68), exports);


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutorizationDbModule = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(70), exports);
tslib_1.__exportStar(__webpack_require__(71), exports);


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalendarDbModule = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
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
const tslib_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(6);
const services_1 = __webpack_require__(34);
const common_1 = __webpack_require__(5);
const models_1 = __webpack_require__(10);
const shared_1 = __webpack_require__(73);
const shared_2 = __webpack_require__(73);
let AuthResolver = AuthResolver_1 = class AuthResolver {
    constructor(authDbService, adminDbService) {
        this.authDbService = authDbService;
        this.adminDbService = adminDbService;
        this.logger = new common_1.Logger(AuthResolver_1.name);
    }
    async profile(admin) {
        this.logger.log(`Admin with email: ${admin.email} connected.`);
        return await this.adminDbService.findOne({
            where: { id: admin.id, role: models_1.RoleEnum.PSICOL },
        });
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
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, shared_2.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof models_1.Admin !== "undefined" && models_1.Admin) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
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
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.AuthDbService !== "undefined" && services_1.AuthDbService) === "function" ? _a : Object, typeof (_b = typeof services_1.AdminDbService !== "undefined" && services_1.AdminDbService) === "function" ? _b : Object])
], AuthResolver);


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(74), exports);
tslib_1.__exportStar(__webpack_require__(76), exports);
tslib_1.__exportStar(__webpack_require__(79), exports);
tslib_1.__exportStar(__webpack_require__(81), exports);


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(75), exports);


/***/ }),
/* 75 */
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


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(77), exports);
tslib_1.__exportStar(__webpack_require__(78), exports);


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(3);
// NestJS Modules
const common_1 = __webpack_require__(5);
const passport_1 = __webpack_require__(47);
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
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const passport_1 = __webpack_require__(47);
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
exports.SharedModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(32);
const nestjs_s3_1 = __webpack_require__(80);
const services_1 = __webpack_require__(81);
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
/* 80 */
/***/ ((module) => {

module.exports = require("nestjs-s3");

/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.services = void 0;
const tslib_1 = __webpack_require__(3);
const s3_service_1 = __webpack_require__(82);
exports.services = [s3_service_1.S3Service];
tslib_1.__exportStar(__webpack_require__(82), exports);


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var S3Service_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.S3Service = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(32);
const nestjs_s3_1 = __webpack_require__(80);
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
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const users_resolver_1 = __webpack_require__(84);
const services_1 = __webpack_require__(34);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            services_1.UsersDbModule,
            services_1.AttendanceDbModule,
            services_1.PhotosDbModule,
            services_1.UserCertificateDbModule,
            services_1.AutorizationDbModule,
        ],
        providers: [users_resolver_1.UsersResolver],
    })
], UsersModule);


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UsersResolver_1;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersResolver = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(6);
const services_1 = __webpack_require__(34);
const shared_1 = __webpack_require__(73);
const dto_1 = __webpack_require__(85);
const typeorm_1 = __webpack_require__(13);
const dayjs_1 = tslib_1.__importDefault(__webpack_require__(89));
let UsersResolver = UsersResolver_1 = class UsersResolver {
    constructor(usersDbService, attendanceDbService, photosDbService, userCertificateDbService, autorizationDbService) {
        this.usersDbService = usersDbService;
        this.attendanceDbService = attendanceDbService;
        this.photosDbService = photosDbService;
        this.userCertificateDbService = userCertificateDbService;
        this.autorizationDbService = autorizationDbService;
        this.logger = new common_1.Logger(UsersResolver_1.name);
    }
    // OBTENER TODOS LOS USUARIOS DE LA SEDE
    async getAllStudents(admin) {
        try {
            this.logger.log('Finding all users-db.');
            if (admin.campus !== models_1.CampusEnum.MERIDA) {
                return await this.usersDbService.findAll({
                    where: { campus: admin.campus, role: models_1.RoleUser.STUDENT },
                });
            }
            return await this.usersDbService.findAll({
                where: { role: models_1.RoleUser.STUDENT },
            });
        }
        catch (e) {
            this.logger.error('Error finding all users-db.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async getAllGraduates(admin) {
        try {
            const { campus } = admin;
            this.logger.log('Finding all users-db.');
            const allUsers = await this.usersDbService.findAll({
                where: { campus, role: models_1.RoleUser.GRADUATE },
            });
            return allUsers;
        }
        catch (e) {
            this.logger.error('Error finding all users-db.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async getAllBusiness(admin) {
        try {
            const { campus } = admin;
            this.logger.log('Finding all users-db.');
            const allUsers = await this.usersDbService.findAll({
                where: { campus, role: models_1.RoleUser.BUSSINES },
            });
            return allUsers;
        }
        catch (e) {
            this.logger.error('Error finding all users-db.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    //SERVICIO PARA OBTENER POR GENERACIÓN Y SEDE LA TABLA DE AUTORIZACIÓN
    async autorizationUsers(campus, generation, date) {
        try {
            this.logger.log('Finding all users-db.');
            const allUsers = await this.usersDbService.findAll({
                where: { campus, generationId: generation },
            });
            return allUsers;
        }
        catch (e) {
            this.logger.error('Error finding all users-db.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    // PARA VER DETALLES DEL USUARIO
    async findOneUser(id) {
        try {
            this.logger.log(`Finding user with id: ${id}.`);
            return await this.usersDbService.findOne({ where: { id } });
        }
        catch (e) {
            if (e instanceof typeorm_1.EntityNotFoundError) {
                this.logger.log('Error finding user. Id not founded.');
                throw new common_1.NotFoundException({
                    status: 404,
                    message: models_1.NotFoundError.USER,
                });
            }
            this.logger.error('Error finding user.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async createUser(createUserInput) {
        try {
            if (await this.usersDbService.findOne({ where: { email: createUserInput.email } }, false)) {
                this.logger.log('Register User Fail: Duplicate Email');
                throw new common_1.BadRequestException({
                    status: 400,
                    message: models_1.BadRequestError.EMAIL_USED,
                });
            }
            this.logger.log('Create user');
            const retunUser = await this.usersDbService.create({
                ...createUserInput,
                role: models_1.RoleUser.STUDENT,
            });
            return retunUser;
        }
        catch (e) {
            if (e instanceof typeorm_1.EntityNotFoundError) {
                this.logger.log('Error finding user. Id not founded.');
                throw new common_1.NotFoundException({
                    status: 404,
                    message: 'Error al crear el usuario. Intente más tarde.',
                });
            }
            this.logger.error('Error finding user.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async updateUser(updateUserInput) {
        try {
            this.logger.log(`Finding user with id: ${updateUserInput.id}.`);
            const user = await this.usersDbService.findOne({
                where: { id: updateUserInput.id },
            });
            this.logger.log(`Updating user with id: ${updateUserInput.id}.`);
            return await this.usersDbService.update(updateUserInput, user);
        }
        catch (e) {
            if (e instanceof typeorm_1.EntityNotFoundError) {
                this.logger.log('Error finding user. Id not founded.');
                throw new common_1.NotFoundException({
                    status: 404,
                    message: models_1.NotFoundError.USER,
                });
            }
            this.logger.error('Error finding user.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    //Resolvers
    async attendanceMap(user) {
        const userId = user.id;
        const currentDate = (0, dayjs_1.default)();
        const startYear = currentDate.month() >= 7 ? currentDate.year() : currentDate.year() - 1;
        const endYear = startYear + 1;
        const startDate = (0, dayjs_1.default)(`${startYear}-07-01`).format('YYYY-MM-DD');
        const endDate = (0, dayjs_1.default)(`${endYear}-06-31`).format('YYYY-MM-DD');
        const attendanceData = await this.attendanceDbService.findAll({
            where: { userId, recordDate: (0, typeorm_1.Between)(startDate, endDate) },
        });
        return attendanceData || null;
    }
    async images(user) {
        const { id } = user;
        return this.photosDbService.findAll({
            where: { userId: id, admin: true },
            order: { createdAt: 'DESC' },
        });
    }
    async documents(user) {
        const { id } = user;
        return this.userCertificateDbService.findAll({
            where: { userId: id },
            order: { createdAt: 'DESC' },
        });
    }
    async lastConstancy(user) {
        const { id } = user;
        const document = await this.userCertificateDbService.findOne({ where: { userId: id }, order: { createdAt: 'DESC' } }, false);
        return document || null;
    }
    async autorizationMonth(user, date) {
        const userId = user.id;
        const currentDate = (0, dayjs_1.default)();
        const startYear = currentDate.month() >= 7 ? currentDate.year() : currentDate.year() - 1;
        const endYear = startYear + 1;
        const startDate = (0, dayjs_1.default)(`${startYear}-07-01`).format('YYYY-MM-DD');
        const endDate = (0, dayjs_1.default)(`${endYear}-06-31`).format('YYYY-MM-DD');
        const autorization = await this.autorizationDbService.findAll({
            where: { userId, date: (0, typeorm_1.Between)(startDate, endDate) },
        });
        return autorization || null;
    }
};
exports.UsersResolver = UsersResolver;
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [models_1.User]),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, shared_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof models_1.Admin !== "undefined" && models_1.Admin) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersResolver.prototype, "getAllStudents", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [models_1.User]),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, shared_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof models_1.Admin !== "undefined" && models_1.Admin) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersResolver.prototype, "getAllGraduates", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [models_1.User]),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, shared_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof models_1.Admin !== "undefined" && models_1.Admin) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersResolver.prototype, "getAllBusiness", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => [models_1.User]),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('campus', { type: () => models_1.CampusEnum })),
    tslib_1.__param(1, (0, graphql_1.Args)('generation', { type: () => graphql_1.Int })),
    tslib_1.__param(2, (0, graphql_1.Args)('date', { type: () => String, nullable: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof models_1.CampusEnum !== "undefined" && models_1.CampusEnum) === "function" ? _j : Object, Number, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersResolver.prototype, "autorizationUsers", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => models_1.User),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersResolver.prototype, "findOneUser", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.User),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('createUserInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof dto_1.CreateUserInput !== "undefined" && dto_1.CreateUserInput) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.User),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('updateUserInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof dto_1.UpdateUserInput !== "undefined" && dto_1.UpdateUserInput) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => [models_1.Attendance], { nullable: true }),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof models_1.User !== "undefined" && models_1.User) === "function" ? _m : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersResolver.prototype, "attendanceMap", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => [models_1.Photo]),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof models_1.User !== "undefined" && models_1.User) === "function" ? _o : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersResolver.prototype, "images", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => [models_1.UserCertificate]),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_p = typeof models_1.User !== "undefined" && models_1.User) === "function" ? _p : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersResolver.prototype, "documents", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => models_1.UserCertificate, { nullable: true }),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_q = typeof models_1.User !== "undefined" && models_1.User) === "function" ? _q : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersResolver.prototype, "lastConstancy", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => [models_1.Autorization], { nullable: true }),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__param(1, (0, graphql_1.Args)('date')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_r = typeof models_1.User !== "undefined" && models_1.User) === "function" ? _r : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersResolver.prototype, "autorizationMonth", null);
exports.UsersResolver = UsersResolver = UsersResolver_1 = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => models_1.User),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.UsersDbService !== "undefined" && services_1.UsersDbService) === "function" ? _a : Object, typeof (_b = typeof services_1.AttendanceDbService !== "undefined" && services_1.AttendanceDbService) === "function" ? _b : Object, typeof (_c = typeof services_1.PhotosDbService !== "undefined" && services_1.PhotosDbService) === "function" ? _c : Object, typeof (_d = typeof services_1.UserCertificateDbService !== "undefined" && services_1.UserCertificateDbService) === "function" ? _d : Object, typeof (_e = typeof services_1.AutorizationDbService !== "undefined" && services_1.AutorizationDbService) === "function" ? _e : Object])
], UsersResolver);


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(86), exports);
tslib_1.__exportStar(__webpack_require__(88), exports);


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserInput = void 0;
const tslib_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(6);
const class_validator_1 = __webpack_require__(87);
const models_1 = __webpack_require__(10);
let CreateUserInput = class CreateUserInput {
};
exports.CreateUserInput = CreateUserInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateUserInput.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateUserInput.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    tslib_1.__metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(9, 9),
    tslib_1.__metadata("design:type", String)
], CreateUserInput.prototype, "enrollment", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(13, 13),
    tslib_1.__metadata("design:type", String)
], CreateUserInput.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateUserInput.prototype, "generationId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => models_1.CampusEnum),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(models_1.CampusEnum),
    tslib_1.__metadata("design:type", typeof (_a = typeof models_1.CampusEnum !== "undefined" && models_1.CampusEnum) === "function" ? _a : Object)
], CreateUserInput.prototype, "campus", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => models_1.RoleUser),
    (0, class_validator_1.IsEnum)(models_1.RoleUser),
    tslib_1.__metadata("design:type", typeof (_b = typeof models_1.RoleUser !== "undefined" && models_1.RoleUser) === "function" ? _b : Object)
], CreateUserInput.prototype, "role", void 0);
exports.CreateUserInput = CreateUserInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateUserInput);


/***/ }),
/* 87 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserInput = void 0;
const tslib_1 = __webpack_require__(3);
// NestJS Modules
const graphql_1 = __webpack_require__(6);
// Third-Party Libraries
const class_validator_1 = __webpack_require__(87);
// Dto's
const create_user_input_1 = __webpack_require__(86);
let UpdateUserInput = class UpdateUserInput extends (0, graphql_1.PartialType)((0, graphql_1.OmitType)(create_user_input_1.CreateUserInput, ['enrollment', 'campus'])) {
};
exports.UpdateUserInput = UpdateUserInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], UpdateUserInput.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateUserInput.prototype, "active", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateUserInput.prototype, "discount", void 0);
exports.UpdateUserInput = UpdateUserInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdateUserInput);


/***/ }),
/* 89 */
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerationModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const generation_resolver_1 = __webpack_require__(91);
const services_1 = __webpack_require__(34);
let GenerationModule = class GenerationModule {
};
exports.GenerationModule = GenerationModule;
exports.GenerationModule = GenerationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_1.GenerationDbModule],
        providers: [generation_resolver_1.GenerationResolver],
    })
], GenerationModule);


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var GenerationResolver_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerationResolver = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(6);
const services_1 = __webpack_require__(34);
const shared_1 = __webpack_require__(73);
const typeorm_1 = __webpack_require__(13);
const dto_1 = __webpack_require__(92);
let GenerationResolver = GenerationResolver_1 = class GenerationResolver {
    constructor(generationDbService) {
        this.generationDbService = generationDbService;
        this.logger = new common_1.Logger(GenerationResolver_1.name);
    }
    async findAllGenerations(admin) {
        try {
            this.logger.log('Finding all generations-db.');
            if (admin.campus === models_1.CampusEnum.MERIDA) {
                return await this.generationDbService.findAll();
            }
            return await this.generationDbService.findAll({
                where: { campus: admin.campus },
            });
        }
        catch (e) {
            this.logger.error('Error finding all users-db.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async createGeneration(admin, createGenerationInput) {
        try {
            this.logger.log('Create generation');
            const retunGeneration = await this.generationDbService.create({
                ...createGenerationInput,
            });
            return retunGeneration;
        }
        catch (e) {
            if (e instanceof typeorm_1.EntityNotFoundError) {
                this.logger.log('Error creating generation. Id not founded.');
                throw new common_1.NotFoundException({
                    status: 404,
                    message: models_1.NotFoundError.GENERATION,
                });
            }
            this.logger.error('Error finding generation.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async updateGeneration(updateGenerationInput) {
        try {
            this.logger.log(`Finding generation with id: ${updateGenerationInput.id}.`);
            const generation = await this.generationDbService.findOne({
                where: { id: updateGenerationInput.id },
            });
            this.logger.log(`Updating generation with id: ${updateGenerationInput.id}.`);
            return await this.generationDbService.update(updateGenerationInput, generation);
        }
        catch (e) {
            if (e instanceof typeorm_1.EntityNotFoundError) {
                this.logger.log('Error finding user. Id not founded.');
                throw new common_1.NotFoundException({
                    status: 404,
                    message: models_1.NotFoundError.GENERATION,
                });
            }
            this.logger.error('Error finding user.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
};
exports.GenerationResolver = GenerationResolver;
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [models_1.Generation]),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, shared_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof models_1.Admin !== "undefined" && models_1.Admin) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GenerationResolver.prototype, "findAllGenerations", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.Generation),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, shared_1.CurrentUser)()),
    tslib_1.__param(1, (0, graphql_1.Args)('createGenerationInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof models_1.Admin !== "undefined" && models_1.Admin) === "function" ? _c : Object, typeof (_d = typeof dto_1.CreateGenerationInput !== "undefined" && dto_1.CreateGenerationInput) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GenerationResolver.prototype, "createGeneration", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.Generation),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('updateGenerationInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof dto_1.UpdateGenerationInput !== "undefined" && dto_1.UpdateGenerationInput) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GenerationResolver.prototype, "updateGeneration", null);
exports.GenerationResolver = GenerationResolver = GenerationResolver_1 = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => models_1.Generation),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.GenerationDbService !== "undefined" && services_1.GenerationDbService) === "function" ? _a : Object])
], GenerationResolver);


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(93), exports);
tslib_1.__exportStar(__webpack_require__(94), exports);


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateGenerationInput = void 0;
const tslib_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(6);
const class_validator_1 = __webpack_require__(87);
const models_1 = __webpack_require__(10);
let CreateGenerationInput = class CreateGenerationInput {
};
exports.CreateGenerationInput = CreateGenerationInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateGenerationInput.prototype, "entryName", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateGenerationInput.prototype, "inProgress", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => models_1.CampusEnum),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(models_1.CampusEnum),
    tslib_1.__metadata("design:type", typeof (_a = typeof models_1.CampusEnum !== "undefined" && models_1.CampusEnum) === "function" ? _a : Object)
], CreateGenerationInput.prototype, "campus", void 0);
exports.CreateGenerationInput = CreateGenerationInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateGenerationInput);


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateGenerationInput = void 0;
const tslib_1 = __webpack_require__(3);
// NestJS Modules
const graphql_1 = __webpack_require__(6);
// Dto's
const create_generation_input_1 = __webpack_require__(93);
let UpdateGenerationInput = class UpdateGenerationInput extends (0, graphql_1.PartialType)(create_generation_input_1.CreateGenerationInput) {
};
exports.UpdateGenerationInput = UpdateGenerationInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], UpdateGenerationInput.prototype, "id", void 0);
exports.UpdateGenerationInput = UpdateGenerationInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdateGenerationInput);


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttendanceModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const attendance_resolver_1 = __webpack_require__(96);
const services_1 = __webpack_require__(34);
let AttendanceModule = class AttendanceModule {
};
exports.AttendanceModule = AttendanceModule;
exports.AttendanceModule = AttendanceModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_1.AttendanceDbModule, services_1.UsersDbModule],
        providers: [attendance_resolver_1.AttendanceResolver],
    })
], AttendanceModule);


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AttendanceResolver_1;
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttendanceResolver = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const common_1 = __webpack_require__(5);
const dayjs_1 = tslib_1.__importDefault(__webpack_require__(89));
const graphql_1 = __webpack_require__(6);
const services_1 = __webpack_require__(34);
const shared_1 = __webpack_require__(73);
const dto_1 = __webpack_require__(97);
const typeorm_1 = __webpack_require__(13);
let AttendanceResolver = AttendanceResolver_1 = class AttendanceResolver {
    constructor(attendanceDbService, usersDbService) {
        this.attendanceDbService = attendanceDbService;
        this.usersDbService = usersDbService;
        this.logger = new common_1.Logger(AttendanceResolver_1.name);
    }
    async generateAttendance(attendanceInput) {
        try {
            this.logger.log(`find user with enrollment ${attendanceInput.enrollment}.`);
            const user = await this.usersDbService.findOne({
                where: { enrollment: attendanceInput.enrollment },
            });
            this.logger.log('user found');
            const currentDate = (0, dayjs_1.default)();
            const time = currentDate.format('HH:mm:ss');
            const date = currentDate.format('YYYY-MM-DD');
            this.logger.log(`find attendance with date ${date}.`);
            const findAttendance = await this.attendanceDbService.findOne({ where: { userId: user.id, recordDate: date } }, false);
            if (!findAttendance) {
                this.logger.log(`Attendance NOT FOUND with user id:  ${user.id}. `);
                const lateThreshold = (0, dayjs_1.default)().hour(9).minute(0).second(0);
                const isLate = currentDate.isAfter(lateThreshold);
                await this.attendanceDbService.create({
                    userId: user.id,
                    checkIn: time,
                    delay: isLate,
                    recordDate: date,
                });
            }
            else {
                this.logger.log(`Attendance FOUND with user id:  ${user.id}. `);
                await this.attendanceDbService.update({ checkOut: time }, findAttendance);
            }
            return user;
        }
        catch (e) {
            if (e instanceof typeorm_1.EntityNotFoundError) {
                this.logger.log('Error creating attendance. Id not founded.');
                throw new common_1.NotFoundException({
                    status: 404,
                    message: models_1.NotFoundError.USER,
                });
            }
            this.logger.error('Error finding user.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async createAttendance(createAttendanceInput) {
        try {
            this.logger.log(`create attendance with user id ${createAttendanceInput.userId}.`);
            const attendance = await this.attendanceDbService.create({
                ...createAttendanceInput,
                checkIn: '00:00:00',
                checkOut: '00:00:00',
            });
            return attendance;
        }
        catch (e) {
            if (e instanceof typeorm_1.EntityNotFoundError) {
                this.logger.log('Error creating attendance. Id not founded.');
                throw new common_1.NotFoundException({
                    status: 404,
                    message: models_1.NotFoundError.USER,
                });
            }
            this.logger.error('Error finding user.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async updateAttendance(updateAttendanceInput) {
        try {
            this.logger.log(`Finding attendance with id: ${updateAttendanceInput.id}.`);
            const attendance = await this.attendanceDbService.findOne({
                where: { id: updateAttendanceInput.id },
            });
            this.logger.log(`Updating attendance with id: ${updateAttendanceInput.id}.`);
            return await this.attendanceDbService.update({ ...updateAttendanceInput }, attendance);
        }
        catch (e) {
            if (e instanceof typeorm_1.EntityNotFoundError) {
                this.logger.log('Error finding user. Id not founded.');
                throw new common_1.NotFoundException({
                    status: 404,
                    message: models_1.NotFoundError.ATTENDANCE,
                });
            }
            this.logger.error('Error finding user.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async findAttendanceUsers(campus, generation, date) {
        try {
            this.logger.log('Finding all attendance by campus and generation.');
            const currentDate = (0, dayjs_1.default)(date);
            const seatchDate = currentDate.format('YYYY-MM-DD');
            const attendance = await this.attendanceDbService.getAttendanceByDate(campus, generation, seatchDate);
            return attendance;
        }
        catch (e) {
            this.logger.error('Error finding all attendance-db.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async userAttendance(attendance) {
        const userId = attendance.userId;
        const user = await this.usersDbService.findOne({
            where: { id: userId },
        });
        return user;
    }
};
exports.AttendanceResolver = AttendanceResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.User),
    tslib_1.__param(0, (0, graphql_1.Args)('attendanceInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof dto_1.AttendanceInput !== "undefined" && dto_1.AttendanceInput) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceResolver.prototype, "generateAttendance", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.Attendance),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('createAttendanceInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateAttendanceInput !== "undefined" && dto_1.CreateAttendanceInput) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceResolver.prototype, "createAttendance", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.Attendance),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('updateAttendanceInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof dto_1.UpdateAttendanceInput !== "undefined" && dto_1.UpdateAttendanceInput) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceResolver.prototype, "updateAttendance", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => [models_1.Attendance]),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('campus', { type: () => models_1.CampusEnum })),
    tslib_1.__param(1, (0, graphql_1.Args)('generation', { type: () => graphql_1.Int })),
    tslib_1.__param(2, (0, graphql_1.Args)('date', { type: () => String })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof models_1.CampusEnum !== "undefined" && models_1.CampusEnum) === "function" ? _f : Object, Number, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceResolver.prototype, "findAttendanceUsers", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => models_1.User),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof models_1.Attendance !== "undefined" && models_1.Attendance) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttendanceResolver.prototype, "userAttendance", null);
exports.AttendanceResolver = AttendanceResolver = AttendanceResolver_1 = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => models_1.Attendance),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.AttendanceDbService !== "undefined" && services_1.AttendanceDbService) === "function" ? _a : Object, typeof (_b = typeof services_1.UsersDbService !== "undefined" && services_1.UsersDbService) === "function" ? _b : Object])
], AttendanceResolver);


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(98), exports);
tslib_1.__exportStar(__webpack_require__(99), exports);
tslib_1.__exportStar(__webpack_require__(100), exports);


/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttendanceInput = void 0;
const tslib_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(6);
const class_validator_1 = __webpack_require__(87);
let AttendanceInput = class AttendanceInput {
};
exports.AttendanceInput = AttendanceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(9, 9),
    tslib_1.__metadata("design:type", String)
], AttendanceInput.prototype, "enrollment", void 0);
exports.AttendanceInput = AttendanceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AttendanceInput);


/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAttendanceInput = void 0;
const tslib_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(6);
const class_validator_1 = __webpack_require__(87);
const models_1 = __webpack_require__(10);
let CreateAttendanceInput = class CreateAttendanceInput {
};
exports.CreateAttendanceInput = CreateAttendanceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateAttendanceInput.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsISO8601)(),
    tslib_1.__metadata("design:type", String)
], CreateAttendanceInput.prototype, "recordDate", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateAttendanceInput.prototype, "delay", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateAttendanceInput.prototype, "justifiedDelay", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateAttendanceInput.prototype, "justifiedAbsence", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => models_1.ReasonEmun, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(models_1.ReasonEmun),
    tslib_1.__metadata("design:type", typeof (_a = typeof models_1.ReasonEmun !== "undefined" && models_1.ReasonEmun) === "function" ? _a : Object)
], CreateAttendanceInput.prototype, "reason", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAttendanceInput.prototype, "descripcion", void 0);
exports.CreateAttendanceInput = CreateAttendanceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateAttendanceInput);


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAttendanceInput = void 0;
const tslib_1 = __webpack_require__(3);
// NestJS Modules
const graphql_1 = __webpack_require__(6);
// Dto's
const create_attendance_input_1 = __webpack_require__(99);
let UpdateAttendanceInput = class UpdateAttendanceInput extends (0, graphql_1.PartialType)(create_attendance_input_1.CreateAttendanceInput) {
};
exports.UpdateAttendanceInput = UpdateAttendanceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], UpdateAttendanceInput.prototype, "id", void 0);
exports.UpdateAttendanceInput = UpdateAttendanceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdateAttendanceInput);


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhotosModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const photos_resolver_1 = __webpack_require__(102);
const services_1 = __webpack_require__(34);
const shared_1 = __webpack_require__(73);
let PhotosModule = class PhotosModule {
};
exports.PhotosModule = PhotosModule;
exports.PhotosModule = PhotosModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_1.PhotosDbModule, services_1.UsersDbModule, shared_1.SharedModule],
        providers: [photos_resolver_1.PhotosResolver],
    })
], PhotosModule);


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var PhotosResolver_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhotosResolver = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const services_1 = __webpack_require__(34);
const shared_1 = __webpack_require__(73);
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(6);
const graphql_upload_1 = __webpack_require__(103);
let PhotosResolver = PhotosResolver_1 = class PhotosResolver {
    constructor(photosDbService, usersDbService, s3Service) {
        this.photosDbService = photosDbService;
        this.usersDbService = usersDbService;
        this.s3Service = s3Service;
        this.logger = new common_1.Logger(PhotosResolver_1.name);
    }
    async createPhoto(userId, photo) {
        try {
            this.logger.log('Uploading photo. Check user data.');
            const user = await this.usersDbService.findOne({
                where: { id: userId },
            });
            const validate = await this.photosDbService.findOne({ where: { userId: user.id, admin: true } }, false);
            if (validate) {
                await this.photosDbService.removeBy({ userId: user.id });
                await this.s3Service.deleteFile(validate.url);
            }
            const res = await this.s3Service.uploadImageFile(photo, user.id);
            const photoRes = await this.photosDbService.create({
                url: res.Key,
                userId: user.id,
                admin: true,
            });
            return photoRes;
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.InternalServerErrorException();
        }
    }
    async removePhoto(id, userId) {
        try {
            const photo = await this.photosDbService.findOne({ where: { id } });
            this.s3Service.deleteFile(photo.url).then().catch();
            await this.photosDbService.remove(photo);
            return { message: 'Foto eliminada exitosamente' };
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.InternalServerErrorException();
        }
    }
};
exports.PhotosResolver = PhotosResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.Photo),
    tslib_1.__param(0, (0, graphql_1.Args)({ name: 'userId', type: () => graphql_1.Int })),
    tslib_1.__param(1, (0, graphql_1.Args)({ name: 'photo', type: () => graphql_upload_1.GraphQLUpload })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, typeof (_d = typeof graphql_upload_1.FileUpload !== "undefined" && graphql_upload_1.FileUpload) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PhotosResolver.prototype, "createPhoto", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.SuccessMessage),
    tslib_1.__param(0, (0, graphql_1.Args)({ name: 'id', type: () => graphql_1.Int, nullable: true })),
    tslib_1.__param(1, (0, graphql_1.Args)({ name: 'userId', type: () => graphql_1.Int })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PhotosResolver.prototype, "removePhoto", null);
exports.PhotosResolver = PhotosResolver = PhotosResolver_1 = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => models_1.Photo),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.PhotosDbService !== "undefined" && services_1.PhotosDbService) === "function" ? _a : Object, typeof (_b = typeof services_1.UsersDbService !== "undefined" && services_1.UsersDbService) === "function" ? _b : Object, typeof (_c = typeof shared_1.S3Service !== "undefined" && shared_1.S3Service) === "function" ? _c : Object])
], PhotosResolver);


/***/ }),
/* 103 */
/***/ ((module) => {

module.exports = require("graphql-upload");

/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesModule = void 0;
const tslib_1 = __webpack_require__(3);
const services_1 = __webpack_require__(34);
const shared_1 = __webpack_require__(73);
const common_1 = __webpack_require__(5);
const files_controller_1 = __webpack_require__(105);
let FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            shared_1.SharedModule,
            services_1.UsersDbModule,
            services_1.PhotosDbModule,
            services_1.UserCertificateDbModule,
        ],
        controllers: [files_controller_1.FilesController],
    })
], FilesModule);


/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesController = void 0;
const tslib_1 = __webpack_require__(3);
const services_1 = __webpack_require__(34);
const shared_1 = __webpack_require__(73);
const common_1 = __webpack_require__(5);
const express_1 = __webpack_require__(106);
let FilesController = class FilesController {
    constructor(s3Service, usersDbService, photosDbService, userCertificateDbService) {
        this.s3Service = s3Service;
        this.usersDbService = usersDbService;
        this.photosDbService = photosDbService;
        this.userCertificateDbService = userCertificateDbService;
    }
    async getImageFile(req, id, response) {
        try {
            const photo = await this.photosDbService.findOne({
                where: {
                    id: parseInt(req.query.s3),
                },
            });
            const res = await this.s3Service.getFile(photo.url);
            response.set({ 'Content-Type': res.ContentType });
            return response.send(res.Body);
        }
        catch (e) {
            console.error(e);
            throw new common_1.NotFoundException();
        }
    }
    async getConstancyFile(req, id, response) {
        try {
            const fileId = req.query.s3;
            const document = await this.userCertificateDbService.findOne({
                where: {
                    fileId,
                    userId: id,
                },
            });
            const res = await this.s3Service.getFile(document.url);
            response.set({
                'Content-Type': res.ContentType,
                'Content-disposition': `filename=${document.name}`,
            });
            return response.send(res.Body);
        }
        catch (e) {
            console.error(e);
            throw new common_1.NotFoundException();
        }
    }
};
exports.FilesController = FilesController;
tslib_1.__decorate([
    (0, common_1.Get)('users/:id/images'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, Number, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "getImageFile", null);
tslib_1.__decorate([
    (0, common_1.Get)('users/:id/records'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object, Number, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FilesController.prototype, "getConstancyFile", null);
exports.FilesController = FilesController = tslib_1.__decorate([
    (0, common_1.Controller)('user/api/files'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof shared_1.S3Service !== "undefined" && shared_1.S3Service) === "function" ? _a : Object, typeof (_b = typeof services_1.UsersDbService !== "undefined" && services_1.UsersDbService) === "function" ? _b : Object, typeof (_c = typeof services_1.PhotosDbService !== "undefined" && services_1.PhotosDbService) === "function" ? _c : Object, typeof (_d = typeof services_1.UserCertificateDbService !== "undefined" && services_1.UserCertificateDbService) === "function" ? _d : Object])
], FilesController);


/***/ }),
/* 106 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCertificateModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const user_certificate_resolver_1 = __webpack_require__(108);
const services_1 = __webpack_require__(34);
const shared_1 = __webpack_require__(73);
let UserCertificateModule = class UserCertificateModule {
};
exports.UserCertificateModule = UserCertificateModule;
exports.UserCertificateModule = UserCertificateModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_1.UserCertificateDbModule, services_1.UsersDbModule, shared_1.SharedModule],
        providers: [user_certificate_resolver_1.UserCertificateResolver],
    })
], UserCertificateModule);


/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UserCertificateResolver_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCertificateResolver = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const services_1 = __webpack_require__(34);
const shared_1 = __webpack_require__(73);
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(6);
const dayjs_1 = tslib_1.__importDefault(__webpack_require__(89));
const graphql_upload_1 = __webpack_require__(103);
const uuid_1 = __webpack_require__(109);
let UserCertificateResolver = UserCertificateResolver_1 = class UserCertificateResolver {
    constructor(userCertificateDbService, usersDbService, s3Service) {
        this.userCertificateDbService = userCertificateDbService;
        this.usersDbService = usersDbService;
        this.s3Service = s3Service;
        this.logger = new common_1.Logger(UserCertificateResolver_1.name);
    }
    async createConstancy(userId, recordFile, startDate, endDate) {
        try {
            this.logger.log('Uploading record. Check user data.');
            const user = await this.usersDbService.findOne({
                where: { id: userId },
            });
            const currentDate = (0, dayjs_1.default)();
            const date = currentDate.format('YYYY-MM-DD HH:mm:ss');
            const res = await this.s3Service.uploadRecordFile(recordFile, user.id);
            const result = await this.userCertificateDbService.create({
                name: date,
                fileId: (0, uuid_1.v4)(),
                url: res.Key,
                userId: user.id,
                startDate,
                endDate,
            });
            return result;
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.InternalServerErrorException();
        }
    }
    async removeConstancy(id) {
        try {
            const document = await this.userCertificateDbService.findOne({
                where: { id },
            });
            this.s3Service.deleteFile(document.url).then().catch();
            await this.userCertificateDbService.remove(document);
            return { message: 'Constancia de estudios eliminada exitosamente' };
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.InternalServerErrorException();
        }
    }
};
exports.UserCertificateResolver = UserCertificateResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.UserCertificate),
    tslib_1.__param(0, (0, graphql_1.Args)({ name: 'userId', type: () => graphql_1.Int })),
    tslib_1.__param(1, (0, graphql_1.Args)({ name: 'recordFile', type: () => graphql_upload_1.GraphQLUpload })),
    tslib_1.__param(2, (0, graphql_1.Args)({ name: 'startDate', type: () => String })),
    tslib_1.__param(3, (0, graphql_1.Args)({ name: 'endDate', type: () => String })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, typeof (_d = typeof graphql_upload_1.FileUpload !== "undefined" && graphql_upload_1.FileUpload) === "function" ? _d : Object, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserCertificateResolver.prototype, "createConstancy", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.SuccessMessage),
    tslib_1.__param(0, (0, graphql_1.Args)({ name: 'id', type: () => graphql_1.Int })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], UserCertificateResolver.prototype, "removeConstancy", null);
exports.UserCertificateResolver = UserCertificateResolver = UserCertificateResolver_1 = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => models_1.UserCertificate),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.UserCertificateDbService !== "undefined" && services_1.UserCertificateDbService) === "function" ? _a : Object, typeof (_b = typeof services_1.UsersDbService !== "undefined" && services_1.UsersDbService) === "function" ? _b : Object, typeof (_c = typeof shared_1.S3Service !== "undefined" && shared_1.S3Service) === "function" ? _c : Object])
], UserCertificateResolver);


/***/ }),
/* 109 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutorizationModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const autorization_resolver_1 = __webpack_require__(111);
const services_1 = __webpack_require__(34);
let AutorizationModule = class AutorizationModule {
};
exports.AutorizationModule = AutorizationModule;
exports.AutorizationModule = AutorizationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_1.AutorizationDbModule, services_1.UsersDbModule],
        providers: [autorization_resolver_1.AutorizationResolver],
    })
], AutorizationModule);


/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AutorizationResolver_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutorizationResolver = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const services_1 = __webpack_require__(34);
const shared_1 = __webpack_require__(73);
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(6);
const dayjs_1 = tslib_1.__importDefault(__webpack_require__(89));
const dto_1 = __webpack_require__(112);
const typeorm_1 = __webpack_require__(13);
let AutorizationResolver = AutorizationResolver_1 = class AutorizationResolver {
    constructor(autorizationDbService, usersDbService) {
        this.autorizationDbService = autorizationDbService;
        this.usersDbService = usersDbService;
        this.logger = new common_1.Logger(AutorizationResolver_1.name);
    }
    async createAutorization(createAutorizationInput) {
        try {
            this.logger.log(`create autorization with user id ${createAutorizationInput.userId}.`);
            const date = (0, dayjs_1.default)(createAutorizationInput.date).format('YYYY-MM-DD');
            const existingAutorization = await this.autorizationDbService.findOne({ where: { userId: createAutorizationInput.userId, date } }, false);
            if (existingAutorization) {
                throw new common_1.InternalServerErrorException({
                    status: 409,
                    message: 'Ya existe una autorización para este mes.',
                });
            }
            const autorization = await this.autorizationDbService.create({
                ...createAutorizationInput,
                date,
            });
            return autorization;
        }
        catch (e) {
            if (e instanceof typeorm_1.EntityNotFoundError) {
                this.logger.log('Error creating autorization. Id not founded.');
                throw new common_1.NotFoundException({
                    status: 404,
                    message: models_1.NotFoundError.USER,
                });
            }
            this.logger.error('Error finding user.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async updateAutorization(updateAutorizationInput) {
        try {
            this.logger.log(`Finding autorization with id: ${updateAutorizationInput.id}.`);
            const result = await this.autorizationDbService.findOne({
                where: { id: updateAutorizationInput.id },
            });
            this.logger.log(`Updating calendar with id: ${updateAutorizationInput.id}.`);
            return await this.autorizationDbService.update({ ...updateAutorizationInput }, result);
        }
        catch (e) {
            if (e instanceof typeorm_1.EntityNotFoundError) {
                this.logger.log('Error creating autorization. Id not founded.');
                throw new common_1.NotFoundException({
                    status: 404,
                    message: models_1.NotFoundError.USER,
                });
            }
            this.logger.error('Error finding user.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
};
exports.AutorizationResolver = AutorizationResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.Autorization),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('createAutorizationInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof dto_1.CreateAutorizationInput !== "undefined" && dto_1.CreateAutorizationInput) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AutorizationResolver.prototype, "createAutorization", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.Autorization),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('updateAutorizationInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.UpdateAutorizationInput !== "undefined" && dto_1.UpdateAutorizationInput) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AutorizationResolver.prototype, "updateAutorization", null);
exports.AutorizationResolver = AutorizationResolver = AutorizationResolver_1 = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => models_1.Autorization),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.AutorizationDbService !== "undefined" && services_1.AutorizationDbService) === "function" ? _a : Object, typeof (_b = typeof services_1.UsersDbService !== "undefined" && services_1.UsersDbService) === "function" ? _b : Object])
], AutorizationResolver);


/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(113), exports);
tslib_1.__exportStar(__webpack_require__(114), exports);


/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAutorizationInput = void 0;
const tslib_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(6);
const class_validator_1 = __webpack_require__(87);
const models_1 = __webpack_require__(10);
let CreateAutorizationInput = class CreateAutorizationInput {
};
exports.CreateAutorizationInput = CreateAutorizationInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateAutorizationInput.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateAutorizationInput.prototype, "percentage", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => models_1.StatusAutorizationEmun),
    (0, class_validator_1.IsEnum)(models_1.StatusAutorizationEmun),
    tslib_1.__metadata("design:type", typeof (_a = typeof models_1.StatusAutorizationEmun !== "undefined" && models_1.StatusAutorizationEmun) === "function" ? _a : Object)
], CreateAutorizationInput.prototype, "status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateAutorizationInput.prototype, "previousPayment", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateAutorizationInput.prototype, "numberMonths", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAutorizationInput.prototype, "previousMonths", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => models_1.CauseEmun, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(models_1.CauseEmun),
    tslib_1.__metadata("design:type", typeof (_b = typeof models_1.CauseEmun !== "undefined" && models_1.CauseEmun) === "function" ? _b : Object)
], CreateAutorizationInput.prototype, "cause", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAutorizationInput.prototype, "otherCause", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsISO8601)(),
    tslib_1.__metadata("design:type", String)
], CreateAutorizationInput.prototype, "date", void 0);
exports.CreateAutorizationInput = CreateAutorizationInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateAutorizationInput);


/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAutorizationInput = void 0;
const tslib_1 = __webpack_require__(3);
// NestJS Modules
const graphql_1 = __webpack_require__(6);
// Dto's
const create_autorization_input_1 = __webpack_require__(113);
let UpdateAutorizationInput = class UpdateAutorizationInput extends (0, graphql_1.PartialType)(create_autorization_input_1.CreateAutorizationInput) {
};
exports.UpdateAutorizationInput = UpdateAutorizationInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], UpdateAutorizationInput.prototype, "id", void 0);
exports.UpdateAutorizationInput = UpdateAutorizationInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdateAutorizationInput);


/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalendarModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(5);
const calendar_resolver_1 = __webpack_require__(116);
const services_1 = __webpack_require__(34);
let CalendarModule = class CalendarModule {
};
exports.CalendarModule = CalendarModule;
exports.CalendarModule = CalendarModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [services_1.CalendarDbModule, services_1.UsersDbModule],
        providers: [calendar_resolver_1.CalendarResolver],
    })
], CalendarModule);


/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CalendarResolver_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalendarResolver = void 0;
const tslib_1 = __webpack_require__(3);
const models_1 = __webpack_require__(10);
const services_1 = __webpack_require__(34);
const shared_1 = __webpack_require__(73);
const common_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(6);
const dayjs_1 = tslib_1.__importDefault(__webpack_require__(89));
const dto_1 = __webpack_require__(117);
const typeorm_1 = __webpack_require__(13);
let CalendarResolver = CalendarResolver_1 = class CalendarResolver {
    constructor(calendarDbService, usersDbService) {
        this.calendarDbService = calendarDbService;
        this.usersDbService = usersDbService;
        this.logger = new common_1.Logger(CalendarResolver_1.name);
    }
    async findAllCalendar(admin) {
        try {
            this.logger.log('Finding all calendar-db.');
            const data = await this.calendarDbService.findAll({
                where: { campus: admin.campus },
            });
            return data;
        }
        catch (e) {
            this.logger.error('Error finding all calendar-db.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async createCalendar(createCalendarInput) {
        try {
            this.logger.log(`create calendar by generation with id ${createCalendarInput.generationId}.`);
            const formatDate = (0, dayjs_1.default)(createCalendarInput.date);
            const date = formatDate.format('YYYY-MM-DD');
            const calendar = await this.calendarDbService.create({
                ...createCalendarInput,
                date,
            });
            return calendar;
        }
        catch (e) {
            if (e instanceof typeorm_1.EntityNotFoundError) {
                this.logger.log('Error creating calendar. Id not founded.');
                throw new common_1.NotFoundException({
                    status: 404,
                    message: models_1.NotFoundError.CALENDAR,
                });
            }
            this.logger.error('Error finding user.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async updateCalendar(updateCalendarInput) {
        try {
            this.logger.log(`Finding calendar with id: ${updateCalendarInput.id}.`);
            const calendar = await this.calendarDbService.findOne({
                where: { id: updateCalendarInput.id },
            });
            this.logger.log(`Updating calendar with id: ${updateCalendarInput.id}.`);
            return await this.calendarDbService.update({ ...updateCalendarInput }, calendar);
        }
        catch (e) {
            if (e instanceof typeorm_1.EntityNotFoundError) {
                this.logger.log('Error finding calendar. Id not founded.');
                throw new common_1.NotFoundException({
                    status: 404,
                    message: models_1.NotFoundError.CALENDAR,
                });
            }
            this.logger.error('Error finding user.', e);
            throw new common_1.InternalServerErrorException({
                status: 500,
                message: models_1.InternalServerError.SERVER,
            });
        }
    }
    async removeCalendar(id) {
        try {
            const calendar = await this.calendarDbService.findOne({ where: { id } });
            await this.calendarDbService.remove(calendar);
            return { message: 'Fecha eliminada exitosamente' };
        }
        catch (e) {
            this.logger.error(e);
            throw new common_1.InternalServerErrorException();
        }
    }
};
exports.CalendarResolver = CalendarResolver;
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [models_1.Calendar]),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, shared_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof models_1.Admin !== "undefined" && models_1.Admin) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CalendarResolver.prototype, "findAllCalendar", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.Calendar),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('createCalendarInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateCalendarInput !== "undefined" && dto_1.CreateCalendarInput) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CalendarResolver.prototype, "createCalendar", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.Calendar),
    (0, common_1.UseGuards)(shared_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('updateCalendarInput')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof dto_1.UpdateCalendarInput !== "undefined" && dto_1.UpdateCalendarInput) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CalendarResolver.prototype, "updateCalendar", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => models_1.SuccessMessage),
    tslib_1.__param(0, (0, graphql_1.Args)({ name: 'id', type: () => graphql_1.Int })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CalendarResolver.prototype, "removeCalendar", null);
exports.CalendarResolver = CalendarResolver = CalendarResolver_1 = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => models_1.Calendar),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.CalendarDbService !== "undefined" && services_1.CalendarDbService) === "function" ? _a : Object, typeof (_b = typeof services_1.UsersDbService !== "undefined" && services_1.UsersDbService) === "function" ? _b : Object])
], CalendarResolver);


/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(3);
tslib_1.__exportStar(__webpack_require__(118), exports);
tslib_1.__exportStar(__webpack_require__(119), exports);


/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCalendarInput = void 0;
const tslib_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(6);
const class_validator_1 = __webpack_require__(87);
let CreateCalendarInput = class CreateCalendarInput {
};
exports.CreateCalendarInput = CreateCalendarInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCalendarInput.prototype, "name", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateCalendarInput.prototype, "generationId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsISO8601)(),
    tslib_1.__metadata("design:type", String)
], CreateCalendarInput.prototype, "date", void 0);
exports.CreateCalendarInput = CreateCalendarInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateCalendarInput);


/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCalendarInput = void 0;
const tslib_1 = __webpack_require__(3);
// NestJS Modules
const graphql_1 = __webpack_require__(6);
// Dto's
const create_calendar_input_1 = __webpack_require__(118);
let UpdateCalendarInput = class UpdateCalendarInput extends (0, graphql_1.PartialType)(create_calendar_input_1.CreateCalendarInput) {
};
exports.UpdateCalendarInput = UpdateCalendarInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], UpdateCalendarInput.prototype, "id", void 0);
exports.UpdateCalendarInput = UpdateCalendarInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdateCalendarInput);


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

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(5);
const graphql_upload_1 = __webpack_require__(103);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.use((0, graphql_upload_1.graphqlUploadExpress)({ maxFileSize: 2000000000, maxFiles: 10 }));
    const port = process.env.PORT || 4000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();

})();

/******/ })()
;