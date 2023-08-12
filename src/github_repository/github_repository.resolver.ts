import { Resolver, Args, Query } from '@nestjs/graphql';
import { GitHubRepository } from './github_repository.schema';
import { GithubRepositoryService } from './github_repository.service';

@Resolver(() => GitHubRepository) // Specify the resolver type
export class GithubRepositoryResolver {
    constructor(
        private readonly githubRepositoryService: GithubRepositoryService,
    ) { }

    @Query(() => [GitHubRepository])
    async githubRepositories(@Args('username') username: string): Promise<GitHubRepository[]> {
        return this.githubRepositoryService.getUserRepositories(username);
    }
}
