
export class BaseClass<T> {
    protected data: T & {id: string | number};

    constructor(data: T) {
        Object.defineProperty(this, 'data', { value: data });
    }

    public get id() {
        return this.data.id;
    }

    public set id(id: string | number) {
        this.data.id = id;
    }
}
