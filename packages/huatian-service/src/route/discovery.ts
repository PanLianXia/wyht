import { Repository } from '@huatian/domain'
import { Request } from 'express'

export function get() {
    const repo = Repository.discoverRepo

    return repo.getAll().map(x => x.toJSON())
}