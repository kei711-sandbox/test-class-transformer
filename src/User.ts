import { Exclude, Expose } from 'class-transformer';

export interface UserInterface {
    id: number;
    name: string;
}

export class User implements UserInterface {
    readonly id: number;
    readonly name: string;
}

export class ExposeModel extends User {
    @Expose() readonly id: number;
    @Expose() readonly name: string;
}

export class ExposeModelWithGroup extends ExposeModel {
    @Expose({ groups: ['group', 'group2'] })
    readonly id: number;
    @Expose({ name: 'name', groups: ['group'] })
    @Expose({ name: 'hoge', groups: ['group2'] })   // It has no effect
    readonly name: string;
}

export class ExcludeModel extends User {
    @Exclude() readonly id: number;
    @Exclude() readonly name: string;
}

@Expose()
export class ExposeAllModel extends User {
    readonly id: number;
    readonly name: string;
}

@Exclude()
export class ExcludeAllModel extends User {
    readonly id: number;
    readonly name: string;
}
