// import { IUser } from '../../api/v1/users/users.schema';
// import { Ability, AbilityBuilder } from '@casl/ability';
// import { Roles } from '../../api/v1/users/users.schema';
// import { subject as an } from '@casl/ability';
// import * as _ from 'lodash';
// import { permittedFieldsOf } from '@casl/ability/extra';

// export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';
// type UserPermission = IUser | { role: number; _id: string };
// export class AppPermissions {
//     private static ability: any;

//     static setPermissions(user: UserPermission) {
//         switch (user.role) {
//             case Roles.Admin:
//                 AppPermissions.ability = AppPermissions.defineAdminAbilities(user);
//                 break;
//             case Roles.Analyst:
//                 AppPermissions.ability = AppPermissions.defineAnalystAbilities(user);
//                 break;
//             default:
//                 AppPermissions.ability = AppPermissions.defineAnalystAbilities(user);
//         }
//     }

//     static getPermissions() {
//         return this.ability;
//     }

//     /**
//      * Define the analyst capabilities
//      * @param user - user preform action
//      */
//     private static defineAnalystAbilities(user: UserPermission) {
//         const { can, cannot, build } = new AbilityBuilder(Ability);
//         can('manage', 'all'); // read-write access to everything
//         return build();
//     }

//     /**
//      * Define the admin capabilities
//      * @param user - user preform action
//      */
//     private static defineAdminAbilities(user: UserPermission) {
//         const { can, cannot, build } = new AbilityBuilder(Ability);
//         can('manage', 'all'); // read-write access to everything
//         return build();
//     }

//     static canPreform(action: Actions, data: any, schemaName: string) {
//         const options = { fieldsFrom: (rule: any) => rule.fields };
//         //Get all permitted fields by entity
//         const fields = permittedFieldsOf(this.ability, action, an(schemaName, data), options);
//         //Clean object only permitted fields
//         const rawData = _.pick(data, fields);
//         //If no permitted fields in entity or no permitted fields in the object to update return false
//         if (fields.length == 0 || Object.keys(rawData).length === 0) return { can: false, data: [] };
//         // Check if user can preform action
//         const can = this.ability.can(action, an(schemaName, { ...rawData, _id: data._id }));
//         // Return if user can preform action and the clean object ( only permitted fields)
//         return { can, data: rawData };
//     }
// }
