import { ExcludeAllModel, ExcludeModel, ExposeModel, ExposeModelWithGroup, User, UserInterface } from './User';
import { plainToClass } from 'class-transformer';

describe('unit tests', () => {
    const baseJson: UserInterface = {
        id: 1234,
        name: 'hoge'
    };

    const withAdditionalParameter: UserInterface & { age: number } = {
        id: 2345,
        name: 'fuga',
        age: 20
    };

    describe('basic', () => {
        it('User 1', () => {
            const model = plainToClass(User, baseJson);
            expect(model).toEqual(baseJson);
        });
        it('User 2', () => {
            const model = plainToClass(User, withAdditionalParameter);
            expect(model).toEqual(withAdditionalParameter);
        });

        it('ExposeModel 1', () => {
            const model = plainToClass(ExposeModel, baseJson);
            expect(model).toEqual(baseJson);
        });
        it('ExposeModel 2', () => {
            const model = plainToClass(ExposeModel, withAdditionalParameter);
            expect(model).toEqual(withAdditionalParameter);
        });

        it('ExposeModelWithGroup 1', () => {
            const model = plainToClass(ExposeModelWithGroup, baseJson, { groups: ['group'] });
            expect(model).toEqual(baseJson);
        });
        it('ExposeModelWithGroup 2', () => {
            const model = plainToClass(ExposeModelWithGroup, withAdditionalParameter, { groups: ['group'] });
            expect(model).toEqual(withAdditionalParameter);
        });
        it('ExposeModelWithGroup 3', () => {
            const model = plainToClass(ExposeModelWithGroup, baseJson, { groups: ['group2'] });
            expect(model).toEqual({ id: baseJson.id, name: undefined });
        });

        it('ExcludeModel', () => {
            const model = plainToClass(ExcludeModel, baseJson);
            expect(model).toEqual({});
        });

        it('ExcludeAllModel', () => {
            const model = plainToClass(ExcludeAllModel, baseJson);
            expect(model).toEqual({});
        });
    });

    describe('exposeAll', () => {
        it('User 1', () => {
            const model = plainToClass(User, baseJson, { strategy: 'exposeAll' });
            expect(model).toEqual(baseJson);
        });
        it('User 2', () => {
            const model = plainToClass(User, withAdditionalParameter, { strategy: 'exposeAll' });
            expect(model).toEqual(withAdditionalParameter);
        });

        it('ExposeModel 1', () => {
            const model = plainToClass(ExposeModel, baseJson, { strategy: 'exposeAll' });
            expect(model).toEqual(baseJson);
        });
        it('ExposeModel 2', () => {
            const model = plainToClass(ExposeModel, withAdditionalParameter, { strategy: 'exposeAll' });
            expect(model).toEqual(withAdditionalParameter);
        });

        it('ExposeModelWithGroup 1', () => {
            const model = plainToClass(ExposeModelWithGroup, baseJson, { strategy: 'exposeAll', groups: ['group'] });
            expect(model).toEqual(baseJson);
        });
        it('ExposeModelWithGroup 2', () => {
            const model = plainToClass(ExposeModelWithGroup, withAdditionalParameter, {
                strategy: 'exposeAll',
                groups: ['group']
            });
            expect(model).toEqual(withAdditionalParameter);
        });

        // @Excludeが優先
        it('ExcludeModel', () => {
            const model = plainToClass(ExcludeModel, baseJson, { strategy: 'exposeAll' });
            expect(model).toEqual({});
        });

        // @Excludeが優先
        it('ExcludeAllModel', () => {
            const model = plainToClass(ExcludeAllModel, baseJson, { strategy: 'exposeAll' });
            expect(model).toEqual({});
        });
    });

    describe('excludeAll', () => {
        it('User', () => {
            const model = plainToClass(User, baseJson, { strategy: 'excludeAll' });
            expect(model).toEqual({});
        });

        // Exposeが優先
        it('ExposeModel 1', () => {
            const model = plainToClass(ExposeModel, baseJson, { strategy: 'excludeAll' });
            expect(model).toEqual(baseJson);
        });
        // Exposeが優先 Exposeがついていないものは除外
        it('ExposeModel 2', () => {
            const model = plainToClass(ExposeModel, withAdditionalParameter, { strategy: 'excludeAll' });
            expect(model).toEqual({ id: withAdditionalParameter.id, name: withAdditionalParameter.name });
        });

        // Exposeが優先
        it('ExposeModelWithGroup 1', () => {
            const model = plainToClass(ExposeModelWithGroup, baseJson, { strategy: 'excludeAll', groups: ['group'] });
            expect(model).toEqual(baseJson);
        });
        // Exposeが優先 Exposeがついていないものは除外
        it('ExposeModelWithGroup 2', () => {
            const model = plainToClass(ExposeModelWithGroup, withAdditionalParameter, {
                strategy: 'excludeAll',
                groups: ['group']
            });
            expect(model).toEqual({ id: withAdditionalParameter.id, name: withAdditionalParameter.name });
        });

        it('ExcludeModel', () => {
            const model = plainToClass(ExcludeModel, baseJson, { strategy: 'excludeAll' });
            expect(model).toEqual({});
        });

        it('ExcludeAllModel', () => {
            const model = plainToClass(ExcludeAllModel, baseJson, { strategy: 'excludeAll' });
            expect(model).toEqual({});
        });
    });

    describe('ignoreDecorators', () => {
        it('User 1', () => {
            const model = plainToClass(User, baseJson, { ignoreDecorators: true });
            expect(model).toEqual(baseJson);
        });
        it('User 2', () => {
            const model = plainToClass(User, withAdditionalParameter, { ignoreDecorators: true });
            expect(model).toEqual(withAdditionalParameter);
        });

        it('ExposeModel 1', () => {
            const model = plainToClass(ExposeModel, baseJson, { ignoreDecorators: true });
            expect(model).toEqual(baseJson);
        });
        it('ExposeModel 2', () => {
            const model = plainToClass(ExposeModel, withAdditionalParameter, { ignoreDecorators: true });
            expect(model).toEqual(withAdditionalParameter);
        });

        it('ExposeModelWithGroup 1', () => {
            const model = plainToClass(ExposeModelWithGroup, baseJson, { ignoreDecorators: true, groups: ['group'] });
            expect(model).toEqual(baseJson);
        });
        it('ExposeModelWithGroup 2', () => {
            const model = plainToClass(ExposeModelWithGroup, withAdditionalParameter, {
                ignoreDecorators: true,
                groups: ['group']
            });
            expect(model).toEqual(withAdditionalParameter);
        });

        // フィールドの@Excludeは除外
        it('ExcludeModel 1', () => {
            const model = plainToClass(ExcludeModel, baseJson, { ignoreDecorators: true });
            expect(model).toEqual(baseJson);
        });
        it('ExcludeModel 2', () => {
            const model = plainToClass(ExcludeModel, withAdditionalParameter, { ignoreDecorators: true });
            expect(model).toEqual(withAdditionalParameter);
        });

        // クラスの@Excludeは残る
        it('ExcludeAllModel', () => {
            const model = plainToClass(ExcludeAllModel, baseJson, { ignoreDecorators: true });
            expect(model).toEqual({});
        });
    });

    describe('excludeExtraneousValues', () => {
        it('User', () => {
            const model = plainToClass(User, baseJson, { excludeExtraneousValues: true });
            expect(model).toEqual({});
        });

        it('ExposeModel 1', () => {
            const model = plainToClass(ExposeModel, baseJson, { excludeExtraneousValues: true });
            expect(model).toEqual(baseJson);
        });
        it('ExposeModel 2', () => {
            const model = plainToClass(ExposeModel, withAdditionalParameter, { excludeExtraneousValues: true });
            expect(model).toEqual({ id: withAdditionalParameter.id, name: withAdditionalParameter.name });
        });

        it('ExposeModelWithGroup 1', () => {
            const model = plainToClass(ExposeModelWithGroup, baseJson, {
                excludeExtraneousValues: true,
                groups: ['group']
            });
            expect(model).toEqual(baseJson);
        });
        it('ExposeModelWithGroup 2', () => {
            const model = plainToClass(ExposeModelWithGroup, withAdditionalParameter, {
                excludeExtraneousValues: true,
                groups: ['group']
            });
            expect(model).toEqual({ id: withAdditionalParameter.id, name: withAdditionalParameter.name });
        });

        // @Excludeは残る
        it('ExcludeModel', () => {
            const model = plainToClass(ExcludeModel, baseJson, { excludeExtraneousValues: true });
            expect(model).toEqual({});
        });

        // @Excludeは残る
        it('ExcludeAllModel', () => {
            const model = plainToClass(ExcludeAllModel, baseJson, { excludeExtraneousValues: true });
            expect(model).toEqual({});
        });
    });
});
