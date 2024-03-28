export interface GqlContext {
    req: Request;
    res: Response;
    headers: Headers;
    extra: any;
}