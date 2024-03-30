
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum InvestmentType {
    BONDS = "BONDS",
    CRYPTO = "CRYPTO",
    DEPOSIT = "DEPOSIT",
    INDEX = "INDEX",
    STOCK = "STOCK"
}

export enum Role {
    ADMIN = "ADMIN",
    BOT = "BOT",
    USER = "USER"
}

export enum TypeCurrency {
    EUR = "EUR",
    RUB = "RUB",
    USD = "USD"
}

export interface CreateCommentInput {
    investmentId: string;
    text: string;
}

export interface CreateInvestmentInput {
    amount: number;
    currency: TypeCurrency;
    description?: Nullable<string>;
    name: string;
    price: number;
    type: InvestmentType;
}

export interface CreatePostInput {
    description: string;
    title: string;
}

export interface CreateUserInput {
    email: string;
    password: string;
    status: string;
    username: string;
}

export interface LogInInput {
    password: string;
    username: string;
}

export interface SigInInput {
    email: string;
    password: string;
    username: string;
}

export interface UpdateDataUserInput {
    email?: Nullable<string>;
    status?: Nullable<string>;
    username?: Nullable<string>;
}

export interface UpdateInvestmentInput {
    amount?: Nullable<number>;
    currency?: Nullable<TypeCurrency>;
    description?: Nullable<string>;
    id: string;
    name?: Nullable<string>;
    price?: Nullable<number>;
}

export interface Auth {
    accessToken?: Nullable<string>;
    refreshToken?: Nullable<string>;
    user?: Nullable<User>;
}

export interface Comment {
    author?: Nullable<User>;
    id?: Nullable<string>;
    investment?: Nullable<Investment>;
    investmentId?: Nullable<string>;
    text?: Nullable<string>;
    userId?: Nullable<string>;
}

export interface Investment {
    amount?: Nullable<number>;
    comments?: Nullable<Nullable<Comment>[]>;
    createAt?: Nullable<DateTime>;
    currency?: Nullable<TypeCurrency>;
    description?: Nullable<string>;
    id?: Nullable<string>;
    name?: Nullable<string>;
    price?: Nullable<number>;
    type?: Nullable<InvestmentType>;
    user?: Nullable<User>;
    userId?: Nullable<string>;
}

export interface IMutation {
    addCommentToInvest(data?: Nullable<CreateCommentInput>): Investment | Promise<Investment>;
    createInvest(data?: Nullable<CreateInvestmentInput>, userId?: Nullable<string>): Investment | Promise<Investment>;
    createPost(data?: Nullable<CreatePostInput>): Post | Promise<Post>;
    createUser(createUserInput: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;
    refreshTokens(): Tokens | Promise<Tokens>;
    removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
    sigIn(data: LogInInput): Auth | Promise<Auth>;
    sigUp(data: SigInInput): Auth | Promise<Auth>;
    update(data?: Nullable<UpdateDataUserInput>): Nullable<User> | Promise<Nullable<User>>;
    updateEmailUser(email: string): Nullable<User> | Promise<Nullable<User>>;
    updateInvest(data?: Nullable<UpdateInvestmentInput>): Investment | Promise<Investment>;
    updateStatusUser(status: string): Nullable<User> | Promise<Nullable<User>>;
    updateUsernameUser(username: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface Post {
    description: string;
    id: string;
    image?: Nullable<ByteArray>;
    investments?: Nullable<Nullable<Investment>[]>;
    likes: number;
    title: string;
}

export interface IQuery {
    checkAuth(): Nullable<boolean> | Promise<Nullable<boolean>>;
    getCommentsByInvest(investID?: Nullable<string>): Nullable<Comment[]> | Promise<Nullable<Comment[]>>;
    getInvest(investID: string): Investment | Promise<Investment>;
    getInvests(userID: string): Nullable<Investment[]> | Promise<Nullable<Investment[]>>;
    logOut(): Nullable<boolean> | Promise<Nullable<boolean>>;
    posts(): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;
    test(a?: Nullable<string>, b?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface User {
    email: string;
    id: string;
    isConfirm: boolean;
    isOnline: boolean;
    isVerified: boolean;
    role: Role[];
    status: string;
    username: string;
}

export type ByteArray = any;
export type DateTime = any;
export type Json = any;
type Nullable<T> = T | null;
