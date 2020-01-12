import {
  commentsGrpcClient,
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentRequest,
  IComment,
  ICommentsService,
  ListCommentsRequest,
  RemoveCommentRequest,
  RemoveCommentResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
}                             from '@mallowigi/common';
import { Injectable }         from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable }         from 'rxjs';

@Injectable()
export class CommentsService implements ICommentsService {
  @Client(commentsGrpcClient)
  private client: ClientGrpc;

  private grpcCommentsService: ICommentsService;

  onModuleInit() {
    this.grpcCommentsService = this.client.getService<ICommentsService>('CommentsService');
  }

  list(req: ListCommentsRequest): Promise<Observable<IComment>> {
    return this.grpcCommentsService.list(req);
  }

  get(req: GetCommentRequest): Promise<IComment> {
    return this.grpcCommentsService.get(req);
  }

  create(req: CreateCommentRequest): Promise<CreateCommentResponse<IComment>> {
    return this.grpcCommentsService.create(req);
  }

  public remove(req: RemoveCommentRequest): Promise<RemoveCommentResponse<IComment>> {
    return this.grpcCommentsService.remove(req);
  }

  public update(req: UpdateCommentRequest): Promise<UpdateCommentResponse<IComment>> {
    return this.grpcCommentsService.update(req);
  }
}
