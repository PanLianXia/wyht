import { Repository } from '@huatian/domain'

export function get() {
    const repo = Repository.discoveryRepo()
    return repo.getAll().map(x => x.toJSON())
}