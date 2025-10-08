import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GithubLoginService } from './githubLogin.service';
import { GithubAuthResponse, AccessTokenResponse } from 'src/user/user.schema';
import { GitHubUserDetails } from './githubLogin.schema';
import { Query } from '@nestjs/graphql';

@Resolver()
export class GithubLoginResolver {
  constructor(private readonly GithubLoginService: GithubLoginService) { }

  @Mutation(() => GithubAuthResponse)
  async githubLogin(): Promise<{ githubAuthUrl: string }> {
    // console.log("Method [methodName] called with parameters: [parameters]")
    return await this.GithubLoginService.githubLogin();
  }

  @Mutation(() => AccessTokenResponse)
  async githubCodeExchange(@Args('code') code: string): Promise<AccessTokenResponse> {
    // console.log("Method [methodName] called with parameters: [parameters]")
    const accessTokenResponse = await this.GithubLoginService.githubCodeExchange(code);
    return accessTokenResponse;
  }

  @Mutation(() => GitHubUserDetails)
  async getGithubUser(@Args('accessToken') accessToken: string): Promise<GitHubUserDetails> {
    // console.log("Method [methodName] called with parameters: [parameters]")
    const githubUser = await this.GithubLoginService.getGithubUser(accessToken);
    return githubUser;
  }

  @Query(() => GitHubUserDetails)
  async getGithubUserDetails(@Args('userName') userName: string): Promise<GitHubUserDetails> {
    // console.log("Method [methodName] called with parameters: [parameters]")
    return this.GithubLoginService.getGithubUserDetails(userName);
  }
}