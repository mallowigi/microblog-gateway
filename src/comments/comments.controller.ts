import {
  CreateCommentRequest,
  CreateCommentResponse,
  IComment,
  RemoveCommentResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
}                                                                 from '@mallowigi/common';
import { CommentsService }                                        from '@mallowigi/gateway/src/comments/comments.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Observable }                                             from 'rxjs';
import { reduce }                                                 from 'rxjs/operators';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {

  }

  @Get()
  public async getComments(@Query('authorId') authorId: string,
                           @Query('articleId') articleId: string,
                           @Query('page') page: number,
                           @Query('limit') limit: number): Promise<Observable<IComment[]>> {
    const commentObservable = await this.commentsService.list({
      query:      { authorId, articleId },
      pagination: { page, limit },
    });

    // consume observable
    return commentObservable.pipe(reduce<IComment, IComment[]>((acc, curr) => [curr, ...acc], []));
  }

  @Get(':id')
  public async getComment(@Param('id') id: string): Promise<IComment> {
    return this.commentsService.get({ id });
  }

  @Post()
  public async createComment(@Body() comment: CreateCommentRequest): Promise<CreateCommentResponse<IComment>> {
    return this.commentsService.create(comment);
  }

  @Put(':id')
  public async updateComment(@Param('id') id: string, @Body() { content }: UpdateCommentRequest): Promise<UpdateCommentResponse<IComment>> {
    return this.commentsService.update({ id, content });
  }

  @Delete(':id')
  public async removeComment(@Param('id') id: string): Promise<RemoveCommentResponse<IComment>> {
    return this.commentsService.remove({ id });
  }
}
