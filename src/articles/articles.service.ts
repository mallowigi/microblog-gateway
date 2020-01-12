import {
  articlesGrpcClient,
  CreateArticleRequest,
  CreateArticleResponse,
  GetArticleRequest,
  IArticle,
  IArticlesService,
  ListArticlesRequest,
  RemoveArticleRequest,
  RemoveArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
}                             from '@mallowigi/common';
import { Injectable }         from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable }         from 'rxjs';

@Injectable()
export class ArticlesService implements IArticlesService {
  @Client(articlesGrpcClient)
  private client: ClientGrpc;

  private grpcArticlesService: IArticlesService;

  onModuleInit() {
    this.grpcArticlesService = this.client.getService<IArticlesService>('ArticlesService');
  }

  list(req: ListArticlesRequest): Promise<Observable<IArticle>> {
    return this.grpcArticlesService.list(req);
  }

  get(req: GetArticleRequest): Promise<IArticle> {
    return this.grpcArticlesService.get(req);
  }

  create(req: CreateArticleRequest): Promise<CreateArticleResponse<IArticle>> {
    return this.grpcArticlesService.create(req);
  }

  public remove(req: RemoveArticleRequest): Promise<RemoveArticleResponse<IArticle>> {
    return this.grpcArticlesService.remove(req);
  }

  public update(req: UpdateArticleRequest): Promise<UpdateArticleResponse<IArticle>> {
    return this.grpcArticlesService.update(req);
  }
}
