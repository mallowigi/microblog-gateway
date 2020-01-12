import { CreateArticleRequest, CreateArticleResponse, IArticle, UpdateArticleRequest } from '@mallowigi/common';
import { RemoveArticleResponse, UpdateArticleResponse }                                from '@mallowigi/gateway/node_modules/@mallowigi/common';
import { ArticlesService }                                                             from '@mallowigi/gateway/src/articles/articles.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query }                      from '@nestjs/common';
import { Observable }                                                                  from 'rxjs';
import { reduce }                                                                      from 'rxjs/operators';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {

  }

  @Get()
  public async getArticles(@Query('authorId') authorId: string,
                           @Query('page') page: number,
                           @Query('limit') limit: number): Promise<Observable<IArticle[]>> {
    const articleObservable = await this.articlesService.list({
      query:      { authorId },
      pagination: { page, limit },
    });

    // consume observable
    return articleObservable.pipe(reduce<IArticle, IArticle[]>((acc, curr) => [curr, ...acc], []));
  }

  @Get(':id')
  public async getArticle(@Param('id') id: string): Promise<IArticle> {
    return this.articlesService.get({ id });
  }

  @Post()
  public async createArticle(@Body() article: CreateArticleRequest): Promise<CreateArticleResponse<IArticle>> {
    return this.articlesService.create(article);
  }

  @Put(':id')
  public async updateArticle(@Param('id') id: string, @Body() { content, title }: UpdateArticleRequest): Promise<UpdateArticleResponse<IArticle>> {
    return this.articlesService.update({ id, content, title });
  }

  @Delete(':id')
  public async removeArticle(@Param('id') id: string): Promise<RemoveArticleResponse<IArticle>> {
    return this.articlesService.remove({ id });
  }
}
