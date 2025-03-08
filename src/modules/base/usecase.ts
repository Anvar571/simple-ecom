export interface UseCase<P, O> {
    execute: (param: P) => Promise<O>;
}
