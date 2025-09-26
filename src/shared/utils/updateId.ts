export function updateId<T>(data: T): T {
    if (!data) return null as T;

    const newData = { ...data } as T & { _id?: any; id?: any };
    if (newData && "_id" in newData) {
        (newData as any).id = (newData as any)._id;
        delete (newData as any)._id;
    }
    return newData as T;
}