
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum CryptoStrategy {
    FUTURE = "FUTURE",
    GRID_FIAT = "GRID_FIAT",
    GRID_SPOT = "GRID_SPOT",
    LONG_INVEST = "LONG_INVEST",
    P2P = "P2P",
    SPOT = "SPOT"
}

export enum InvestmentStatus {
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
    OPEN = "OPEN"
}

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

export interface CreateCryptoInvestment {
    amountInvest: number;
    goal: number;
    orderDate: DateTime;
    strategy?: Nullable<Nullable<CryptoStrategy>[]>;
    symbol: string;
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

export interface DeletePostInput {
    id: string;
    uid: string;
}

export interface LikePostInput {
    id: string;
    isLiked?: Nullable<boolean>;
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

export interface UpdateCryptoInvestment {
    amountInvest?: Nullable<number>;
    currentAmount?: Nullable<number>;
    goal?: Nullable<number>;
    strategy?: Nullable<Nullable<CryptoStrategy>[]>;
    symbol?: Nullable<string>;
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

export interface AnalyzeCryptoInvestment {
    dayToGoal?: Nullable<number>;
    exitInZeroDays?: Nullable<number>;
    forecastToGoal?: Nullable<string>;
    investment?: Nullable<CryptoInvestment>;
    percentProfit?: Nullable<number>;
    profitOfDay?: Nullable<number>;
    reviewGoal?: Nullable<number>;
    timeToInvest?: Nullable<DateTime>;
}

export interface Auth {
    accessToken?: Nullable<string>;
    refreshToken?: Nullable<string>;
    user?: Nullable<User>;
}

export interface Coin {
    id?: Nullable<string>;
    orderCoin?: Nullable<CryptoInvestment>;
    symbol?: Nullable<string>;
}

export interface Comment {
    author?: Nullable<User>;
    id?: Nullable<string>;
    investment?: Nullable<Investment>;
    investmentId?: Nullable<string>;
    text?: Nullable<string>;
    userId?: Nullable<string>;
}

export interface CryptoInvestment {
    amountInvest?: Nullable<number>;
    coin?: Nullable<Coin>;
    createAt?: Nullable<DateTime>;
    currentAmount?: Nullable<number>;
    goal?: Nullable<number>;
    id?: Nullable<string>;
    orderDate?: Nullable<DateTime>;
    profit?: Nullable<number>;
    status?: Nullable<InvestmentStatus>;
    strategy?: Nullable<Nullable<CryptoStrategy>[]>;
    updateAt?: Nullable<DateTime>;
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
    addCoin(symbol?: Nullable<string>): Coin | Promise<Coin>;
    addCommentToInvest(data?: Nullable<CreateCommentInput>): Investment | Promise<Investment>;
    analyzeCryptoInvestment(idOrder: string): AnalyzeCryptoInvestment | Promise<AnalyzeCryptoInvestment>;
    closeCryptoInvestment(idOrder: string, status: InvestmentStatus): CryptoInvestment | Promise<CryptoInvestment>;
    createCryptoInvestment(data: CreateCryptoInvestment): CryptoInvestment | Promise<CryptoInvestment>;
    createInvest(data?: Nullable<CreateInvestmentInput>, userId?: Nullable<string>): Investment | Promise<Investment>;
    createPost(data?: Nullable<CreatePostInput>): Post | Promise<Post>;
    createTag(value: string): Tag | Promise<Tag>;
    createUser(createUserInput: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;
    deleteCryptoInvestment(idOrder: string): CryptoInvestment | Promise<CryptoInvestment>;
    deletePost(id: string): Post | Promise<Post>;
    deleteTag(id: string): boolean | Promise<boolean>;
    findOrCreateTag(value: string): Nullable<Tag> | Promise<Nullable<Tag>>;
    findPartialTags(value: string): Nullable<Nullable<Tag>[]> | Promise<Nullable<Nullable<Tag>[]>>;
    findPostByTitle(value: string): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;
    likePost(data: LikePostInput): Post | Promise<Post>;
    refreshTokens(): Tokens | Promise<Tokens>;
    removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
    sigIn(data: LogInInput): Auth | Promise<Auth>;
    sigUp(data: SigInInput): Auth | Promise<Auth>;
    update(data?: Nullable<UpdateDataUserInput>): Nullable<User> | Promise<Nullable<User>>;
    updateCryptoInvestment(data: UpdateCryptoInvestment, idOrder: string): CryptoInvestment | Promise<CryptoInvestment>;
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
    allTags(): Nullable<Nullable<Tag>[]> | Promise<Nullable<Nullable<Tag>[]>>;
    checkAuth(): Nullable<boolean> | Promise<Nullable<boolean>>;
    commentedPosts(): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;
    getAllCryptoInvestments(): Nullable<Nullable<CryptoInvestment>[]> | Promise<Nullable<Nullable<CryptoInvestment>[]>>;
    getAnalyzeAllCryptoInvestments(): Nullable<Nullable<CryptoInvestment>[]> | Promise<Nullable<Nullable<CryptoInvestment>[]>>;
    getCommentsByInvest(investID?: Nullable<string>): Nullable<Comment[]> | Promise<Nullable<Comment[]>>;
    getInvest(investID: string): Investment | Promise<Investment>;
    getInvests(userID: string): Nullable<Investment[]> | Promise<Nullable<Investment[]>>;
    getLossCryptoInvestments(): Nullable<Nullable<CryptoInvestment>[]> | Promise<Nullable<Nullable<CryptoInvestment>[]>>;
    getProfitCryptoInvestments(): Nullable<Nullable<CryptoInvestment>[]> | Promise<Nullable<Nullable<CryptoInvestment>[]>>;
    likedPosts(): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;
    logOut(): Nullable<boolean> | Promise<Nullable<boolean>>;
    posts(): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;
    tag(id: string): Tag | Promise<Tag>;
    test(a?: Nullable<string>, b?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;
    testAnalyzeProfit(): Nullable<string> | Promise<Nullable<string>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export interface Tag {
    id: string;
    value: string;
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
