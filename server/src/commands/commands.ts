import { ImportEemlandCommand } from './import-eemland-data'
import { SeedAdminUserCommand } from './seed-admin-user'
import { SeedPostalCodes } from './seed-postal-codes'

export const commands = [SeedAdminUserCommand, SeedPostalCodes, ImportEemlandCommand]
