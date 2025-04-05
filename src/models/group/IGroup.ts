export interface IGroup {
    id: string
    name: string  // unique
    permissions: {
        drawerMenu: {
            drawer: boolean
        }
    }
    createdAt: Date;
    updatedAt?: Date;
}
