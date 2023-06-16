import { Args, ID, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UserService } from './user.service';
import {
  GraphqlLoader,
  Loader,
  LoaderData,
  SelectedFields,
  SelectedFieldsResult,
} from 'nestjs-graphql-tools';
import { DialogEntity } from '../dialog/dialog.entity';
import { DialogService } from '../dialog/dialog.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly dialogService: DialogService,
  ) {}

  @Query(() => UserEntity)
  public user(
    @SelectedFields({ sqlAlias: 'user' }) fields: SelectedFieldsResult,
    @Args({ name: 'id', type: () => ID }) id: string,
  ) {
    return this.userService
      .builder()
      .select(fields.fieldsData.fieldsString)
      .where('user.id = :id', { id })
      .getOne();
  }

  @Query(() => [UserEntity])
  public users(
    @SelectedFields({ sqlAlias: 'user' }) fields: SelectedFieldsResult,
  ) {
    return this.userService
      .builder()
      .select(fields.fieldsData.fieldsString)
      .getMany();
  }

  @ResolveField(() => [DialogEntity])
  @GraphqlLoader()
  public async dialogs(
    @Loader() loader: LoaderData<DialogEntity, string>,
    @SelectedFields({ sqlAlias: 'dialog' }) fields: SelectedFieldsResult,
  ) {
    const dialogs = await this.dialogService
      .builder()
      .select(['dialog.user_id', ...fields.fieldsData.fieldsString])
      .where('dialog.user_id in (:...ids)', { ids: loader.ids })
      .getMany();

    return loader.helpers.mapOneToManyRelation(dialogs, loader.ids, 'user_id');
  }
}
